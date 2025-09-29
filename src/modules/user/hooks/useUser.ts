import type { RootState } from '@/store/store';
import {
  useActiveUserMutation,
  useAddNewUserMutation,
  useEditPasswordUserMutation,
  useEditUserMutation,
  useGetUsersWithLastLocationQuery,
} from '@/store/user/user.slice';
import { NewUser, User } from '@/types';
import { message } from 'antd';
import { useSelector } from 'react-redux';

export default function useUser() {
  const { users } = useSelector((state: RootState) => state.users);
  const { isLoading: isLoadingUsers } = useGetUsersWithLastLocationQuery();
  const [createNewUser, { error: errorNewUser }] = useAddNewUserMutation();
  const [editUserMutation, { error: errorEditUser }] = useEditUserMutation();
  const [editPasswordUserMutation, { error: errorEditPasswordUser }] =
    useEditPasswordUserMutation();
  const [activeUserMutation, { error: errorActiveUser }] =
    useActiveUserMutation();

  const addNewUser = async (data: Partial<NewUser>) => {
    const { company, ...restData } = data;
    const newUser: Partial<NewUser> = {
      ...restData,
      createDate: new Date().toLocaleDateString(),
      companyId: Number(company),
    };
    await createNewUser(newUser);
    if (errorNewUser) message.error('El usuario no se ha creado exitosamente');
    message.success('El usuario se ha creado exitosamente');
  };

  const activeUser = async (id: number) => {
    await activeUserMutation(id);
    if (errorActiveUser)
      message.error('El estado de la compañía se actualizó correctamente');
    message.success('El estado de la compañía se actualizó correctamente');
  };

  const editUser = async (infoEditUser: User) => {
    await editUserMutation(infoEditUser);
    if (errorEditUser)
      message.error('El usuario no se ha modificado exitosamente');
    message.success('El usuario se ha modificado exitosamente');
  };

  const editPasswordUser = async (id: number, passsword: string) => {
    await editPasswordUserMutation({ id, newPassword: passsword });
    if (errorEditPasswordUser)
      message.error('El usuario no se ha modificado exitosamente');
    message.success('El usuario se ha modificado exitosamente');
  };

  return {
    users,
    isLoadingUsers,
    // fetchUsers,
    // fetchUsersWithLocation,
    // fetchUsersWithLastLocation,
    // fetchUsersWithLastLocationById,
    addNewUser,
    editUser,
    editPasswordUser,
    activeUser,
    // fetchUserById,
  };
}
