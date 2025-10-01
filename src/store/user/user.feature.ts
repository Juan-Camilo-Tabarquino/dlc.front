import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { User } from '@/types';
import { userApiSlice } from './user.slice';

type userSate = {
  users: User[];
};

const initialState: userSate = { users: [] };

export const userFeature = createSlice({
  name: 'users',
  initialState,
  reducers: {
    listUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      userApiSlice.endpoints.getUsersWithLastLocation.matchFulfilled,
      (state, action) => {
        state.users = action.payload;
      },
    );
    builder.addMatcher(
      userApiSlice.endpoints.getUsersWithLastLocationByCompanyId.matchFulfilled,
      (state, action) => {
        state.users = action.payload;
      },
    );
  },
});

export const { listUsers } = userFeature.actions;

export default userFeature.reducer;
