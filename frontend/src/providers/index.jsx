import {
  useState, useMemo, useCallback, useEffect,
} from 'react';
import { useDispatch } from 'react-redux';

import { AuthContext, ModalContext, SocketContext } from '../contexts/index';
import { fetchUserData } from '../store/slices/userSlice';
import { createSocketApi } from '../socket';

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
  const [isOpen, setModalIsOpen] = useState(false);
  const [channelId, setCurrentChannelId] = useState(null);

  const showModal = useCallback((type, id = null) => {
    setCurrentChannelId(id);
    setModalType(type);
    setModalIsOpen(true);
  }, []);

  const hideModal = useCallback(() => {
    setCurrentChannelId(null);
    setModalType(null);
    setModalIsOpen(false);
  }, []);

  const contextValue = useMemo(() => ({
    modalType,
    isOpen,
    channelId,
    showModal,
    hideModal,
  }), [modalType, isOpen, channelId, showModal, hideModal]);

  return (
    <ModalContext.Provider
      value={contextValue}
    >
      { children }
    </ModalContext.Provider>
  );
};

export const SocketProvider = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const { setupSockets, cleanupSockets } = createSocketApi(dispatch);

    setupSockets();

    return () => cleanupSockets();
  }, [dispatch]);

  return (
    <SocketContext.Provider value={null}>
      { children }
    </SocketContext.Provider>
  );
};
