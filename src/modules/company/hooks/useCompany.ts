import {
  useActiveCompanyMutation,
  useCreateCompanyMutation,
  useEditCompanyMutation,
  useGetCompaniesQuery,
} from '@/store/company/company.slice';
import type { RootState } from '@/store/store';
import { Company } from '@/types';
import { message } from 'antd';
import { useSelector } from 'react-redux';

export default function useCompany() {
  const { companies } = useSelector((state: RootState) => state.companies);
  const [createCompany] = useCreateCompanyMutation();
  const [editCompany] = useEditCompanyMutation();
  const [activeCompany] = useActiveCompanyMutation();
  const { isLoading: isLoadingCompanies } = useGetCompaniesQuery();

  const onSubmit = async (data: Partial<Company>, isEdit: boolean) => {
    if (isEdit) {
      await createCompany(data);
      message.success('La compañia se ha modificado exitosamente');
    } else {
      await editCompany(data);
      message.success('La compañia se ha creado exitosamente');
    }
  };

  const handleActiveCompany = async (id: number) => {
    await activeCompany({ id });
  };

  return {
    companies,
    onSubmit,
    handleActiveCompany,
    isLoadingCompanies,
  };
}
