import React, { useEffect, useState } from 'react';
import {
  Col,
  Row,
  Input,
  Button,
  Modal,
  Pagination,
  Tooltip,
  message,
  App,
  Typography,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import UserForm from '@/modules/user/UserForm';
import { NewUser, User } from '@/types';
import useUser from '@/modules/user/hooks/useUser';
import useCompany from '@/modules/company/hooks/useCompany';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import UserChagePasswordForm from '@/modules/user/UserChagePasswordForm';
import UserCardEsp from '@/modules/user/userCardEsp';

const { Title } = Typography;
const { Search } = Input;

const UserCards = () => {
  const [searchValue, setSearchValue] = useState('');
  const [companySearchValue, setCompanySearchValue] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<User | object>({});
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isPassword, setIsPassword] = useState<boolean>(false);
  const [itemsPerPage] = useState(9);
  const { companies } = useCompany();
  const { roles } = useSelector((state: RootState) => state.roles);
  const {
    fetchUsersWithLocation,
    users, activeUser, addNewUser, editUser, editPasswordUser,
  } = useUser();

  const [refreshTrigger, setRefreshTrigger] = useState(false);

  useEffect(() => {
    fetchUsersWithLocation();
  }, [refreshTrigger]);

  const handleSearch = (value: string) => {
    setCurrentPage(1);
    setSearchValue(value);
  };

  const handleCompanySearch = (value: string) => {
    setCurrentPage(1);
    setCompanySearchValue(value);
  };

  const filteredUsers = users.filter((user) => {
    const matchesName = `${user.name} ${user.lastname}`
      .toLowerCase()
      .includes(searchValue.toLowerCase());

    const matchesCompany = user.company && typeof user.company.name === 'string'
      ? user.company.name
        .toLowerCase()
        .includes(companySearchValue.toLowerCase())
      : false;

    const noNameFilter = !searchValue;
    const noCompanyFilter = !companySearchValue;

    return (noNameFilter || matchesName) && (noCompanyFilter || matchesCompany);
  });

  const onSubmit = async (data: Partial<NewUser>) => {
    const tempUser = {
      ...data,
      role: Number(data.role),
      password: String(data.password),
    };

    try {
      if (isEdit) {
        const res = await editUser({ ...selectedUser, ...tempUser } as User);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (res.status === 200) {
          message.success('El usuario se ha modificado exitosamente');
        } else {
          message.error('El usuario no se ha modificado exitosamente');
        }
      } else if (isPassword && selectedUser && 'id' in selectedUser) {
        const res = await editPasswordUser(selectedUser.id, tempUser.password);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (res.status === 200) {
          message.success('El usuario se ha modificado exitosamente');
        } else {
          message.error('El usuario no se ha modificado exitosamente');
        }
      } else {
        const res = await addNewUser(tempUser);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (res.status === 201) {
          message.success('El usuario se ha creado exitosamente');
        } else {
          message.error('El usuario no se ha creado exitosamente');
        }
      }
      setIsModalVisible(false);
      setRefreshTrigger((prev) => !prev);
    } catch (error) {
      message.error('Error al crear el usuario');
      return error;
    } finally {
      setIsEdit(false);
      setSelectedUser({});
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsEdit(false);
    setIsPassword(false);
    setSelectedUser({});
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleEditClick = (user: User) => {
    setIsEdit(true);
    setIsPassword(false);
    setSelectedUser(user);
    setIsModalVisible(true);
  };
  const handlePasswordClick = (user: User) => {
    setIsEdit(false);
    setIsPassword(true);
    setSelectedUser(user);
    setIsModalVisible(true);
  };

  const handleConfirm = async (userId: number) => {
    try {
      await activeUser(userId);
      message.success('El estado de la compañía se actualizó correctamente');
      setRefreshTrigger((prev) => !prev);
    } catch (error) {
      message.error('No fue posible actualizar el estado de la compañía');
      return error;
    }
  };

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <App>
      <Col style={{ paddingRight: 24, paddingTop: 24 }}>
        <Title level={1}>Administra los usuarios aquí!</Title>
        <Row gutter={16}>
          <Col span={12}>
            <Search
              placeholder="Buscar por nombre o apellido"
              onSearch={handleSearch}
              onChange={(e) => handleSearch(e.target.value)}
              style={{ marginBottom: 20 }}
            />
          </Col>
          <Col span={12}>
            <Search
              placeholder="Buscar por compañía"
              onSearch={handleCompanySearch}
              onChange={(e) => handleCompanySearch(e.target.value)}
              style={{ marginBottom: 20 }}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]} wrap>
          {paginatedUsers.map((user) => (
            <Col key={user.id} flex="0 0 300px">
              <UserCardEsp
                user={user}
                handleEditClick={handleEditClick}
                handlePasswordClick={handlePasswordClick}
                handleConfirm={handleConfirm}
              />
            </Col>
          ))}
        </Row>

        <Pagination
          current={currentPage}
          pageSize={itemsPerPage}
          total={filteredUsers.length}
          onChange={handlePageChange}
          style={{ marginTop: 20, textAlign: 'center' }}
        />
        <Tooltip title="Añadir Usuario">
          <Button
            type="primary"
            shape="circle"
            icon={<PlusOutlined style={{ fontSize: '24px' }} />}
            onClick={() => setIsModalVisible(true)}
            style={{
              position: 'fixed',
              bottom: 30,
              right: 30,
              zIndex: 1000,
              width: 60,
              height: 60,
              fontSize: 24,
              lineHeight: '60px',
            }}
          />
        </Tooltip>
        <Modal
          // eslint-disable-next-line no-nested-ternary
          title={isPassword ? 'Cambiar Contraseña' : isEdit ? 'Editar Usuario' : 'Añadir Nuevo Usuario'}
          open={isModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          {
            isPassword ? (
              <UserChagePasswordForm
                initialValues={{ id: 'id' in selectedUser ? (selectedUser as User).id : undefined }}
                onSubmit={onSubmit}
              />
            )
              : (
                <UserForm
                  initialvalues={selectedUser}
                  isEdit={isEdit}
                  onSubmit={onSubmit}
                  companies={companies}
                  roles={roles}
                />
              )

          }

        </Modal>
      </Col>
    </App>
  );
};

export default UserCards;
