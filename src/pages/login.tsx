import { Card, Col, Layout, Row, Button, Form } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import InputText from '@/commons/InputComponents/Text';
import InputPassword from '@/commons/InputComponents/Password';
import { useEffect } from 'react';
import useAuth from '@/modules/auth/hooks/useAuth';

const { useForm } = Form;

export default function Login() {
  const [form] = useForm();
  const { checkAuth, startLogin } = useAuth();

  const onLogin = async ({
    password,
    username,
  }: {
    password: string;
    username: string;
  }) => {
    await startLogin(username, password);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <Layout
      style={{
        height: '100vh',
        display: 'flex',
      }}
    >
      <Row
        style={{
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Col
          style={{
            height: '100%',
            backgroundColor: 'grey',
            backgroundImage: 'url("/image.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          xs={0}
          sm={0}
          md={12}
          lg={12}
          xl={12}
        />
        <Col
          style={{
            height: '100%',
            alignItems: 'center',
            backgroundColor: 'white',
            display: 'flex',
            justifyContent: 'center',
          }}
          xs={24}
          sm={24}
          md={12}
          lg={12}
          xl={12}
        >
          <Card style={{ backgroundColor: 'transparent', border: 0 }}>
            <h2
              style={{
                textAlign: 'center',
                lineHeight: '200%',
                fontSize: '2.5em',
                marginTop: '-20%',
              }}
            >
              INICIO DE SESIÓN
            </h2>
            {/* <Form form={form} initialValues={{}} onFinish={onLogin}> */}
            <Form form={form} initialValues={{}} onFinish={onLogin}>
              {/* <h3 style={{ lineHeight: '200%', fontSize: '2em' }}>Usuario</h3> */}
              <InputText
                label="Usuario"
                name="username"
                inputProps={{
                  style: { outlineColor: '#5D59E3', fontSize: '2em' },
                  placeholder: 'Ingrese su Usuario',
                }}
              />
              {/* <h3 style={{ lineHeight: '200%', fontSize: '2em' }}>Contraseña</h3> */}
              <InputPassword
                label="Contraseña"
                name="password"
                inputProps={{
                  style: { outlineColor: '#5D59E3', fontSize: '2em' },
                  placeholder: 'Ingrese su Contraseña',
                  iconRender: (visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />,
                }}
              />
              <Button
                style={{
                  margin: 'auto',
                  marginTop: '8%',
                  display: 'flex',
                  paddingLeft: '30%',
                  paddingRight: '30%',
                  paddingTop: '8%',
                  paddingBottom: '8%',
                  backgroundColor: '#000000',
                  fontSize: '1.5em',
                  borderRadius: '40px',
                }}
                type="primary"
                htmlType="submit"
              >
                Ingresar
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Layout>
  );
}
