import { configureStore } from '@reduxjs/toolkit';
import messagesReducer from './slices/messagesSlice.js';
import channelsReducer from './slices/channelsSlice.js';
import userReducer from './slices/userSlice.js';
// import { renameChannel, removeChannel } from '../middlewares/index.js';

export default configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesReducer,
    user: userReducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(renameChannel, removeChannel),
});
