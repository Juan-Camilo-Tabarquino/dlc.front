import React, { useEffect } from 'react';
import { Layout, Tabs, ConfigProvider } from 'antd';
import { isEmpty } from 'lodash';
import HeaderComponent from '@/commons/header';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import UserCards from '../user/userCard';
import CompanyCards from '../company/companyCard';
import useUser from '../user/hooks/useUser';
import useCompany from '../company/hooks/useCompany';
import useAuth from '../auth/hooks/useAuth';

const AdminPage: React.FC = () => {
  const { fetchUsersWithLocation, users } = useUser();
  const { currentUser } = useSelector((state: RootState) => state.auth);
  const { startLogout } = useAuth();
  useCompany();

  useEffect(() => {
    if (isEmpty(users)) {
      fetchUsersWithLocation();
    }
  }, []);

  return (
    <ConfigProvider
      theme={{
        components: {
          Tabs: {
            itemActiveColor: '#B8C8F3',
            itemSelectedColor: '#001529',
            itemHoverColor: '#B8C8F3',
            cardBg: 'white',
            inkBarColor: '#001529',
          },
        },
      }}
    >
      <Layout>
        <HeaderComponent
          user={currentUser}
          onLogout={startLogout}
          showAlert={() => {}}
        />
        <Layout>
          <Tabs
            defaultActiveKey="Usuarios"
            tabPosition="left"
            style={{
              width: '100%',
              height: '100%',
              minHeight: '100vh',
            }}
            tabBarStyle={{ width: '200px' }}
            items={[
              {
                key: 'Usuarios',
                label: 'Usuarios',
                children: <UserCards />,
              },
              {
                key: 'Companias',
                label: 'Compañias',
                children: <CompanyCards />,
              },
            ]}
          />
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default AdminPage;
