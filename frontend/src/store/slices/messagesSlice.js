import { createSlice } from '@reduxjs/toolkit';
import { removeChannel } from './channelsSlice.js';

const initialState = {
  messages: [],
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
