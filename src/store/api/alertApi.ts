import { customQuery } from '@/core/rtk.core';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { alertConf } from '../conf/alert.conf';

export const alertApi = createApi({
  reducerPath: 'apiAlerts',
  keepUnusedDataFor: 60,
  baseQuery: customQuery(
    fetchBaseQuery({
      baseUrl: alertConf.host,
    }),
  ),
  tagTypes: ['Alerts'],
  endpoints: () => ({}),
});
