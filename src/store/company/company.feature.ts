import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Company } from '@/types';
import { companyApiSlice } from './company.slice';

type companySate = {
  companies: Company[];
};

const initialState: companySate = { companies: [] };

export const companyFeature = createSlice({
  name: 'companies',
  initialState,
  reducers: {
    activeCompany: (state, action: PayloadAction<Company>) => {
      state.companies = [...state.companies, action.payload];
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      companyApiSlice.endpoints.getCompanies.matchFulfilled,
      (state, action) => {
        state.companies = action.payload;
      },
    );
    builder.addMatcher(
      companyApiSlice.endpoints.createCompany.matchFulfilled,
      (state, action) => {
        state.companies = [...state.companies, action.payload];
      },
    );
  },
});

// export const { listCompanies } = companySlice.actions;

export default companyFeature.reducer;
