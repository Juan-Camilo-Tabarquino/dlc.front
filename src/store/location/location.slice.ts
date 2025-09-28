import { LocationByDate } from '@/types';
import { locationApi } from '../api/locationApi';
import { locationConf } from '../conf/location.conf';

export const locationApiSlice = locationApi.injectEndpoints({
  endpoints: (builder) => ({
    getLocationHistoryByUser: builder.query<
      LocationByDate[],
      {
        startDate: string;
        finalDate: string;
        userId: string;
      }
    >({
      query: ({ startDate, finalDate, userId }) => ({
        url: locationConf.endpoints.getLocationHistoryByUser,
        method: 'GET',
        params: { startDate, finalDate, userId },
      }),
      providesTags: ['Locations'],
    }),
  }),
});

export const {
  useGetLocationHistoryByUserQuery,
  useLazyGetLocationHistoryByUserQuery,
} = locationApiSlice;
