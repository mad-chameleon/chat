import {
  useState, useMemo, useCallback,
} from 'react';
import { useDispatch } from 'react-redux';

import { AuthContext, ModalContext } from '../contexts/index';
import { fetchUserData } from '../store/slices/userSlice';

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const userLoggedIn = localStorage.getItem('userData');
    return !!userLoggedIn;
  });

  const logIn = (data) => {
    localStorage.setItem('userData', JSON.stringify(data));
    dispatch(fetchUserData(data));
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

export const ModalProvider = ({ children }) => {
  const [modalType, setModalType] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const showModal = useCallback((type, id = null) => {
    setCurrentId(id);
    setModalType(type);
    setIsOpen(true);
  }, []);

  const hideModal = useCallback(() => {
    setCurrentId(null);
    setModalType(null);
    setIsOpen(false);
  }, []);

  const contextValue = useMemo(() => ({
    modalType,
    isOpen,
    currentId,
    showModal,
    hideModal,
  }), [modalType, isOpen, currentId, showModal, hideModal]);

  return (
    <ModalContext.Provider
      value={contextValue}
    >
      { children }
    </ModalContext.Provider>
  );
};
