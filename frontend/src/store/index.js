import { configureStore } from '@reduxjs/toolkit';
import { io } from 'socket.io-client';

import messagesReducer, { addMessage } from './slices/messagesSlice.js';
import channelsReducer, { addChannel, removeChannel, renameChannel } from './slices/channelsSlice.js';
import userReducer, { fetchUserData } from './slices/userSlice.js';
import routes from '../routes';

const socket = io();

socket.on('connect', () => {
  console.log('Socket connection established');
});

const socketMiddleware = ({ dispatch }) => (next) => (action) => {
  switch (action.type) {
    case 'messages/addMessage':
      socket.on(routes.newMessagePath(), (payload) => dispatch(addMessage(payload)));
      socket.disconnect();
      break;
    case 'channels/addChannel':
      socket.on(routes.newChannelPath(), (payload) => dispatch(addChannel(payload)));
      socket.disconnect();
      break;
    case 'channels/renameChannel':
      socket.on(routes.renameChannelPath(), (payload) => dispatch(renameChannel(payload)));
      socket.disconnect();
      break;
    case 'channels/removeChannel':
      socket.on(routes.removeChannelPath(), (payload) => dispatch(removeChannel(payload)));
      socket.disconnect();
      break;
    default:
      break;
  }
  return next(action);
};

const store = configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(socketMiddleware),
});

const loadUserData = () => {
  const userData = localStorage.getItem('userData');
  if (userData) {
    store.dispatch(fetchUserData(JSON.parse(userData)));
  }
};

loadUserData();

export default store;
