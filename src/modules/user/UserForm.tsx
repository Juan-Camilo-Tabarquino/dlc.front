import InputNumber from '@/commons/InputComponents/Number';
import Select from '@/commons/InputComponents/Select';
import InputText from '@/commons/InputComponents/Text';
import type { Company, NewUser, Role } from '@/types';
import { mapToSelectOption } from '@/utils/utils';
import { Button, Col, Form, Row } from 'antd';
import { inRange, isEqual, isNaN } from 'lodash';
import { useEffect } from 'react';

const { useForm } = Form;

type UserFormProps = {
  initialvalues: Partial<NewUser>;
  onSubmit: (data: Partial<NewUser>) => void;
  companies: Company[];
  roles: Role[];
  isEdit: boolean;
};

export default function UserForm({
  initialvalues,
  onSubmit,
  companies,
  roles,
  isEdit,
}: UserFormProps) {
  const [form] = useForm();

  const isValidEmail = (str: string): boolean =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str);
  const transformInital = {
    ...initialvalues,
    role: initialvalues.role
      ? roles.find((r) => r.id.toString() === initialvalues.role?.toString())
          ?.id
      : undefined,
  };

  useEffect(() => form.resetFields(), [initialvalues]);

  return (
    <Form
      form={form}
      initialValues={transformInital}
      onFinish={onSubmit}
      layout="vertical"
    >
      <Row gutter={16}>
        <Col span={12}>
          <InputText
            name="name"
            label="Nombres"
            isRequired
            inputProps={{
              style: { outlineColor: '#5D59E3', fontSize: '1em' },
              placeholder: 'Nombre',
            }}
          />
        </Col>
        <Col span={12}>
          <InputText
            name="lastname"
            label="Apellidos"
            isRequired
            inputProps={{
              style: { outlineColor: '#5D59E3', fontSize: '1em' },
              placeholder: 'Apellido',
            }}
          />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <InputText
            name="phone"
            label="Celular"
            isRequired
            inputProps={{
              style: { outlineColor: '#5D59E3', fontSize: '1em' },
              placeholder: 'Celular',
            }}
            formItemProps={{
              rules: [
                ({ getFieldValue }) => ({
                  validator: () => {
                    const phone = getFieldValue(['phone']) as string;
                    if (isNaN(Number(phone))) {
                      return Promise.reject(
                        new Error('En el campo celular solo pueden ir numeros'),
                      );
                    }

                    if (!inRange(phone.length, 10, 11)) {
                      return Promise.reject(
                        new Error('En el campo celular debe tener 10 digitos'),
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
          <InputNumber
            name="cedula"
            label="Cédula"
            isRequired={!isEdit}
            noAsterix={!!isEdit}
            inputProps={{
              disabled: isEdit,
              style: { outlineColor: '#5D59E3', fontSize: '1em' },
              placeholder: 'Cedula',
            }}
            formItemProps={{
              rules: [
                ({ getFieldValue }) => ({
                  validator: () => {
                    const cedula = getFieldValue(['cedula']) as string;

                    if (isNaN(Number(cedula))) {
                      return Promise.reject(
                        new Error('En el campo cedula solo pueden ir numeros'),
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
            name="icon"
            label="Icono"
            inputProps={{
              style: { outlineColor: '#5D59E3', fontSize: '1em' },
              placeholder: 'Icono',
            }}
          />
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <InputText
            name="username"
            label="Usuario"
            isRequired
            inputProps={{
              style: { outlineColor: '#5D59E3', fontSize: '1em' },
              placeholder: 'Usuario',
            }}
          />
        </Col>
        {!isEdit && (
          <Col span={12}>
            <Select
              name="company"
              conjunto={mapToSelectOption(companies, 'name')}
              label="Compañía"
              isRequired
              selectProps={{ placeholder: 'Selecciona una compañia' }}
            />
          </Col>
        )}
      </Row>
      <Row gutter={16}>
        {!isEdit && (
          <>
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
                  initialValue: '',
                  rules: [
                    ({ getFieldValue }) => ({
                      validator: () => {
                        const repass = getFieldValue(['passwordConfirm']);
                        const currentPass = getFieldValue([
                          'password',
                        ]) as string;

                        if (currentPass.length < 8) {
                          return Promise.reject(
                            new Error(
                              'Las Contrasena no tiene el numero de caracteres necesario (8 caracteres)',
                            ),
                          );
                        }

                        if (!isEqual(repass, currentPass)) {
                          return Promise.reject(
                            new Error('Las Contrasenas no coinciden'),
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
                  placeholder: 'Confirma contraseña',
                }}
              />
            </Col>
          </>
        )}
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Select
            name="role"
            conjunto={mapToSelectOption(roles, 'customName')}
            label="Rol"
            selectProps={{
              defaultValue: transformInital.role ?? undefined,
              placeholder: 'Selecciona un rol',
            }}
            isRequired
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
