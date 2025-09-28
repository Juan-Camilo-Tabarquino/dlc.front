export const locationConf = {
  host: process.env.NEXT_PUBLIC_BACKEND_URL,
  endpoints: {
    getLocationHistoryByUser:
      '/locations/historyByUser?start_date=${startDate}&final_date=${finalDate}&userId=${userId}',
  },
};
