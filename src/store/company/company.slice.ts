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
      query: ({ name, email, phone, nit, adress, logo }) => ({
        url: companyConf.endpoints.createCompany,
        method: 'POST',
        body: { name, email, phone, nit, adress, logo },
      }),
    }),
    editCompany: builder.mutation({
      query: ({ id, name, email, phone, nit, adress, logo }) => ({
        url: companyConf.endpoints.editCompany,
        method: 'PUT',
        params: { id },
        body: { name, email, phone, nit, adress, logo },
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
