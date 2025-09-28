export const companyConf = {
  host: process.env.NEXT_PUBLIC_BACKEND_URL,
  endpoints: {
    getCompanies: '/companies',
    createCompany: '/companies/createCompany',
    activeCompany: '/companies/active/${id}',
    editCompany: '/companies/${id}',
  },
};
