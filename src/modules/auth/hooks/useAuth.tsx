import useUser from '@/modules/user/hooks/useUser';
import { login, logout } from '@/store/auth/auth.feature';
import { useLoginMutation } from '@/store/auth/auth.slice';
import { RootState } from '@/store/store';
import { message } from 'antd';
import { jwtDecode } from 'jwt-decode';
import { get } from 'lodash';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

export default function useAuth() {
  const { token, currentUser, isAuthenticated } = useSelector(
    (state: RootState) => state.auth,
  );
  const dispatch = useDispatch();
  const { push } = useRouter();
  const { fetchUserById } = useUser();
  const [loginMutation, { isLoading: isLoginLoading }] = useLoginMutation();

  const startLogin = async (username: string, password: string) => {
    const res = await loginMutation({ username, password }).unwrap();
    push('/maps');
    message.success(`Bienvenido: ${res.user.name}`);
  };

  const checkAuth = async () => {
    try {
      const localToken = localStorage.getItem('authToken');
      if (localToken) {
        const userId = get(jwtDecode(localToken), ['sub']);
        const resCurrentUser = await fetchUserById(Number(userId));
        dispatch(
          login({
            token: localToken,
            currentUser: resCurrentUser,
            isAuthenticated: true,
          }),
        );
        push('/maps');
      }
    } catch (error) {
      return error;
    }
  };

  const startLogout = () => {
    push('/login');
    dispatch(logout());
  };

  return {
    token,
    currentUser,
    startLogin,
    startLogout,
    checkAuth,
    isLoginLoading,
    isAuthenticated,
  };
}
