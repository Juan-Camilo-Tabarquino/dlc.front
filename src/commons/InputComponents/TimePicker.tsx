import { Form, FormItemProps, TimePicker, TimeRangePickerProps } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import type { ReactNode } from 'react';

const { Item } = Form;
const { RangePicker } = TimePicker;

type PickerProps = {
  name: string | string[];
  label: ReactNode;
  className?: string;
  isRequired?: boolean;
  noAsterix?: boolean;
  requiredMessage?: string | JSX.Element;
  formItemProps?: FormItemProps;
  timeRangePickerProps?: TimeRangePickerProps;
};

function FormItem({
  name,
  formItemProps,
  timeRangePickerProps,
  requiredMessage,
  isRequired,
}: Omit<PickerProps, 'descriptionPath' | 'label'>) {
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
      getValueProps={(value: string[] | undefined) => {
        if (!value) return { value: undefined };
        return {
          value: value.map((v) => (v ? dayjs(v, 'HH:mm:ss') : null)),
        };
      }}
      getValueFromEvent={(times: Dayjs[]) => {
        if (!times) return undefined;
        return times.map((t) => (t ? t.format('HH:mm:ss') : null));
      }}
    >
      <RangePicker
        {...timeRangePickerProps}
        style={{
          background: timeRangePickerProps?.readOnly
            ? 'rgba(0, 0, 0, 0.2)'
            : undefined,
          borderColor: timeRangePickerProps?.readOnly
            ? 'rgba(0, 0, 0, 0.3)'
            : undefined,
          width: '100%',
          height: '40px',
          borderRadius: '8px',
        }}
      />
    </Item>
  );
}

function TimePickerPropio({
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
        {props.isRequired && !noAsterix && (
          <span style={{ color: 'red' }}>*</span>
        )}
      </div>
      <FormItem {...props} />
    </>
  );
}

export default TimePickerPropio;
