import { apiSlice } from '../api/apiSlice';
import { messagesApi, useAddMessageMutation } from '../messages/messagesApi';

export const conversationsApi = apiSlice.injectEndpoints({
   endpoints: (build) => ({
      getConversations: build.query({
         query: (email) =>
            `/conversations?participants_like=${email}&_sort=timestamp&order=desc&_page=1&_limit=${process.env.REACT_APP_CONVERSATION_PER_PAGE}`,
      }),
      getConversation: build.query({
         query: ({ myEmail, participantEmail }) =>
            `/conversations?participants_like=${myEmail}-${participantEmail}&&participants_like=${participantEmail}-${myEmail}`,
      }),
      addConversation: build.mutation({
         query: ({ sender, data }) => ({
            url: `conversations`,
            method: 'POST',
            body: data,
         }),
         async onQueryStarted(arg, { queryFulfilled, dispatch }) {
            // Optimistic update

            //Optimistic update End
            const conversations = await queryFulfilled;
            const { message, timestamp } = conversations.data;
            const sender = arg.sender;
            const users = arg.data.users;
            const senderInfo = users.find((user) => user.email === sender);
            const receiverInfo = users.find((user) => user.email !== sender);
            console.log(senderInfo, receiverInfo);

            if (conversations?.data?.id) {
               dispatch(
                  messagesApi.endpoints.addMessage.initiate({
                     conversationId: conversations?.data?.id,
                     sender: senderInfo,
                     reciever: receiverInfo,
                     message: message,
                     timestamp,
                  })
               );
            }
         },
      }),
      editConversation: build.mutation({
         query: ({ id, data, sender }) => ({
            url: `conversations/${id}`,
            method: 'PATCH',
            body: data,
         }),
         async onQueryStarted(arg, { queryFulfilled, dispatch }) {
            // Optimistic update
            const patchResult1 = dispatch(
               apiSlice.util.updateQueryData('getConversations', arg.sender, (draft) => {
                  const draftConversation = draft.find((conversation) => conversation.id == arg.id);
                  draftConversation.message = arg.data.message;
                  draftConversation.timestamp = arg.data.timestamp;
               })
            );
            //Optimistic update End

            try {
               const conversations = await queryFulfilled;
               if (conversations?.data?.id) {
                  const { message, timestamp } = conversations.data;
                  const sender = arg.sender;
                  const users = arg.data.users;
                  const senderInfo = users.find((user) => user.email === sender);
                  const receiverInfo = users.find((user) => user.email !== sender);
                  const res = await dispatch(
                     messagesApi.endpoints.addMessage.initiate({
                        conversationId: conversations?.data?.id,
                        sender: senderInfo,
                        reciever: receiverInfo,
                        message: message,
                        timestamp,
                     })
                  ).unwrap();
                  // Passimistic update start
                  dispatch(
                     apiSlice.util.updateQueryData('messages', res.conversationId.toString(), (draft) => {
                        draft.push(res);
                     })
                  );
                  // Passimistic update end
               }
            } catch (error) {
               patchResult1.undo();
            }
         },
      }),
   }),
});

export const {
   useGetConversationsQuery,
   useGetConversationQuery,
   useAddConversationMutation,
   useEditConversationMutation,
} = conversationsApi;
