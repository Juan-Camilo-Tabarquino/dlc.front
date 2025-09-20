import React, { useEffect, useState } from 'react';
import { Layout, Button, Space, Input, Row, Flex, message } from 'antd';
import { ArrowLeftOutlined, SearchOutlined } from '@ant-design/icons';
import { FetchHistory, User } from '@/types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import HeaderComponent from '@/commons/header';
import dayjs from 'dayjs';
import {
  listLocationsByDate,
  listLocationsPoint,
} from '@/store/location/locationSlice';
import { selectAlert } from '@/store/alert/alertSlice';
import { map } from 'lodash';
import CardUser from '../user/CardUser';
import useUser from '../user/hooks/useUser';
import BoxInfo from '../mapa/commons/boxInfo';
import MapComponent from '../mapa/MapComponent';
import SelectTrip from '../user/selectTrip';
import useLocation from '../location/hooks/useLocation';
import useAuth from '../auth/hooks/useAuth';
import useAlert from '../alert/hooks/useAlert';
import CardAlert from '../alert/CardAlert';

const { Content, Sider, Footer } = Layout;

const MainPage: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<string | null>(null);
  const [showAllPoints, setShowAllPoints] = useState(true);
  const [showTripSubmit, setshowTripSubmit] = useState(false);
  const { users, fetchUsersWithLastLocation, fetchUsersWithLastLocationById } =
    useUser();
  const { locationsByDate, locationSelect, locationHistoryByUser } =
    useLocation();
  const { fetchAlert, alerts, sctAlert, changeHistoryAlert, historyAlert } =
    useAlert();
  const [showSelectTrip, setShowSelectTrip] = useState(false);
  const [showSelectAlert, setShowSelectAlert] = useState(false);
  const { currentUser } = useSelector((state: RootState) => state.auth);
  const { startLogout } = useAuth();
  const [showUsers, setShowUsers] = useState(true);
  const dispatch = useDispatch();

  const [siderWidth, setSiderWidth] = useState<number>(20);

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.cedula.toString().includes(searchTerm),
  );
  const { fetchAlertById, editAlertStatus, notifyAlertMobile } = useAlert();
  const showAlert = async ({
    id,
    iduser,
    date,
  }: {
    id: number;
    iduser: number;
    date: string;
  }) => {
    try {
      await fetchAlertById(id);
      await editAlertStatus(id, 2);
      await notifyAlertMobile(iduser, date);
    } catch (e) {
      message.error(
        `Error buscando la alerta: ${e instanceof Error ? e.message : JSON.stringify(e)}`,
      );
    }
  };
  const onSubmit = async (data: FetchHistory) => {
    try {
      const firstDate = `${dayjs(data.recorridoI).format('YYYY-MM-DD')}T00:00:00Z`;
      const lastDate = `${dayjs(data.recorridoF).format('YYYY-MM-DD')}T23:59:59Z`;
      setshowTripSubmit(true);
      const { user } = data;
      await locationHistoryByUser(firstDate, lastDate, user.toString());
    } catch (e) {
      message.error(`Error fetching user last location: ${e}`);
    }
  };
  useEffect(() => {
    if (sctAlert.length > 0) {
      setShowSelectAlert(true);
      setShowSelectTrip(false);
      setShowAllPoints(false);
      setSelectedUser(null);
    }
  }, [showSelectAlert, showAllPoints, showSelectTrip, showUsers, sctAlert]);

  useEffect(() => {
    if (currentUser?.company?.id) {
      fetchAlert(currentUser?.company?.id);
    }
  }, []);

  useEffect(() => {
    if (!showSelectTrip) {
      const fetchUsers = async () => {
        try {
          if (selectedUser && !showSelectAlert) {
            const res = await fetchUsersWithLastLocationById(
              Number(selectedUser.id),
            );
            setSelectedUser({ ...selectedUser, lastlocation: res });
          } else {
            await fetchUsersWithLastLocation(Number(currentUser.company?.id));
          }
        } catch (err) {
          setError('Failed to fetch users');
          return err;
        }
      };

      fetchUsers();

      const intervalId = setInterval(() => {
        fetchUsers();
      }, 60000);

      return () => clearInterval(intervalId);
    }
  }, [showAllPoints, showUsers, showSelectTrip, showSelectAlert]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1366) {
        setSiderWidth(15);
      } else {
        setSiderWidth(20);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Layout>
      <HeaderComponent
        user={currentUser}
        onLogout={startLogout}
        historyNotication={() => changeHistoryAlert(true)}
        detailsNotication={() => changeHistoryAlert(false)}
      />
      <Layout>
        <Sider
          width={`${siderWidth}%`}
          style={{
            background: '#fff',
            overflow: 'auto',
            position: 'relative',
          }}
        >
          <Space
            direction="vertical"
            style={{
              display: 'flex',
              padding: '10px',
              overflowY: 'auto',
              maxHeight: '90vh',
              paddingBottom: '30px',
            }}
          >
            {!showSelectTrip &&
              !selectedUser &&
              !showSelectAlert &&
              showUsers &&
              !historyAlert && (
                <>
                  <Input
                    placeholder="Buscar por nombre o cédula"
                    height="10vh"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ marginBottom: '10px' }}
                    prefix={<SearchOutlined />}
                  />
                  <div
                    style={{
                      background: '#fff',
                      overflowY: 'auto',
                      maxHeight: '70vh',
                      display: 'flex',
                      flexDirection: 'column',
                      padding: '3%',
                    }}
                  >
                    {filteredUsers.map((u, index) => (
                      <CardUser
                        key={index}
                        user={u}
                        onClick={() => {
                          setSelectedUser(u);
                          setShowUsers(false);
                          setShowAllPoints(false);
                          setShowSelectAlert(false);
                          changeHistoryAlert(false);
                        }}
                      />
                    ))}
                  </div>
                </>
              )}

            {selectedUser &&
              !showSelectTrip &&
              !showUsers &&
              !showSelectAlert &&
              !historyAlert && (
                <>
                  <Button
                    type="default"
                    icon={<ArrowLeftOutlined />}
                    onClick={() => {
                      setShowAllPoints(true);
                      setSelectedUser(null);
                      setShowUsers(true);
                      setShowSelectAlert(false);
                      changeHistoryAlert(false);
                    }}
                  >
                    Regresar
                  </Button>
                  {selectedUser && (
                    <Row gutter={[8, 16]}>
                      <BoxInfo
                        span={12}
                        title="Usuario"
                        imgSrc="/usuario.png"
                        text={selectedUser.username}
                      />
                      <BoxInfo
                        span={12}
                        title="Rumbo"
                        imgSrc="/rumbo.png"
                        text={selectedUser.lastlocation.course}
                      />
                      <BoxInfo
                        span={12}
                        title="Fecha (Ult.act)"
                        imgSrc="/fecha.png"
                        text={selectedUser.lastlocation.date?.substring(0, 10)}
                      />
                      <BoxInfo
                        span={12}
                        title="Hora (Ult.act)"
                        imgSrc="/hora.png"
                        text={selectedUser.lastlocation.date?.substring(11, 19)}
                      />
                      <BoxInfo
                        span={12}
                        title="Nomenclatura"
                        imgSrc="/pin.png"
                        text={selectedUser.lastlocation.nomenclature}
                      />
                      <BoxInfo
                        span={12}
                        title="Coordenadas"
                        imgSrc="/coordenada.png"
                        text={
                          selectedUser.lastlocation.latitude &&
                          selectedUser.lastlocation.longitude
                            ? `${Number(selectedUser.lastlocation.latitude).toFixed(6)},
                        ${Number(selectedUser.lastlocation.longitude).toFixed(6)}`
                            : 'Coordenadas no disponibles'
                        }
                        googleMapsUrl={
                          selectedUser.lastlocation.latitude &&
                          selectedUser.lastlocation.longitude
                            ? `https://www.google.com/maps/search/?api=1&query=${selectedUser.lastlocation.latitude},${selectedUser.lastlocation.longitude}`
                            : '#'
                        }
                      />
                    </Row>
                  )}
                </>
              )}
            {showSelectTrip &&
              !selectedUser &&
              !showUsers &&
              !showSelectAlert &&
              !historyAlert && (
                <SelectTrip
                  onSubmit={onSubmit}
                  locations={locationsByDate}
                  users={users}
                />
              )}
            {showSelectAlert && (
              <>
                <Button
                  type="default"
                  icon={<ArrowLeftOutlined />}
                  onClick={() => {
                    setShowAllPoints(false);
                    setSelectedUser(null);
                    setShowUsers(false);
                    dispatch(listLocationsPoint([]));
                    dispatch(listLocationsByDate([]));
                    dispatch(selectAlert([]));
                    setShowSelectAlert(false);
                    changeHistoryAlert(true);
                    setShowSelectTrip(false);
                    setshowTripSubmit(false);
                  }}
                >
                  Regresar
                </Button>
                {sctAlert && !historyAlert && (
                  <Row gutter={[8, 16]}>
                    <BoxInfo
                      span={12}
                      title="Usuario"
                      imgSrc="/usuario.png"
                      text={sctAlert[0].fullname}
                    />
                    <BoxInfo
                      span={12}
                      title="Coordenadas"
                      imgSrc="/coordenada.png"
                      text={
                        sctAlert[0]?.latitude && sctAlert[0]?.longitude
                          ? `${Number(sctAlert[0]?.latitude).toFixed(6)},
                        ${Number(sctAlert[0]?.longitude).toFixed(6)}`
                          : 'Coordenadas no disponibles'
                      }
                      googleMapsUrl={
                        sctAlert[0]?.latitude && sctAlert[0]?.longitude
                          ? `https://www.google.com/maps/search/?api=1&query=${sctAlert[0]?.latitude},${sctAlert[0]?.longitude}`
                          : '#'
                      }
                    />
                    <BoxInfo
                      span={12}
                      title="Fecha (Ult.act)"
                      imgSrc="/fecha.png"
                      text={sctAlert[0]?.date?.substring(0, 10)}
                    />
                    <BoxInfo
                      span={12}
                      title="Hora (Ult.act)"
                      imgSrc="/hora.png"
                      text={sctAlert[0]?.date?.substring(11, 19)}
                    />
                  </Row>
                )}
              </>
            )}
            {historyAlert && (
              <>
                {map(alerts, (u, index) => (
                  <div
                    style={{
                      background: '#fff',
                      overflowY: 'auto',
                      maxHeight: '70vh',
                      display: 'flex',
                      flexDirection: 'column',
                      padding: '3%',
                    }}
                  >
                    <CardAlert
                      key={index}
                      alert={u}
                      onClick={() => {
                        setSelectedUser(null);
                        showAlert({
                          id: u?.id,
                          iduser: u?.iduser,
                          date: u?.date,
                        });
                        setShowUsers(false);
                        setShowAllPoints(false);
                        setShowSelectAlert(false);
                        changeHistoryAlert(false);
                      }}
                    />
                  </div>
                ))}
              </>
            )}
          </Space>
          <Flex
            style={{
              position: 'absolute',
              bottom: 0,
              width: '100%',
              backgroundColor: '#001529',
            }}
          >
            {Array.from({ length: 2 }).map((_, i) => {
              const isUserButton = i === 0;

              const buttonStyles = {
                backgroundColor: '#001529',
                color: '#ffffff',
                border: '0px',
                borderRight: isUserButton ? '1px solid #ffffff' : 'none',
                width: '100%',
                height: '54px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '0px',
              };

              const handleClick = () => {
                if (isUserButton) {
                  setShowSelectTrip(false);
                  setSelectedUser(null);
                  setShowUsers(true);
                  setshowTripSubmit(false);
                  setShowAllPoints(true);
                  setShowSelectAlert(false);
                  dispatch(selectAlert([]));
                  changeHistoryAlert(false);
                } else {
                  if (selectedUser !== null) {
                    setSelectedUser(null);
                  }
                  setShowUsers(false);
                  setShowSelectTrip(true);
                  dispatch(listLocationsPoint([]));
                  dispatch(listLocationsByDate([]));
                  dispatch(selectAlert([]));
                  changeHistoryAlert(false);
                  setshowTripSubmit(false);
                  setShowSelectAlert(false);
                  setShowAllPoints(false);
                }
              };

              const buttonContent = isUserButton ? (
                <>
                  <div style={{ fontSize: 'smaller' }}>USUARIO</div>
                  <div style={{ fontSize: 'smaller' }}>(POS. ACT)</div>
                </>
              ) : (
                <>
                  <div style={{ fontSize: 'smaller' }}>Reporte</div>
                  <div style={{ fontSize: 'smaller' }}>por periodos</div>
                </>
              );

              return (
                <Button
                  key={i}
                  type="default"
                  style={buttonStyles}
                  onClick={handleClick}
                >
                  <h5 style={{ margin: 0 }}>{buttonContent}</h5>
                </Button>
              );
            })}
          </Flex>
        </Sider>
        <Layout style={{ padding: '0 24px 0 24px', height: '92vh' }}>
          <Content
            style={{
              padding: 10,
              margin: 0,
              minHeight: 280,
              height: '100%',
              background: '#fff',
              position: 'relative',
            }}
          >
            <MapComponent
              selectedUserNow={selectedUser}
              showTripSubmit={showTripSubmit}
              users={users}
              showAllPoints={showAllPoints}
              showSelectTrip={showSelectTrip}
              locations={locationsByDate}
              searchDateTime={locationSelect}
              showSelectAlert={showSelectAlert}
              selectAlert={sctAlert[0]}
            />
          </Content>
          <Footer
            style={{
              backgroundColor: '#F5F5F5',
              padding: '0',
              height: '3vh',
              textAlign: 'center',
            }}
          >
            <h1
              style={{
                color: '#001529',
                fontSize: '1em',
                fontWeight: 'lighter',
                padding: '0.2vh',
              }}
            >
              Desing by Ascent Software Solutions ©{new Date().getFullYear()}
            </h1>
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MainPage;
