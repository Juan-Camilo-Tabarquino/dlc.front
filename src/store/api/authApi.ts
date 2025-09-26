import { customQuery } from '@/core/rtk.core';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { authConf } from '../conf/auth.conf';

export const authApi = createApi({
  reducerPath: 'apiAuth',
  keepUnusedDataFor: 60,
  baseQuery: customQuery(
    fetchBaseQuery({
      baseUrl: authConf.host,
    }),
  ),
  tagTypes: ['Auth'],
  endpoints: () => ({}),
});
