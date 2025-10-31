import { customQuery } from '@/core/rtk.core';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { userConf } from '../conf/user.conf';

export const userApi = createApi({
  reducerPath: 'usersApi',
  keepUnusedDataFor: 60,
  baseQuery: customQuery(
    fetchBaseQuery({
      baseUrl: userConf.host,
    }),
  ),
  tagTypes: ['User'],
  endpoints: () => ({}),
});
