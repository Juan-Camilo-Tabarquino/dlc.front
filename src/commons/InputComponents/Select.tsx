import { SelectOption } from '@/types';
import {
  Form,
  FormItemProps,
  Select as SelectAntd,
  SelectProps as SelectPropsAntd,
} from 'antd';
import type { ReactNode } from 'react';

const { Item } = Form;

export type SelectProps = {
  name: string | string[];
  label: ReactNode;
  className?: string;
  conjunto: SelectOption[];
  isRequired?: boolean;
  noAsterix?: boolean;
  requiredMessage?: string | JSX.Element;
  formItemProps?: FormItemProps;
  selectProps?: SelectPropsAntd;
};

function FormItem({
  name,
  formItemProps,
  selectProps,
  requiredMessage,
  conjunto,
  isRequired,
}: Omit<SelectProps, 'descriptionPath' | 'label'>) {
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
      <SelectAntd<SelectOption>
        options={conjunto}
        {...selectProps}
        showSearch
        filterOption={(input, option) =>
          option?.label
            ?.toString()
            .toLowerCase()
            .includes(input.toLowerCase()) || false
        }
        style={{
          maxWidth: '100%',
          background: selectProps?.disabled ? 'rgba(0, 0, 0, 0.2)' : undefined,
          borderColor: selectProps?.disabled ? 'rgba(0, 0, 0, 0.3)' : undefined,
          ...(selectProps?.style || {}),
        }}
        size="large"
      />
    </Item>
  );
}

function Select({ label, className, noAsterix, ...props }: SelectProps) {
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

export default Select;
