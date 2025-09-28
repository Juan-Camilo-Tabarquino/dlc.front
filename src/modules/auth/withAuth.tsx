import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';
import { filter, some, isEmpty } from 'lodash';
import Unauthorized from '@/pages/unauthorized';
import useAuth from './hooks/useAuth';
import useRole from '../role/hooks/useRole';
import Loading from './components/Loading';

const withAuth =
  <T,>(Componente: NextPage<T>, allowedRoles: string[]) =>
  // eslint-disable-next-line react/display-name
  (props: T) => {
    const { push } = useRouter();
    const { isAuthenticated, checkAuth, currentUser, isLoginLoading } =
      useAuth();
    const { roles: rolesDB, isLoadingRoles } = useRole();

    const userRoles = useMemo(
      () => filter(rolesDB, (r) => Number(r.id) === Number(currentUser.role)),
      [rolesDB, currentUser],
    );

    useEffect(() => {
      checkAuth();
    }, []);

    if (
      isLoginLoading ||
      isLoadingRoles ||
      isEmpty(userRoles) ||
      isEmpty(rolesDB)
    ) {
      return (
        <div style={{ height: '100vh', backgroundColor: '#ffffff' }}>
          <Loading />
        </div>
      );
    }

    if (!isAuthenticated) {
      push('/login');
      return null;
    }

    if (some(userRoles, (r) => allowedRoles.includes(r.name))) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return <Componente {...props} />;
    }

    return <Unauthorized />;
  };

export default withAuth;
