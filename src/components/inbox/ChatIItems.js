import gravatarUrl from 'gravatar-url';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useConversationsQuery } from '../../features/conversations/conversationsApi';
import Error from '../ui/Error';
import getPertnerInfo from '../utils/getPertnerInfo';
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
         const { id, message, timestamp, users } = conversation;
         const { name, email: partnerEmail } = getPertnerInfo(users, email);

         return (
            <li key={id}>
               <Link to={`/inbox/${id}`}>
                  <ChatItem
                     avatar={gravatarUrl(partnerEmail, { size: 80 })}
                     name={name}
                     lastMessage={message}
                     lastTime={moment(timestamp).fromNow()}
                  />
               </Link>
            </li>
         );
      });

   return <ul>{content}</ul>;
}
