import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channelsData: [],
  currentChannelId: '1',
  lastAddedBy: null,
};

/* eslint-disable */
const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setChannelsData: (state, { payload }) => {
      state.channelsData = payload;
    },
    addChannel: (state, { payload }) => {
      state.channelsData = [...state.channelsData, payload];
    },
    setCurrentChannelId : (state, { payload }) => {
      state.currentChannelId = payload.id;
    },
    setLastAddedBy: (state, { payload }) => {
      state.lastAddedBy = payload.name;
    },
    renameChannel: (state, { payload }) => {
      const index = state.channelsData.findIndex((channel) => channel.id === payload.id);
      if (index !== -1) {
        state.channelsData[index] = {
          ...state.channelsData[index],
          name: payload.name,
        };
      }
    },
    removeChannel: (state, { payload }) => {
      if (state.currentChannelId === payload.id) {
        state.currentChannelId = '1';
      }
      state.channelsData = state.channelsData.filter((channel) => channel.id !== payload.id);
    },
  },
});

export const {
  setChannelsData,
  addChannel,
  renameChannel,
  removeChannel,
  setCurrentChannelId,
  setLastAddedBy,
} = channelsSlice.actions;

export default channelsSlice.reducer;
