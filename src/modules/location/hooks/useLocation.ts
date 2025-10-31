import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { listLocationsPoint } from '@/store/location/location.feature';
import { RouteItem } from '@/types';
import { useLazyGetLocationHistoryByUserQuery } from '@/store/location/location.slice';

export default function useLocation() {
  const { locations, locationsByDate, locationSelect } = useSelector(
    (state: RootState) => state.locations,
  );

  const [trigger, { isLoading: isLoadigGetLocationHistoryByUser }] =
    useLazyGetLocationHistoryByUserQuery();

  const dispatch = useDispatch();

  const locationHistoryByUser = async (
    startDate: string,
    finalDate: string,
    userId: string,
  ) => {
    await trigger({ startDate, finalDate, userId });
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
    isLoadigGetLocationHistoryByUser,
  };
}
