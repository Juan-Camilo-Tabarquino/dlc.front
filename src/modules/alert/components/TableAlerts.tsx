import { RootState } from '@/store/store';
import { Table, Tag } from 'antd';
import { useSelector } from 'react-redux';

export enum AlertStatus {
  Enviada = 0,
  Recibida = 1,
  Leida = 2,
}

const AlertStatusColor: Record<number, string> = {
  [AlertStatus.Enviada]: '#fff704ff',
  [AlertStatus.Recibida]: '#32ba25ff',
  [AlertStatus.Leida]: '#1288e8ff',
};

const columns = [
  {
    title: 'Nombre',
    dataIndex: 'fullname',
    key: 'fullname',
  },
  {
    title: 'Fecha',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Hora',
    dataIndex: 'time',
    key: 'time',
  },
  {
    title: 'Estado',
    dataIndex: 'statusText',
    key: 'statusText',
    render: (status: string) => {
      const color =
        AlertStatusColor[AlertStatus[status as keyof typeof AlertStatus]];
      return (
        <Tag color={color} key={status}>
          {status}
        </Tag>
      );
    },
  },
  {
    title: 'Descripcion',
    dataIndex: 'message',
    key: 'message',
  },
];

export const TableAlerts = () => {
  const { alerts } = useSelector((state: RootState) => state.alerts);
  const alertsToShow = alerts.map((a) => {
    const [date, time] = a.date.split(' ');
    return {
      ...a,
      date,
      time,
      statusText: AlertStatus[a.status],
    };
  });
  return (
    <Table
      bordered
      dataSource={alertsToShow}
      columns={columns}
      pagination={{ pageSize: 4 }}
    />
  );
};
