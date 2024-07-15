import { createApi } from '@reduxjs/toolkit/query/react';

import createAxiosBaseQuery from './axiosBaseQuery';
import routes from '../routes';

export const channelsApi = createApi({
  reducerPath: 'channelsApi',
  baseQuery: createAxiosBaseQuery(),
  endpoints: (builder) => ({
    fetchChannels: builder.query({
      query: () => ({
        url: routes.channelsApiPath(),
      }),
    }),
    fetchChannel: builder.mutation({
      query: (channelName) => ({
        url: routes.channelsApiPath(),
        method: 'POST',
        data: channelName,
      }),
    }),
    fetchRenameChannel: builder.mutation({
      query: ({ name, channelId }) => ({
        url: routes.editChannelApiPath(channelId),
        method: 'PATCH',
        data: { name },
      }),
    }),
    fetchDeleteChannel: builder.mutation({
      query: ({ channelId }) => ({
        url: routes.editChannelApiPath(channelId),
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useFetchChannelsQuery,
  useFetchChannelMutation,
  useFetchRenameChannelMutation,
  useFetchDeleteChannelMutation,
} = channelsApi;
