import { Role } from '@/types';
import { roleApi } from '../api/roleApi';
import { roleConf } from '../conf/role.conf';

export const roleApiSlice = roleApi.injectEndpoints({
  endpoints: (builder) => ({
    getRoles: builder.query<Role[], void>({
      query: () => ({
        url: roleConf.endpoints.getRoles,
        method: 'GET',
      }),
      providesTags: ['Roles'],
    }),
  }),
});

export const { useGetRolesQuery, useLazyGetRolesQuery } = roleApiSlice;
