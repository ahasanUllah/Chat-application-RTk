import { Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';

export const PrivateRoute = ({ children }) => {
   const isLoggedIn = useAuth();
   if (isLoggedIn) {
      return children;
   } else {
      return <Navigate to="/" />;
   }
};
