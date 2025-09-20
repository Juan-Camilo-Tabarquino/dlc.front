import { BASE_URL } from '@/commons/constants';
import useRole from '@/modules/role/hooks/useRole';
import useUser from '@/modules/user/hooks/useUser';
import { login, logout } from '@/store/auth/authSlice';
import { RootState } from '@/store/store';
import { message } from 'antd';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { get, isEmpty } from 'lodash';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const { post } = axios;

export default function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { token, currentUser } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const { push } = useRouter();
  const { fetchUserById } = useUser();
  const { fetchRoles } = useRole();

  const startLogin = async (username: string, password: string) => {
    try {
      const res = await post(`${BASE_URL}/auth/login`, { username, password });
      const resToken = res.data?.token;
      const resCurrentUser = res.data?.user;
      await fetchRoles();
      if (resToken.length > 0 && !isEmpty(resCurrentUser)) {
        dispatch(login({ token: resToken, currentUser: resCurrentUser }));
        localStorage.setItem('authToken', resToken);
        setIsAuthenticated(true);
        push('/maps');
        message.success(`Bienvenido: ${resCurrentUser.name}`);
      }
    } catch {
      message.error('Datos incorrectos');
    }
  };

  const checkAuth = async () => {
    try {
      const localToken = localStorage.getItem('authToken');
      if (localToken) {
        const userId = get(jwtDecode(localToken), ['sub']);
        await fetchRoles();
        const resCurrentUser = await fetchUserById(Number(userId));
        dispatch(login({ token: localToken, currentUser: resCurrentUser }));
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      setIsAuthenticated(false);
      return error;
    }
  };

  const startLogout = () => {
    push('/login');
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    dispatch(logout());
  };

  return {
    token,
    currentUser,
    startLogin,
    startLogout,
    checkAuth,
    isAuthenticated,
  };
}
