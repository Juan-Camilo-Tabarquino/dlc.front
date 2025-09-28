import { Role } from '@/types';
import { createSlice } from '@reduxjs/toolkit';
import { roleApiSlice } from './role.slice';
import { map } from 'lodash';

type roleState = {
  roles: Role[];
};

const rolesName: Record<string, string> = {
  admin: 'Administrador',
  movil: 'Móvil',
  superadmin: 'Super Administrador',
};

const initialState: roleState = { roles: [] };

export const roleFeature = createSlice({
  name: 'roles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      roleApiSlice.endpoints.getRoles.matchFulfilled,
      (state, action) => {
        const rolesCustom: Role[] = map(action.payload, (r) => ({
          ...r,
          customName: rolesName[r.name as string],
        }));
        state.roles = rolesCustom;
      },
    );
  },
});

export default roleFeature.reducer;
