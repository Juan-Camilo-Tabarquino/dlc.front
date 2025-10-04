import React, { useState } from 'react';
import {
  Card,
  Col,
  Row,
  Input,
  Button,
  Modal,
  Pagination,
  Tooltip,
  Switch,
  Typography,
  Popconfirm,
  App,
} from 'antd';
import {
  EditOutlined,
  UserOutlined,
  PlusOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import useCompany from '@/modules/company/hooks/useCompany';
import CompanyForm from '@/modules/company/CompanyForm';
import { Company } from '@/types';

const { Title } = Typography;
const { Meta } = Card;
const { Search } = Input;

const CompanyCards = () => {
  const [searchValue, setSearchValue] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);
  const { companies, onSubmit, handleActiveCompany } = useCompany();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | object>({});

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  const filteredCompanies = companies.filter((company) =>
    company.name.toLowerCase().includes(searchValue.toLowerCase()),
  );

  const handleAddUser = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsEdit(false);
    setSelectedCompany({});
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const handleEditClick = (company: Company) => {
    setIsEdit(true);
    setSelectedCompany(company);
    setIsModalVisible(true);
  };

  const handleConfirm = async (companyId: number) => {
    handleActiveCompany(companyId);
  };

  const handleOnSubmit = async (data: Partial<Company>, isEdit: boolean) => {
    onSubmit(data, isEdit);
    setIsModalVisible(false);
    setIsEdit(false);
    setSelectedCompany({});
  };
  const paginatedCompany = filteredCompanies.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <App>
      <Col style={{ paddingRight: 24, paddingTop: 24 }}>
        <Title level={1}>Administra las compañías aquí!</Title>
        <Row gutter={16}>
          <Col span={12}>
            <Search
              placeholder="Buscar por nombre de compañía"
              onSearch={handleSearch}
              onChange={(e) => handleSearch(e.target.value)}
              style={{ marginBottom: 20 }}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          {paginatedCompany.map((company) => (
            <Col key={company.id} flex="0 0 300px">
              <Card
                actions={[
                  <Tooltip key={company.id} title="Editar Compañía">
                    <EditOutlined
                      key="edit"
                      onClick={() => handleEditClick(company)}
                    />
                  </Tooltip>,
                  <Tooltip
                    key={company.id}
                    title="Deshabilitar/ habilitar compañía"
                  >
                    <Popconfirm
                      title="¿Estás seguro de cambiar el estado de esta compañía?"
                      icon={<ExclamationCircleOutlined />}
                      description="Esta acción puede cambiar el estado actual de la compañía"
                      okText="Sí"
                      cancelText="No"
                      onConfirm={() => handleConfirm(company.id)}
                    >
                      <Switch
                        checked={company.active}
                        onChange={() => {}}
                        style={{
                          backgroundColor: company.active
                            ? '#1890ff'
                            : '#d9d9d9',
                          borderColor: company.active ? '#1890ff' : '#d9d9d9',
                        }}
                      />
                    </Popconfirm>
                  </Tooltip>,
                ]}
                style={{ width: 350, height: 150 }}
              >
                <Meta
                  avatar={<UserOutlined />}
                  title={`${company.name}`}
                  description={company.active ? 'Activo' : 'Inactivo'}
                />
              </Card>
            </Col>
          ))}
        </Row>
        <Pagination
          current={currentPage}
          pageSize={itemsPerPage}
          total={filteredCompanies.length}
          onChange={handlePageChange}
          style={{ marginTop: 20, textAlign: 'center' }}
        />
        <Tooltip title="Añadir Usuario">
          <Button
            type="primary"
            shape="circle"
            icon={<PlusOutlined style={{ fontSize: '24px' }} />}
            onClick={handleAddUser}
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
          title={isEdit ? 'Editar Compañia' : 'Añadir Nueva Compañia'}
          open={isModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          <CompanyForm
            initialValues={selectedCompany}
            onSubmit={handleOnSubmit}
            isEdit={isEdit}
          />
        </Modal>
      </Col>
    </App>
  );
};

export default CompanyCards;
