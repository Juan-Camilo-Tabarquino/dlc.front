import { BASE_URL } from '@/commons/constants';
import { listRoles } from '@/store/role/roleSlice';
import { RootState } from '@/store/store';
import { Role } from '@/types';
import axios, { AxiosError } from 'axios';
import { map } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';

const { get } = axios;
const rolesName: Record<string, string> = {
  admin: 'Administrador',
  movil: 'Móvil',
  superadmin: 'Super Administrador',
};

export default function useRole() {
  const { roles } = useSelector((state: RootState) => state.roles);
  const dispatch = useDispatch();

  const fetchRoles = async () => {
    try {
      const res = await get(`${BASE_URL}/roles`);

      const rolesCustom: Role[] = map(res.data, (r) => ({
        ...r,
        customName: rolesName[r.name as string],
      }));
      dispatch(listRoles(rolesCustom));
      return rolesCustom;
    } catch (error) {
      if (error instanceof AxiosError) {
        return error.response?.data;
      }
      return {
        error: 'Unknown',
        message: 'Error Desconocido',
      };
    }
  };

  return {
    roles,
    fetchRoles,
  };
}
