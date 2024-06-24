import { configureStore } from '@reduxjs/toolkit';

import messagesReducer from './slices/messagesSlice.js';
import channelsReducer from './slices/channelsSlice.js';
import userReducer, { fetchUserData } from './slices/userSlice.js';
import socketMiddleware from '../middlewares';

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
