import { BASE_URL } from '@/commons/constants';
import { listCompanies } from '@/store/company/companySlice';
import type { RootState } from '@/store/store';
import { Company } from '@/types';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

const { get, post, put } = axios;

export default function useCompany() {
  const { companies } = useSelector((state: RootState) => state.companies);
  const dispatch = useDispatch();
  const fetchCompanies = async () => {
    try {
      const res = await get(`${BASE_URL}/companies`);
      dispatch(listCompanies(res.data));
    } catch (error) {
      return error;
    }
  };

  const addNewCompany = async (data: Partial<Company>) => {
    try {
      const res = await post(`${BASE_URL}/companies/createCompany`, data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const activeCompany = async (id: number) => {
    try {
      const res = await put(`${BASE_URL}/companies/active/${id}`);
      return res;
    } catch (error) {
      return error;
    }
  };
  const editCompany = async (infoEditCompany: Company) => {
    try {
      const res = await put(`${BASE_URL}/companies/${infoEditCompany?.id}`, infoEditCompany);
      return res;
    } catch (error) {
      return error;
    }
  };

  return {
    companies,
    fetchCompanies,
    addNewCompany,
    activeCompany,
    editCompany,
  };
}
