import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { userLoggedIn } from '../../features/auth/authSlice';

//checks whether redux store means auth slice is up to date with localstorages. returns a true false
export const useAuthCheck = () => {
   const [authCheked, setAuthChecked] = useState(false);
   const dispatch = useDispatch();
   useEffect(() => {
      const localAuth = localStorage.getItem('auth');

      if (localAuth) {
         const auth = JSON.parse(localAuth);
         if (auth.accessToken && auth.user) {
            dispatch(
               userLoggedIn({
                  accessToken: auth.accessToken,
                  user: auth.user,
               })
            );
         }
      }
      setAuthChecked(true);
   }, [dispatch]);
   return authCheked;
};
