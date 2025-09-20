import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Company } from '@/types';

type companySate = {
    companies: Company[]
}

const initialState:companySate = { companies: [] };

export const companySlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {
    listCompanies: (state, action: PayloadAction<Company[]>) => {
      state.companies = action.payload;
    },
    addNewCompany: (state, action: PayloadAction<Company>) => {
      state.companies = [...state.companies, action.payload];
    },
    activeCompany: (state, action: PayloadAction<Company>) => {
      state.companies = [...state.companies, action.payload];
    },

  },
});

export const { listCompanies } = companySlice.actions;

export default companySlice.reducer;
