import { template } from '@/utils/templateUrl';
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query';
import { flowRight, omit } from 'lodash';
import { stringify } from 'qs';
// import { getI18n } from 'react-i18next';

type TCustomBaseQuery = BaseQueryFn<
  FetchArgs,
  unknown,
  FetchBaseQueryError,
  Record<string, unknown>,
  FetchBaseQueryMeta
>;

const UseQueryParams =
  (extraOptions: { isQueryString?: boolean }) =>
  (options: FetchArgs): FetchArgs => {
    const isQueryString = !!extraOptions?.isQueryString;
    if (isQueryString) {
      options.url = `${options.url}${stringify(options.params, {
        encode: false,
        addQueryPrefix: true,
      })}`;
      options.params = undefined;
    }
    return options;
  };

const UsePathParams = (options: FetchArgs): FetchArgs => {
  const properties = options.url.match(/\${\w+}/gm) || [];
  const body = options.body || {};
  const params = options.params || {};
  options.url = template(options.url, { ...body, ...params });

  if (options.method === 'GET') {
    options.params = omit(
      options.params || {},
      properties.flatMap((item) => item.match(/\w+/g) || []),
    );
  } else {
    options.body = omit(
      options.body || {},
      properties.flatMap((item) => item.match(/\w+/g) || []),
    );
  }
  return options;
};

// const UseToken = (options: FetchArgs): FetchArgs => {
//   const token = getToken();
//   if (!token) return options;
//   const headers = options.headers || {};

//   options.headers = {
//     Authorization: Bearer ${token},
//     ...headers,
//   };
//   return options;
// };

// const UseLanguage = (options: FetchArgs): FetchArgs => {
//   const headers = options.headers || {};
//   options.headers = {
//     'Accept-Language': getI18n().language,
//     ...headers,
//   };
//   return options;
// };

const UseTimeZone = (options: FetchArgs): FetchArgs => {
  const headers = options.headers || {};
  options.headers = {
    'Time-Zone': Intl.DateTimeFormat().resolvedOptions().timeZone,
    ...headers,
  };
  return options;
};

export const customQuery =
  (baseQuery: TCustomBaseQuery): TCustomBaseQuery =>
  async (options, api, extraOptions) => {
    const customOptions = flowRight(
      UseQueryParams(extraOptions),
      UsePathParams,
      //   UseLanguage,
      UseTimeZone,
      //   UseToken,
    )(options);
    return baseQuery(customOptions, api, extraOptions);
  };
