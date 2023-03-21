import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useAuthCheck } from './components/hooks/useAuthCheck';
import { PrivateRoute } from './components/PrivateRoute';
import { PublicRoute } from './components/PublicRoute';
import Test from './components/Test';
import Conversation from './pages/Conversation';
import Inbox from './pages/Inbox';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
   const authCheked = useAuthCheck();
   return !authCheked ? (
      <div>Checking authentication</div>
   ) : (
      <Router>
         <Routes>
            <Route
               path="/"
               element={
                  <PublicRoute>
                     <Login />
                  </PublicRoute>
               }
            />
            <Route
               path="/register"
               element={
                  <PublicRoute>
                     <Register />
                  </PublicRoute>
               }
            />
            <Route
               path="/inbox"
               element={
                  <PrivateRoute>
                     <Conversation />
                  </PrivateRoute>
               }
            />
            <Route
               path="/inbox/:id"
               element={
                  <PrivateRoute>
                     <Inbox />
                  </PrivateRoute>
               }
            />
         </Routes>
      </Router>
   );
}

export default App;
