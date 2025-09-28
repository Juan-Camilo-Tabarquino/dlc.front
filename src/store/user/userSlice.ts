import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { User } from '@/types';

type userSate = {
  users: User[];
};

const initialState: userSate = { users: [] };

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    listUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
  },
});

export const { listUsers } = userSlice.actions;

export default userSlice.reducer;
