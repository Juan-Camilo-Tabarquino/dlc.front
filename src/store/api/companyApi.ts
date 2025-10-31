import { customQuery } from '@/core/rtk.core';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { companyConf } from '../conf/company.conf';

export const companyApi = createApi({
  reducerPath: 'apiCompanies',
  keepUnusedDataFor: 60,
  baseQuery: customQuery(
    fetchBaseQuery({
      baseUrl: companyConf.host,
    }),
  ),
  tagTypes: ['Companies'],
  endpoints: () => ({}),
});
