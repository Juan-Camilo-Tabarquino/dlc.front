import { FC } from 'react';
import { Spin, Typography, Space } from 'antd';

const { Text } = Typography;

const Loading: FC = () => {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      <Space direction="vertical" align="center">
        <Spin size="large" />
        <Text type="secondary">Cargando, por favor espera...</Text>
      </Space>
    </div>
  );
};

export default Loading;
