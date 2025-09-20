import React from 'react';
import { Select, Typography } from 'antd';
import { OptionType } from '@/types';

const { Title } = Typography;
const { Option } = Select;

type SelectUserProps = {
  value: string;
  onChange: (value: string) => void;
  options: OptionType[];
  disabled?: boolean;
}

const SelectUser = ({ value, onChange, options, disabled = false }: SelectUserProps) => (
  <>
    <Title level={5}>Seleccionar usuario</Title>
    <Select
      value={value}
      onChange={onChange}
      showSearch
      style={{ width: '100%' }}
      placeholder="Selecciona un usuario"
      optionFilterProp="children"
      filterOption={(input, option) => {
        const optionText = option?.children?.toString().toLowerCase() || '';
        return optionText?.indexOf(input.toLowerCase()) >= 0;
      }}
      disabled={disabled}
    >
      <Option value="">----</Option>
      {options.map((option) => (
        <Option key={option.value} value={option.value}>
          {option.nombre}
        </Option>
      ))}
    </Select>
  </>
);

export default SelectUser;
