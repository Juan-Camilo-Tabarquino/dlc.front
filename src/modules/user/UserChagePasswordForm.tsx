import InputText from '@/commons/InputComponents/Text';
import type { NewUser } from '@/types';
import {
  Button, Col, Form, Row,
} from 'antd';
import { isEqual } from 'lodash';
import { useEffect } from 'react';

const { useForm } = Form;

type UserChangePasswordFormProps = {
  initialValues: Partial<NewUser>;
  onSubmit: (data: Partial<NewUser>) => void;
};

export default function UserChangePasswordForm({
  initialValues,
  onSubmit,
}: UserChangePasswordFormProps) {
  const [form] = useForm();

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
            name="password"
            label="Contraseña"
            isRequired
            inputProps={{
              type: 'password',
              style: { outlineColor: '#5D59E3', fontSize: '1em' },
              placeholder: 'Contraseña',
            }}
            formItemProps={{
              dependencies: ['passwordConfirm'],
              rules: [
                ({ getFieldValue }) => ({
                  validator: () => {
                    const currentPass = getFieldValue('password');
                    const confirmPass = getFieldValue('passwordConfirm');

                    if (!currentPass || currentPass.length < 8) {
                      return Promise.reject(
                        new Error('La contraseña no tiene el número de caracteres necesario'),
                      );
                    }

                    if (!isEqual(currentPass, confirmPass)) {
                      return Promise.reject(
                        new Error('Las contraseñas no coinciden'),
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
            name="passwordConfirm"
            label="Confirmar contraseña"
            isRequired
            inputProps={{
              type: 'password',
              style: { outlineColor: '#5D59E3', fontSize: '1em' },
              placeholder: 'Confirmar contraseña',
            }}
            formItemProps={{
              rules: [
                {
                  required: true,
                  message: 'Por favor, confirma la contraseña',
                },
              ],
            }}
          />
        </Col>
      </Row>

      <Row justify="end">
        <Col>
          <Button type="primary" htmlType="submit">
            Guardar
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
