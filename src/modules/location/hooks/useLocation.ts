import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import {
  listLocationsByDate,
  listLocationsPoint,
} from '@/store/location/locationSlice';
import axios from 'axios';
import { BASE_URL } from '@/commons/constants';
import { RouteItem } from '@/types';

const { get } = axios;

export default function useLocation() {
  const { locations, locationsByDate, locationSelect } = useSelector(
    (state: RootState) => state.locations,
  );

  const dispatch = useDispatch();

  const locationHistoryByUser = async (
    startDate: string,
    finalDate: string,
    userId: string,
  ) => {
    try {
      const res = await get(
        `${BASE_URL}/locations/historyByUser?start_date=${startDate}&final_date=${finalDate}&userId=${userId}`,
      );
      dispatch(listLocationsByDate(res.data));
      dispatch(listLocationsPoint([]));
    } catch (error) {
      return error;
    }
  };

  const handleTimeClick = (routeItem: RouteItem) => {
    dispatch(listLocationsPoint([routeItem]));
  };

  return {
    locations,
    locationsByDate,
    locationHistoryByUser,
    locationSelect,
    handleTimeClick,
  };
}
