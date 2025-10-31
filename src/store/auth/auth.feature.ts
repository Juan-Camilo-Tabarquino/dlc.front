import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { User } from '@/types';
import { authApiSlice } from './auth.slice';
import { isEmpty } from 'lodash';
import { message } from 'antd';

type authSate = {
  token: string;
  currentUser: User;
  isAuthenticated: boolean;
};

const initialState: authSate = {
  token: '',
  currentUser: {} as User,
  isAuthenticated: false,
};

export const authFeature = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<authSate>) => {
      state.token = action.payload.token;
      state.currentUser = action.payload.currentUser;
      state.isAuthenticated = action.payload.isAuthenticated;
    },
    logout: (state) => {
      state.token = '';
      state.currentUser = {} as User;
      state.isAuthenticated = false;
      localStorage.removeItem('authToken');
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApiSlice.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        const { token, user } = payload;
        if (token.length > 0 && !isEmpty(user)) {
          state.token = token;
          state.currentUser = user;
          state.isAuthenticated = true;
          localStorage.setItem('authToken', token);
        }
      },
    );
    builder.addMatcher(authApiSlice.endpoints.login.matchRejected, () => {
      message.error('Datos incorrectos');
    });
  },
});

export const { login, logout } = authFeature.actions;

export default authFeature.reducer;
