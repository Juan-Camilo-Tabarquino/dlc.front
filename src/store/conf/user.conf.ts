export const userConf = {
  host: process.env.NEXT_PUBLIC_BACKEND_URL,
  endpoints: {
    getUsers: '/users',
    getUsersWithLastLocation: '/users/user/withalllastlocation',
    getUserById: '/users/${id}',
    getUsersWithLastLocationByCompanyId:
      '/users/user/withalllastlocation/${companyId}',
    getUserWithLastLocationById: '/lastlocations/${id}',
    addNewUser: '/users/createUser',
    activeUser: '/users/active/${id}',
    editUser: '/users/${id}',
    editPasswordUser: '/users/updatepassword/${id}',
  },
};
