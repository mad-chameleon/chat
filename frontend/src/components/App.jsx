import '../index.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { io } from 'socket.io-client';

import Navbar from './Navbar';
import ErrorPage from '../pages/ErrorPage';
import LoginPage from '../pages/LoginPage';
import SignUpPage from '../pages/SignUpPage';
import ChatPage from '../pages/ChatPage';
import routes from '../routes';
import { useAuth, useModal } from '../hooks';
import modals from './modals';
import { addChannel, removeChannel, renameChannel } from '../store/slices/channelsSlice';
import { addMessage } from '../store/slices/messagesSlice';

const socket = io();

socket.on('connect', () => {
  console.log('Socket connection established');
});

const App = () => {
  const { isLoggedIn } = useAuth();
  const { isOpen, modalType } = useModal();

  const dispatch = useDispatch();

  const Redirect = isLoggedIn ? <ChatPage /> : <Navigate to={routes.loginPagePath()} />;

  useEffect(() => {
    const eventHandlers = [
      { event: routes.newMessagePath(), handler: (payload) => dispatch(addMessage(payload)) },
      { event: routes.newChannelPath(), handler: (payload) => dispatch(addChannel(payload)) },
      { event: routes.renameChannelPath(), handler: (payload) => dispatch(renameChannel(payload)) },
      { event: routes.removeChannelPath(), handler: (payload) => dispatch(removeChannel(payload)) },
    ];

    eventHandlers
      .forEach(({ event, handler }) => socket.on(event, handler));

    return () => {
      eventHandlers
        .forEach(({ event, handler }) => socket.off(event, handler));
    };
  }, [dispatch]);

  return (
    <>
      <div className="d-flex flex-column h-100">
        <Navbar />
        <Routes>
          <Route path={routes.chatPagePath()} element={Redirect} />
          <Route path={routes.loginPagePath()} element={<LoginPage />} />
          <Route path={routes.signupPagePath()} element={<SignUpPage />} />
          <Route path={routes.otherPagePath()} element={<ErrorPage />} />
        </Routes>
      </div>
      { isOpen && modals[modalType] }
      <ToastContainer />
    </>
  );
};

export default App;
