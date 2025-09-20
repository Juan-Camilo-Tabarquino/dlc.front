import {
  Form,
  FormItemProps,
  InputNumber as InputNumberAntd,
  InputNumberProps as InputNumberPropsAntd,
} from 'antd';
import type { ReactNode } from 'react';

const { Item } = Form;

  type InputNumberProps = {
    name: string | string[],
    label: ReactNode,
    className?: string,
    isRequired?: boolean,
    noAsterix?: boolean,
    requiredMessage?: string | JSX.Element,
    formItemProps?: FormItemProps,
    inputProps?: InputNumberPropsAntd,
  };

function FormItem({
  name,
  formItemProps,
  inputProps,
  requiredMessage,
  isRequired,
}: Omit<InputNumberProps, 'descriptionPath' | 'label'>) {
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
      <InputNumberAntd
        {...inputProps}
        size="large"
        style={{
          width: '100%', background: inputProps?.readOnly ? 'rgba(0, 0, 0, 0.2)' : undefined, borderColor: inputProps?.readOnly ? 'rgba(0, 0, 0, 0.3)' : undefined,
        }}
      />
    </Item>
  );
}

function InputNumber({
  label,
  className,
  noAsterix,
  ...props
}: InputNumberProps) {
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

export default InputNumber;
