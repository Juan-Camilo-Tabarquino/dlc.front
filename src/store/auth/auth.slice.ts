import { User } from '@/types';
import { authApi } from '../api/authApi';
import { authConf } from '../conf/auth.conf';

export const authApiSlice = authApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<
      { token: string; user: User },
      { username: string; password: string }
    >({
      query: (payload) => ({
        url: authConf.endpoints.login,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['Auth'],
    }),
  }),
});

export const { useLoginMutation } = authApiSlice;
