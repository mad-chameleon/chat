import io from 'socket.io-client';

import routes from './routes';
import { addMessage } from './store/slices/messagesSlice';
import { addChannel, removeChannel, renameChannel } from './store/slices/channelsSlice';

const socket = io();

socket.on('connect', () => {
  console.log('Socket connection established');
});

export const createSocketApi = (dispatch) => {
  const socketHandlers = [
    { event: routes.newMessagePath(), handler: (payload) => dispatch(addMessage(payload)) },
    { event: routes.newChannelPath(), handler: (payload) => dispatch(addChannel(payload)) },
    { event: routes.renameChannelPath(), handler: (payload) => dispatch(renameChannel(payload)) },
    { event: routes.removeChannelPath(), handler: (payload) => dispatch(removeChannel(payload)) },
  ];

  const setupSockets = () => {
    socketHandlers
      .forEach(({ event, handler }) => socket.on(event, handler));
  };

  const cleanupSockets = () => {
    socketHandlers
      .forEach(({ event, handler }) => socket.off(event, handler));
  };

  return { setupSockets, cleanupSockets };
};

export default socket;
