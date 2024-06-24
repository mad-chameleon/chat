import { useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';

import { AuthContext } from '../contexts/index';
import { fetchUserData } from '../store/slices/userSlice';

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const userLoggedIn = localStorage.getItem('userData');
    return !!userLoggedIn;
  });

  const logIn = (data) => {
    dispatch(fetchUserData(data));
    localStorage.setItem('userData', JSON.stringify(data));
    setIsLoggedIn(true);
  };

  const logOut = () => {
    localStorage.removeItem('userData');
    setIsLoggedIn(false);
  };

  const contextValue = useMemo(() => ({ isLoggedIn, logIn, logOut }), [isLoggedIn]);

  return (
    <AuthContext.Provider value={contextValue}>
      { children }
    </AuthContext.Provider>
  );
};
