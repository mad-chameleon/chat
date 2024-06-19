import { useState, useMemo } from 'react';
import { AuthContext } from '../contexts/index';

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const userLoggedIn = localStorage.getItem('user');
    return !!userLoggedIn;
  });

  const logIn = (token) => {
    localStorage.setItem('user', JSON.stringify(token));
    setIsLoggedIn(true);
  };

  const logOut = () => {
    // eslint-disable-next-line
    localStorage.removeItem('user');
    // eslint-disable-next-line
    setIsLoggedIn(false);
  };

  const contextValue = useMemo(() => ({ isLoggedIn, logIn, logOut }), [isLoggedIn]);

  return (
    <AuthContext.Provider value={contextValue}>
      { children }
    </AuthContext.Provider>
  );
};
