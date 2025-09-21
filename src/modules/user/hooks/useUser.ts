import { BASE_URL } from '@/commons/constants';
import type { RootState } from '@/store/store';
import { listUsers } from '@/store/user/userSlice';
import { NewUser, User } from '@/types';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

const { get, post, put } = axios;

export default function useUser() {
  const { users } = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch();
  const fetchUsers = async () => {
    try {
      const res = await get(`${BASE_URL}/users`);
      dispatch(listUsers(res.data));
    } catch (error) {
      return error;
    }
  };
  const fetchUsersWithLocation = async () => {
    try {
      const res = await get(`${BASE_URL}/users/user/withalllastlocation`);
      dispatch(listUsers(res.data));
    } catch (error) {
      return error;
    }
  };

  const fetchUserById = async (id: number) => {
    try {
      const res = await get(`${BASE_URL}/users/${id}`);
      return res.data;
    } catch (error) {
      return error;
    }
  };

  const fetchUsersWithLastLocation = async (companyId: number) => {
    try {
      const res = await get(
        `${BASE_URL}/users/user/withLastLocation/${companyId}`,
      );
      dispatch(listUsers(res.data));
    } catch (error) {
      return error;
    }
  };

  const fetchUsersWithLastLocationById = async (userId: number) => {
    try {
      const res = await get(`${BASE_URL}/lastlocations/${userId}`);
      return res.data;
    } catch (error) {
      return error;
    }
  };

  const addNewUser = async (data: Partial<NewUser>) => {
    try {
      const { company, ...restData } = data;
      const newUser: Partial<NewUser> = {
        ...restData,
        createDate: new Date().toLocaleDateString(),
        companyId: Number(company),
      };

      const res = await post(`${BASE_URL}/users/createUser`, newUser);
      return res;
    } catch (error) {
      return error;
    }
  };

  const activeUser = async (id: number) => {
    try {
      const res = await put(`${BASE_URL}/users/active/${id}`);
      return res;
    } catch (error) {
      return error;
    }
  };

  const editUser = async (infoEditUser: User) => {
    try {
      const res = await put(
        `${BASE_URL}/users/${infoEditUser?.id}`,
        infoEditUser,
      );
      return res;
    } catch (error) {
      return error;
    }
  };

  const editPasswordUser = async (id: number, passsword: string) => {
    try {
      const res = await put(`${BASE_URL}/users/updatepassword/${id}`, {
        newPassword: passsword,
      });
      return res;
    } catch (error) {
      return error;
    }
  };

  return {
    users,
    fetchUsers,
    fetchUsersWithLocation,
    fetchUsersWithLastLocation,
    fetchUsersWithLastLocationById,
    addNewUser,
    editUser,
    editPasswordUser,
    activeUser,
    fetchUserById,
  };
}
