/* eslint-disable default-param-last */
/* eslint-disable import/prefer-default-export */
import { SelectOption } from '@/types';
import {
  Collection, get, isBoolean, map, orderBy,
} from 'lodash';

export const mapToSelectOption = <T, >(
  list: T[] | Partial<Collection<T>>,
  propiety: string,
  textProperty = propiety,
  valueProperty = 'id',
  orderProperty = 'name',
  keyProperty?: keyof T,
  enablingKey?: keyof T,
): SelectOption[] => map(
    orderProperty ? orderBy(list, orderProperty) : list,
    (item) => {
      const textOrLabel = propiety === 'fullname'
        ? `${get(item, 'name', '')} ${get(item, 'lastname', '')}`.trim()
        : get(item, [textProperty]);

      return {
        key: keyProperty ? get(item, [keyProperty]) : get(item, [valueProperty]),
        text: textOrLabel,
        value: get(item, [valueProperty]),
        label: textOrLabel,
        disabled: isBoolean(get(item, [enablingKey || ''])) && !get(item, [enablingKey || '']),
      };
    },
  );
