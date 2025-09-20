import { BASE_URL } from '@/commons/constants';
import {
  changeAlertStatus,
  listAlerts,
  listAlertsNoRead,
  selectAlert,
} from '@/store/alert/alertSlice';
import type { RootState } from '@/store/store';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

const { post, get, put } = axios;

export default function useAlert() {
  const [historyAlert, setHistoryAlert] = useState(false);

  const { alerts, sctAlert, alertsNoRead } = useSelector(
    (state: RootState) => state.alerts,
  );

  const dispatch = useDispatch();
  const fetchAlert = async (idCompany: number) => {
    try {
      const res = await get(`${BASE_URL}/alerts/alertsbycompany/${idCompany}`);
      dispatch(listAlerts(res.data));
    } catch (error) {
      return error;
    }
  };
  const fetchAlertNoRead = async (idCompany: number) => {
    try {
      const res = await get(
        `${BASE_URL}/alerts/activealertsbycompany/${idCompany}`,
      );
      dispatch(listAlertsNoRead(res.data));
    } catch (error) {
      return error;
    }
  };

  const fetchAlertById = async (id: number) => {
    try {
      const res = await get(`${BASE_URL}/alerts/alertsbyid/${id}`);
      dispatch(selectAlert(res.data));
    } catch (error) {
      return error;
    }
  };
  const editAlertStatus = async (id: number, status: number) => {
    try {
      const res = await put(`${BASE_URL}/alerts/changestatus/${id}`, {
        status,
      });
      dispatch(changeAlertStatus(res.data));
      return res;
    } catch (error) {
      return error;
    }
  };

  const notifyAlertMobile = async (iduser: number, date: string) => {
    try {
      const res = await post(`${BASE_URL}/notifications/send`, {
        title: 'Alerta leida',
        userId: iduser,
        body: `La alerta enviada en la fecha ${date.substring(0, 10)} y hora ${date.substring(11, 19)} fue leida`,
      });

      return res;
    } catch (error) {
      return error;
    }
  };

  const changeHistoryAlert = (b: boolean) => {
    setHistoryAlert(b);
  };
  return {
    alerts,
    sctAlert,
    alertsNoRead,
    historyAlert,
    fetchAlert,
    fetchAlertById,
    editAlertStatus,
    fetchAlertNoRead,
    notifyAlertMobile,
    changeHistoryAlert,
  };
}
