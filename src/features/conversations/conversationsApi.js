import { apiSlice } from '../api/apiSlice';

export const conversationsApi = apiSlice.injectEndpoints({
   endpoints: (build) => ({
      conversations: build.query({
         query: (email) => `
         /conversations?participants_like=${email}&_sort=timestamp&order=desc&_page=1&_limit=${process.env.REACT_APP_CONVERSATION_PER}
         `,
      }),
   }),
});
