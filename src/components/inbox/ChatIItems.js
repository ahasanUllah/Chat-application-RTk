import { useSelector } from 'react-redux';
import { useConversationsQuery } from '../../features/conversations/conversationsApi';
import Error from '../ui/Error';
import ChatItem from './ChatItem';

export default function ChatItems() {
   const { user } = useSelector((state) => state.auth);
   const { email } = user || {};
   const { data: conversations, isLoading, isError, error } = useConversationsQuery(email);

   let content = null;
   if (isLoading) content = <li className="m-2 text-center">Loading ...</li>;
   if (!isLoading && isError) content = <Error message={error.data}></Error>;
   if (!isLoading && !isError && conversations.length === 0)
      content = <li className="m-2 text-center">No conversations found</li>;
   if (!isLoading && !isError && conversations.length > 0)
      content = conversations.map((conversation) => {
         const { id, message } = conversation;
         return (
            <li key={id}>
               <ChatItem
                  avatar="https://cdn.pixabay.com/photo/2018/09/12/12/14/man-3672010__340.jpg"
                  name="Saad Hasan"
                  lastMessage={message}
                  lastTime="25 minutes"
               />
            </li>
         );
      });

   return <ul>{content}</ul>;
}
