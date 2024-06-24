import { io } from 'socket.io-client';

import { addMessage } from '../store/slices/messagesSlice';

const socket = io();

socket.on('connect', () => {
  console.log('Socket connection established');
});

const socketMiddleware = ({ dispatch }) => (next) => (action) => {
  switch (action.type) {
    case 'socket/connect':
      socket.on('newMessage', (payload) => dispatch(addMessage(payload)));
      break;
    default:
      break;
  }
  return next(action);
};

export default socketMiddleware;
