import '../index.css';
import { Route, Routes } from 'react-router-dom';

import Navbar from './Navbar';
import ErrorPage from '../pages/ErrorPage';
import LoginPage from '../pages/LoginPage';
import routes from '../routes';

const App = () => {
  return (
    <div className="d-flex flex-column h-100">
      <Navbar />
      <Routes>
        <Route path={routes.rootPagePath()} element={<LoginPage />} />
        <Route path={routes.loginPagePath()} element={<LoginPage />} />
        <Route path={routes.otherPagePath()} element={<ErrorPage />} />
      </Routes>
    </div>
  );
};

export default App;
