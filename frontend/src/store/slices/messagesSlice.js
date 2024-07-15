import { createSlice } from '@reduxjs/toolkit';
import { removeChannel } from './channelsSlice.js';

const initialState = {
  messages: [],
  status: '',
};

/* eslint-disable */
const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessages: (state, { payload }) => {
      state.messages = payload;
    },
    addMessage: (state, { payload }) => {
      state.messages = [...state.messages, payload];
      state.status = 'loaded';
    },
    setMessagesStatus: (state, { payload }) => {
      state.status = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(removeChannel, (state, { payload }) => {
      const { id } = payload;
      state.messages = state.messages.filter((msg) => msg.channelId !== id);
    });
  },
});

export const {
  setMessages,
  addMessage,
  setMessagesStatus,
} = messagesSlice.actions;
export default messagesSlice.reducer;
