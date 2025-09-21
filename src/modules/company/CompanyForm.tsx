import InputText from '@/commons/InputComponents/Text';
import { Company } from '@/types';
import { Button, Col, Form, Row } from 'antd';
import { useEffect } from 'react';

const { useForm } = Form;

type CompanyFormProps = {
  initialValues: Partial<Company>;
  onSubmit: (data: Partial<Company>) => void;
  isEdit: boolean;
};

export default function CompanyForm({
  initialValues,
  onSubmit,
  isEdit,
}: CompanyFormProps) {
  const [form] = useForm();

  const isValidEmail = (str: string): boolean =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str);
  const isValidLetters = (str: string): boolean => /^[a-zA-Z]+$/.test(str);

  useEffect(() => {
    form.resetFields();
  }, [initialValues]);

  return (
    <Form
      form={form}
      initialValues={initialValues}
      onFinish={onSubmit}
      layout="vertical"
    >
      <Row gutter={16}>
        <Col span={12}>
          <InputText
            name="name"
            label="Nombre"
            isRequired
            inputProps={{
              style: { outlineColor: '#5D59E3', fontSize: '1em' },
              placeholder: 'Nombre',
            }}
          />
        </Col>
        <Col span={12}>
          <InputText
            name="nit"
            label="Nit"
            isRequired={!isEdit}
            noAsterix={!!isEdit}
            inputProps={{
              disabled: isEdit,
              style: { outlineColor: '#5D59E3', fontSize: '1em' },
              placeholder: 'Nit',
            }}
            formItemProps={{
              rules: [
                ({ getFieldValue }) => ({
                  validator: () => {
                    const nit = getFieldValue(['nit']) as string;
                    if (isValidLetters(nit)) {
                      return Promise.reject(
                        new Error('En el campo NIT sólo puede ir números'),
                      );
                    }
                    if (nit.length >= 15) {
                      return Promise.reject(
                        new Error(
                          'El campo NIT puede tener hasta 15 caracteres',
                        ),
                      );
                    }
                    return Promise.resolve();
                  },
                }),
              ],
            }}
          />
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <InputText
            name="email"
            label="Correo"
            isRequired
            inputProps={{
              style: { outlineColor: '#5D59E3', fontSize: '1em' },
              placeholder: 'Correo',
            }}
            formItemProps={{
              rules: [
                ({ getFieldValue }) => ({
                  validator: () => {
                    const email = getFieldValue(['email']) as string;

                    if (!isValidEmail(email)) {
                      return Promise.reject(
                        new Error('El correo no es válido'),
                      );
                    }
                    return Promise.resolve();
                  },
                }),
              ],
            }}
          />
        </Col>
        <Col span={12}>
          <InputText
            name="adress"
            label="Dirección"
            isRequired
            inputProps={{
              style: { outlineColor: '#5D59E3', fontSize: '1em' },
              placeholder: 'Direccion',
            }}
          />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <InputText
            name="logo"
            label="Logo"
            inputProps={{
              style: { outlineColor: '#5D59E3', fontSize: '1em' },
              placeholder: 'Logo',
            }}
          />
        </Col>
      </Row>
      <Row justify="end">
        <Button type="primary" htmlType="submit">
          Guardar
        </Button>
      </Row>
    </Form>
  );
}
