import { useContext } from 'react';
import { AuthContext, ModalContext } from '../contexts/index';

export const useAuth = () => useContext(AuthContext);

export const useModal = () => useContext(ModalContext);
