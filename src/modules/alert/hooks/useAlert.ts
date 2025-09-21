import { BASE_URL } from '@/commons/constants';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { selectAlert } from '@/store/alert/alert.feature';
import {
  useChangeAlertStatusMutation,
  useLazyGetAlertsNoReadQuery,
  useLazyGetAlertsQuery,
} from '@/store/alert/alert.slice';
import { User } from '@/types';
import { message } from 'antd';
import { RootState } from '@/store/store';

const { post, get } = axios;

export default function useAlert({ currentUser }: { currentUser: User }) {
  const [historyAlert, setHistoryAlert] = useState(false);
  const { sctAlert } = useSelector((state: RootState) => state.alerts);

  const dispatch = useDispatch();
  // const fetchAlert = async (idCompany: number) => {
  //   try {
  //     const res = await get(`${BASE_URL}/alerts/alertsbycompany/${idCompany}`);
  //     dispatch(listAlerts(res.data));
  //   } catch (error) {
  //     return error;
  //   }
  // };

  const [triggerAlertsNoRead, { data: alertsNoRead }] =
    useLazyGetAlertsNoReadQuery();
  const [triggerAlerts, { data: alerts }] = useLazyGetAlertsQuery();
  const [changeAlertStatus] = useChangeAlertStatusMutation();

  useEffect(() => {
    triggerAlerts(currentUser?.company?.id);
    triggerAlertsNoRead(currentUser?.company?.id);
  }, [currentUser]);

  // const fetchAlertNoRead = async (idCompany: number) => {
  //   try {
  //     const res = await get(
  //       `${BASE_URL}/alerts/activealertsbycompany/${idCompany}`,
  //     );
  //     dispatch(listAlertsNoRead(res.data));
  //   } catch (error) {
  //     return error;
  //   }
  // };

  const fetchAlertById = async (id: number) => {
    try {
      const res = await get(`${BASE_URL}/alerts/alertsbyid/${id}`);
      dispatch(selectAlert(res.data));
    } catch (error) {
      return error;
    }
  };
  // const editAlertStatus = async (id: number, status: number) => {
  //   try {
  //     const res = await put(`${BASE_URL}/alerts/changestatus/${id}`, {
  //       status,
  //     });
  //     dispatch(changeAlertStatus(res.data));
  //     return res;
  //   } catch (error) {
  //     return error;
  //   }
  // };

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

  const showAlert = async ({
    id,
    iduser,
    date,
  }: {
    id: number;
    iduser: number;
    date: string;
  }) => {
    try {
      await fetchAlertById(id);
      // detailsNotication?.(false);
      changeAlertStatus({ id, status: 2 });
      await notifyAlertMobile(iduser, date);
    } catch (e) {
      message.error(
        `Error buscando la alerta: ${e instanceof Error ? e.message : JSON.stringify(e)}`,
      );
    }
  };

  return {
    alerts,
    sctAlert,
    alertsNoRead: alertsNoRead ?? [],
    changeAlertStatus,
    historyAlert,
    // fetchAlert,
    fetchAlertById,
    // editAlertStatus,
    // fetchAlertNoRead,
    notifyAlertMobile,
    changeHistoryAlert,
    showAlert,
  };
}
