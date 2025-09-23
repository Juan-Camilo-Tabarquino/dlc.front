import React from 'react';
import { LocationByDate, User } from '@/types';
import SelectTrip from '../../selectTrip';

type SelectTripHistoryProps = {
  showSelectTrip: boolean;
  selectedUser: User | null;
  showUsers: boolean;
  showSelectAlert: boolean;
  historyAlert: boolean;
  users: User[];
  locationsByDate: LocationByDate[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (data: any) => void;
};

const SelectTripHistory: React.FC<SelectTripHistoryProps> = ({
  showSelectTrip,
  selectedUser,
  showUsers,
  showSelectAlert,
  historyAlert,
  users,
  locationsByDate,
  onSubmit,
}) => {
  if (
    !showSelectTrip ||
    selectedUser ||
    showUsers ||
    showSelectAlert ||
    historyAlert
  ) {
    return null;
  }

  return (
    <SelectTrip onSubmit={onSubmit} locations={locationsByDate} users={users} />
  );
};

export default SelectTripHistory;
