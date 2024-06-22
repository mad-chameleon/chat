import { useState, useMemo } from 'react';
import { AuthContext } from '../contexts/index';

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const userLoggedIn = localStorage.getItem('userToken');
    return !!userLoggedIn;
  });

  const logIn = (token) => {
    localStorage.setItem('userToken', JSON.stringify(token));
    setIsLoggedIn(true);
  };

  const logOut = () => {
    localStorage.removeItem('userToken');
    setIsLoggedIn(false);
  };

  const contextValue = useMemo(() => ({ isLoggedIn, logIn, logOut }), [isLoggedIn]);

  return (
    <AuthContext.Provider value={contextValue}>
      { children }
    </AuthContext.Provider>
  );
};
