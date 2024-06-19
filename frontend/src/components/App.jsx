import '../index.css';
import { Navigate, Route, Routes } from 'react-router-dom';

import Navbar from './Navbar';
import ErrorPage from '../pages/ErrorPage';
import LoginPage from '../pages/LoginPage';
import routes from '../routes';
import { useAuth } from '../hooks';

const App = () => {
  const { isLoggedIn } = useAuth();
  const Redirect = isLoggedIn ? <Navigate to={routes.chatPagePath()} /> : <Navigate to={routes.loginPagePath()} />;

  return (
    <div className="d-flex flex-column h-100">
      <Navbar />
      <Routes>
        <Route path={routes.chatPagePath()} element={Redirect} />
        <Route path={routes.loginPagePath()} element={<LoginPage />} />
        <Route path={routes.otherPagePath()} element={<ErrorPage />} />
      </Routes>
    </div>
  );
};

export default App;
