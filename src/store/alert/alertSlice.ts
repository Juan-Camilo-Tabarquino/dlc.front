import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Alert } from '@/types';

type alertState = {
  alerts: Alert[];
  sctAlert: Alert[];
  alertsNoRead: Alert[];
};

const initialState: alertState = {
  alerts: [],
  sctAlert: [],
  alertsNoRead: [],
};

export const alertSlice = createSlice({
  name: 'alerts',
  initialState,
  reducers: {
    listAlerts: (state, action: PayloadAction<Alert[]>) => {
      state.alerts = action.payload;
    },
    addNewAlert: (state, action: PayloadAction<Alert>) => {
      if (
        state.alerts.find((alert) => alert.id === action.payload.id) ||
        state.alertsNoRead.find((alert) => alert.id === action.payload.id)
      ) {
        return;
      }
      state.alerts.push(action.payload);
      state.alertsNoRead.push(action.payload);
    },
    listAlertsNoRead: (state, action: PayloadAction<Alert[]>) => {
      state.alertsNoRead = action.payload;
    },
    selectAlert: (state, action: PayloadAction<Alert[]>) => {
      state.sctAlert = action.payload;
    },
    changeAlertStatus: (state, action: PayloadAction<Alert>) => {
      state.alerts = state.alerts.map((alert) =>
        alert.id === action.payload.id
          ? {
              ...alert,
              status: action.payload.status,
            }
          : alert,
      );
      state.alertsNoRead = state.alertsNoRead.filter(
        (alert) => alert.id !== action.payload.id,
      );
    },
  },
});

export const {
  listAlerts,
  listAlertsNoRead,
  selectAlert,
  addNewAlert,
  changeAlertStatus,
} = alertSlice.actions;

export default alertSlice.reducer;
