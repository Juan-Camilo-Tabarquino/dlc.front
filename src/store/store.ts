import { configureStore } from '@reduxjs/toolkit';
import userSliceReducer from './user/userSlice';
import companySliceReducer from './company/companySlice';
import locationSliceReducer from './location/locationSlice';
import authSliceReducer from './auth/authSlice';
import roleSliceReducer from './role/roleSlice';
import alertSliceReducer from './alert/alertSlice';

export const store = configureStore({
  reducer: {
    users: userSliceReducer,
    companies: companySliceReducer,
    locations: locationSliceReducer,
    auth: authSliceReducer,
    roles: roleSliceReducer,
    alerts: alertSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
