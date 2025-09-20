import {
  Form,
  FormItemProps,
  Input,
} from 'antd';
import { PasswordProps } from 'antd/es/input';
import type { ReactNode } from 'react';

const { Item } = Form;
const { Password } = Input;

  type InputTextProps = {
    name: string | string[],
    label: ReactNode,
    className?: string;
    isRequired?: boolean,
    noAsterix?: boolean,
    requiredMessage?: string | JSX.Element,
    formItemProps?: FormItemProps,
    inputProps?: PasswordProps,
  };

function FormItem({
  name,
  formItemProps,
  inputProps,
  requiredMessage,
  isRequired,
}: Omit<InputTextProps, 'descriptionPath' | 'label'>) {
  return (
    <Item
      {...formItemProps}
      name={name}
      rules={[
        {
          required: isRequired,
          message: requiredMessage || 'El campo es obligatorio',
        },
        ...(formItemProps?.rules || []),
      ]}
    >
      <Password {...inputProps} size="large" style={{ background: inputProps?.readOnly ? 'rgba(0, 0, 0, 0.2)' : undefined, borderColor: inputProps?.readOnly ? 'rgba(0, 0, 0, 0.3)' : undefined }} />
    </Item>
  );
}

function InputPassword({
  label,
  noAsterix,
  className,
  ...props
}: InputTextProps) {
  return (
    <>
      <div
        className={className}
        style={{
          color: 'black',
          fontWeight: 'bold',
          borderColor: 'white',
        }}
      >
        {label}
        {(props.isRequired && !noAsterix) && <span style={{ color: 'red' }}>*</span>}
      </div>
      <FormItem {...props} />
    </>
  );
}

export default InputPassword;
