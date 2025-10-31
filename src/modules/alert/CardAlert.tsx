import React from 'react';
import { Card, Tooltip } from 'antd';
import type { Alert } from '@/types';
import { ExclamationCircleFilled } from '@ant-design/icons';

type CardAlertProps = {
  alert: Alert;
  onClick: (user: Alert) => void;
};

const CardAlert: React.FC<CardAlertProps> = ({ alert, onClick }) => {
  const status = alert?.status;
  let color = '#DB524A';
  if (status === 0) {
    color = '#DB524A';
  } else if (status === 1) {
    color = '#838696';
  } else {
    color = '#599AEA';
  }
  const getStatusLabel = (status: number) => {
    if (status === 0) return 'Enviado';
    if (status === 1) return 'Recibido';
    return 'Leído';
  };

  return (
    <Card
      hoverable
      onClick={() => (alert?.date ? onClick(alert) : null)}
      title={
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title={`${getStatusLabel(status)}`}>
            <ExclamationCircleFilled style={{ color }} />
          </Tooltip>
          <h5>{` ${alert?.fullname}`}</h5>
        </div>
      }
      id={alert?.id.toString()}
      style={{ marginBottom: '1vh' }}
    >
      <p>
        Fecha:
        {alert?.date ? ` ${alert?.date.substring(0, 10)}` : ' Sin Información'}
      </p>
      <p>
        Hora:
        {alert?.date ? ` ${alert?.date.substring(11, 16)}` : ' Sin Información'}
      </p>
      <p>
        Estado:
        {` ${getStatusLabel(status)}`}
      </p>
    </Card>
  );
};

export default CardAlert;
