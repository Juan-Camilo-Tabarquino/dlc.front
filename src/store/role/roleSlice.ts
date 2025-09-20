import { Role } from '@/types';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type roleState = {
    roles: Role[]
}

const initialState:roleState = { roles: [] };

export const roleSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {
    listRoles: (state, action: PayloadAction<Role[]>) => {
      state.roles = action.payload;
    },
  },
});

export const { listRoles } = roleSlice.actions;

export default roleSlice.reducer;
