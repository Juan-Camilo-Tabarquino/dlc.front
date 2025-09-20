import {
  Button, Layout, Result,
} from 'antd';
import { useRouter } from 'next/router';

export default function Unauthorized() {
  const { push } = useRouter();

  const login = () => {
    localStorage.clear();
    push('/login');
    return null;
  };

  return (
    <Layout
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
      }}
    >
      <Result
        status="403"
        title="No tienes acceso a esta página"
        subTitle="Inicie sesión con un usuario autorizado para continuar"
        extra={(
          <Button
            type="primary"
            onClick={login}
          >
            Iniciar sesión
          </Button>
        )}
      />
    </Layout>
  );
}
