import { FC } from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { User } from '@/types';
import CardUser from '../CardUser';

type ShowUserProps = {
  showSelectTrip: boolean;
  selectedUser: User | null;
  showSelectAlert: boolean;
  showUsers: boolean;
  historyAlert: boolean;
  filteredUsers: User[];
  setSelectedUser: (user: User) => void;
  setShowUsers: (value: boolean) => void;
  setShowAllPoints: (value: boolean) => void;
  setShowSelectAlert: (value: boolean) => void;
  changeHistoryAlert: (value: boolean) => void;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
};

const ShowUser: FC<ShowUserProps> = ({
  showSelectTrip,
  selectedUser,
  showSelectAlert,
  showUsers,
  historyAlert,
  filteredUsers,
  setSelectedUser,
  setShowUsers,
  setShowAllPoints,
  setShowSelectAlert,
  changeHistoryAlert,
  searchTerm,
  setSearchTerm,
}) => {
  if (
    !showSelectTrip &&
    !selectedUser &&
    !showSelectAlert &&
    showUsers &&
    !historyAlert
  ) {
    return (
      <>
        <Input
          placeholder="Buscar por nombre o cédula"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ marginBottom: '10px' }}
          prefix={<SearchOutlined />}
        />

        <div
          style={{
            background: '#fff',
            overflowY: 'auto',
            maxHeight: '70vh',
            display: 'flex',
            flexDirection: 'column',
            padding: '3%',
          }}
        >
          {filteredUsers.map((u, index) => (
            <CardUser
              key={index}
              user={u}
              onClick={() => {
                setSelectedUser(u);
                setShowUsers(false);
                setShowAllPoints(false);
                setShowSelectAlert(false);
                changeHistoryAlert(false);
              }}
            />
          ))}
        </div>
      </>
    );
  }

  return null;
};

export default ShowUser;
