import io from 'socket.io-client';

import routes from './routes';
import { addMessage, editMessage, removeMessage } from './store/slices/messagesSlice';
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
    { event: routes.removeMessagePath(), handler: (payload) => dispatch(removeMessage(payload)) },
    { event: routes.editMessagePath(), handler: (payload) => dispatch(editMessage(payload)) },
  ];

  const cleanupSockets = () => {
    socketHandlers
      .forEach(({ event, handler }) => socket.off(event, handler));
    console.log('Socket connection closed');
  };

  const setupSockets = () => {
    socketHandlers
      .forEach(({ event, handler }) => socket.on(event, handler));
    socket.on('disconnect', cleanupSockets);
  };

  return { setupSockets };
};

export default socket;
