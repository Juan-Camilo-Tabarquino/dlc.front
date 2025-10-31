import { customQuery } from '@/core/rtk.core';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { locationConf } from '../conf/location.conf';

export const locationApi = createApi({
  reducerPath: 'apiLocations',
  keepUnusedDataFor: 60,
  baseQuery: customQuery(
    fetchBaseQuery({
      baseUrl: locationConf.host,
    }),
  ),
  tagTypes: ['Locations'],
  endpoints: () => ({}),
});
