import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';

// Importa tus slices actuales
import userSliceReducer from './user/userSlice';
import companySliceReducer from './company/companySlice';
import locationSliceReducer from './location/locationSlice';
import authSliceReducer from './auth/authSlice';
import roleSliceReducer from './role/roleSlice';
// import alertSliceReducer from './alert/alertSlice';
import { alertApi } from './api/alertApi';
import { alertFeature } from './alert/alert.feature';

// (Ejemplo) Si luego agregas APIs con RTK Query, las importarías aquí:
// import { authApi } from './api/auth.api';
// import { usersApi } from './api/users.api';

const IS_PRODUCTION = process.env.MODE === 'production';

// Reducers combinados
const reducers = {
  // Cuando uses RTK Query, agregarías aquí:
  // [usersApi.reducerPath]: usersApi.reducer,
  [alertApi.reducerPath]: alertApi.reducer,

  users: userSliceReducer,
  companies: companySliceReducer,
  locations: locationSliceReducer,
  auth: authSliceReducer,
  roles: roleSliceReducer,
  // alerts: alertSliceReducer,
  [alertFeature.name]: alertFeature.reducer,
};

// Middlewares (listo para RTK Query en el futuro)
const apiMiddlewares = [
  alertApi.middleware,
  // authApi.middleware,
  // usersApi.middleware,
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const middleware = (getDefaultMiddleware: any) => {
  const defaultMiddleware = getDefaultMiddleware();
  return IS_PRODUCTION
    ? defaultMiddleware.concat(apiMiddlewares)
    : defaultMiddleware.concat(apiMiddlewares, logger);
};

// Configuración del store
export const store = configureStore({
  reducer: reducers,
  devTools: !IS_PRODUCTION,
  middleware,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const appDispatch = store.dispatch;
