import { configureStore } from '@reduxjs/toolkit';

import messagesReducer from './slices/messagesSlice.js';
import channelsReducer from './slices/channelsSlice.js';
import userReducer from './slices/userSlice.js';
import { channelsApi } from '../services/channelsApi';
import { messagesApi } from '../services/messagesApi';

const store = configureStore({
  reducer: {
    channels: channelsReducer,
    [channelsApi.reducerPath]: channelsApi.reducer,
    messages: messagesReducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(channelsApi.middleware, messagesApi.middleware),
});

export default store;
