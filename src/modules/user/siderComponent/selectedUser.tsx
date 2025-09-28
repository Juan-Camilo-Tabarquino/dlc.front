import { FC } from 'react';
import { Button, Row } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { User } from '@/types';
import BoxInfo from '@/modules/mapa/commons/boxInfo';

type SelectedUserProps = {
  selectedUser: User | null;
  showSelectTrip: boolean;
  showUsers: boolean;
  showSelectAlert: boolean;
  historyAlert: boolean;
  setSelectedUser: (user: User | null) => void;
  setShowAllPoints: (value: boolean) => void;
  setShowUsers: (value: boolean) => void;
  setShowSelectAlert: (value: boolean) => void;
  changeHistoryAlert: (value: boolean) => void;
};

const SelectedUser: FC<SelectedUserProps> = ({
  selectedUser,
  showSelectTrip,
  showUsers,
  showSelectAlert,
  historyAlert,
  setSelectedUser,
  setShowAllPoints,
  setShowUsers,
  setShowSelectAlert,
  changeHistoryAlert,
}) => {
  if (
    selectedUser &&
    !showSelectTrip &&
    !showUsers &&
    !showSelectAlert &&
    !historyAlert
  ) {
    return (
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
          style={{ marginBottom: '10px' }}
        >
          Regresar
        </Button>

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
      </>
    );
  }

  return null;
};

export default SelectedUser;
