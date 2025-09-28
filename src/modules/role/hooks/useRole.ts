import { useGetRolesQuery } from '@/store/role/role.slice';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';

export default function useRole() {
  const { roles } = useSelector((state: RootState) => state.roles);
  const { isLoading: isLoadingRoles } = useGetRolesQuery();

  return {
    roles,
    isLoadingRoles,
  };
}
