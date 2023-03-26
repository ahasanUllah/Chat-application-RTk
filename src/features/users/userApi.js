import { apiSlice } from '../api/apiSlice';

export const usersApi = apiSlice.injectEndpoints({
   endpoints: (build) => ({
      getUser: build.query({
         query: (email) => `/users?email_like=${email}`,
      }),
   }),
});

export const { useGetUserQuery } = usersApi;
