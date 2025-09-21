import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { filter, some } from 'lodash';
import Unauthorized from '@/pages/unauthorized';
import useAuth from './hooks/useAuth';
import useRole from '../role/hooks/useRole';

const withAuth =
  <T,>(Componente: NextPage<T>, allowedRoles: string[]) =>
  // eslint-disable-next-line react/display-name
  (props: T) => {
    const { push } = useRouter();
    const { isAuthenticated, checkAuth, currentUser } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const { fetchRoles, roles: rolesDB } = useRole();
    const userRoles = filter(
      rolesDB,
      (r) => Number(r.id) === Number(currentUser.role),
    );

    useEffect(() => {
      const verifyAuth = async () => {
        await checkAuth();
        setIsLoading(false);
      };
      verifyAuth();
    }, [isAuthenticated]);

    useEffect(() => {
      fetchRoles();
    }, []);

    if (isLoading) {
      return null;
    }

    if (!isLoading && !isAuthenticated) {
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
