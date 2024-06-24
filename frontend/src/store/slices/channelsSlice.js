import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channelsData: [],
  currentChannelId: 1,
};

/* eslint-disable */
const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    fetchChannels: (state, { payload }) => {
      state.channelsData = payload;
    },
    toggleChannel: (state, { payload }) => {
      state.currentChannelId = payload.currentChannelId;
    },
    addChannel: (state, { payload }) => {
      state.channelsData = [...state.channelsData, payload];
      state.currentChannelId = Number(payload.id);
    },
    renameChannel: (state, { payload }) => {
      const updatedChannelsData = state.channelsData.map(channel => {
        if (channel.id === payload.id) {
          return {
            ...channel,
            name: payload.name,
          };
        }
        return channel;
      });
      state.channelsData = updatedChannelsData;
    },
    removeChannel: (state, { payload }) => {
      state.channelsData = state.channelsData.filter((channel) => channel.id !== payload.id);
    },
  },
});

export const {
  fetchChannels,
  toggleChannel,
  addChannel,
  renameChannel,
  removeChannel,
} = channelsSlice.actions;

export default channelsSlice.reducer;
