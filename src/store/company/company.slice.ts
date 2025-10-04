import { Company } from '@/types';
import { companyApi } from '../api/companyApi';
import { companyConf } from '../conf/company.conf';

export const companyApiSlice = companyApi.injectEndpoints({
  endpoints: (builder) => ({
    getCompanies: builder.query<Company[], void>({
      query: () => ({
        url: companyConf.endpoints.getCompanies,
        method: 'GET',
      }),
      providesTags: ['Companies'],
    }),
    createCompany: builder.mutation({
      query: (payload) => ({
        url: companyConf.endpoints.createCompany,
        method: 'POST',
        body: payload,
      }),
    }),
    editCompany: builder.mutation({
      query: (payload) => ({
        url: companyConf.endpoints.editCompany,
        method: 'PUT',
        params: { id: payload.id },
        body: payload,
      }),
    }),
    activeCompany: builder.mutation({
      query: ({ id }) => ({
        url: companyConf.endpoints.activeCompany,
        method: 'PUT',
        params: { id },
      }),
    }),
  }),
});

export const {
  useGetCompaniesQuery,
  useLazyGetCompaniesQuery,
  useCreateCompanyMutation,
  useEditCompanyMutation,
  useActiveCompanyMutation,
} = companyApiSlice;
