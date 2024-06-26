import { io } from 'socket.io-client';

import { addMessage } from '../store/slices/messagesSlice';
import { addChannel, removeChannel, renameChannel } from '../store/slices/channelsSlice';
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
export default socketMiddleware;
