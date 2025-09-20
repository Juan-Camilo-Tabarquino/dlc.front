import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { User } from '@/types';

type authSate = {
    token: string
    currentUser: User
}

const initialState:authSate = {
  token: '',
  currentUser: {} as User,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<authSate>) => {
      state.token = action.payload.token;
      state.currentUser = action.payload.currentUser;
    },
    logout: (state) => {
      state.token = ''; // Clear the token
      state.currentUser = {} as User; // Reset currentUser to an empty user object
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
