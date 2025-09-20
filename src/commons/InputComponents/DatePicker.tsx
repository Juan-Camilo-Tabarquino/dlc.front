import {
  DatePicker,
  DatePickerProps,
  Form,
  FormItemProps,
} from 'antd';
import type { ReactNode } from 'react';

const { Item } = Form;

  type PickerProps = {
    name: string | string[],
    label: ReactNode,
    className?: string;
    isRequired?: boolean,
    noAsterix?: boolean,
    requiredMessage?: string | JSX.Element,
    formItemProps?: FormItemProps,
    datePickerProps?: DatePickerProps,
  };

function FormItem({
  name,
  formItemProps,
  datePickerProps,
  requiredMessage,
  isRequired,
}: Omit<PickerProps, 'descriptionPath' | 'label'>) {
  const today = new Date();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const disabledDate = (current: any) => current && current > today;
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
      <DatePicker
        {...datePickerProps}
        disabledDate={disabledDate}
        style={{
          background: datePickerProps?.readOnly ? 'rgba(0, 0, 0, 0.2)' : undefined, borderColor: datePickerProps?.readOnly ? 'rgba(0, 0, 0, 0.3)' : undefined, width: '100%',
        }}
      />
    </Item>
  );
}

function DatePickerPropio({
  label,
  noAsterix,
  className,
  ...props
}: PickerProps) {
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

export default DatePickerPropio;
