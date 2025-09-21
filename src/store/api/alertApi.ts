import { customQuery } from '@/core/rtk.core';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const alertApi = createApi({
  reducerPath: 'apiAlerts',
  keepUnusedDataFor: 60,
  baseQuery: customQuery(
    fetchBaseQuery({
      baseUrl: process.env.BACKEND_URL,
    }),
  ),
  tagTypes: ['Alerts'],
  endpoints: () => ({}),
});
