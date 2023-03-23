import { apiSlice } from '../api/apiSlice';

export const messagesApi = apiSlice.injectEndpoints({
   endpoints: (build) => ({
      messages: build.query({
         query: (id) =>
            `/messages?conversationId=${id}&_sort=timestamp&order=desc&_page=1&_limit=${process.env.REACT_APP_MESSAGES_PER_PAGE}`,
      }),
   }),
});
export const { useMessagesQuery } = messagesApi;
