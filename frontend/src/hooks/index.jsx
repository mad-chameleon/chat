import { useContext } from 'react';
// eslint-disable-next-line import/named
import { AuthContext, ModalContext, SocketContext } from '../contexts/index';

export const useAuth = () => useContext(AuthContext);

export const useModal = () => useContext(ModalContext);

export const useSocket = () => useContext(SocketContext);
