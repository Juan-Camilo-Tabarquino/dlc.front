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
    builder.addMatcher(
      companyApiSlice.endpoints.editCompany.matchFulfilled,
      (state, action) => {
        state.companies = state.companies.map((company) => {
          if (company.id === action.payload.id) {
            return action.payload;
          }
          return company;
        });
      },
    );
    builder.addMatcher(
      companyApiSlice.endpoints.activeCompany.matchFulfilled,
      (state, action) => {
        state.companies = state.companies.map((company) => {
          return company.id === action.payload.id
            ? { ...company, active: action.payload.active }
            : company;
        });
      },
    );
  },
});

// export const { listCompanies } = companySlice.actions;

export default companyFeature.reducer;
