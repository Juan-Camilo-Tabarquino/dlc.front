export const alertConf = {
  host: process.env.BACKEND_URL,
  endpoints: {
    getAlerts: '/alerts/alertsbycompany/${idCompany}',
    getAlertsNoRead: '/alerts/activealertsbycompany/${idCompany}',
    getAlertById: '/alerts/alertsbyid/${id}',
    changeAlertStatus: '/alerts/changestatus/${id}',
    notifyAlertMobile: '/notifications/send',
  },
};
