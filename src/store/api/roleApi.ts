import { customQuery } from '@/core/rtk.core';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { roleConf } from '../conf/role.conf';

export const roleApi = createApi({
  reducerPath: 'apiRole',
  keepUnusedDataFor: 60,
  baseQuery: customQuery(
    fetchBaseQuery({
      baseUrl: roleConf.host,
    }),
  ),
  tagTypes: ['Roles'],
  endpoints: () => ({}),
});
