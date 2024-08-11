import { createApi } from '@reduxjs/toolkit/query/react';

import createAxiosBaseQuery from './axiosBaseQuery';
import routes from '../routes';

export const messagesApi = createApi({
  reducerPath: 'messagesApi',
  baseQuery: createAxiosBaseQuery(),
  endpoints: (builder) => ({
    fetchMessages: builder.query({
      query: () => ({
        url: routes.messagesApiPath(),
      }),
    }),
    fetchMessage: builder.mutation({
      query: (message) => ({
        url: routes.messagesApiPath(),
        method: 'POST',
        data: message,
      }),
    }),
    fetchDeleteMessage: builder.mutation({
      query: ({ id }) => ({
        url: routes.editMessageApiPath(id),
        method: 'DELETE',
      }),
    }),
    fetchEditMessage: builder.mutation({
      query: ({ id, editedMessage }) => ({
        url: routes.editMessageApiPath(id),
        method: 'PATCH',
        data: editedMessage,
      }),
    }),
  }),
});

export const selectAddMessageStatus = (state) => messagesApi.endpoints.addMessage.select()(state);
export const {
  useFetchMessagesQuery,
  useFetchMessageMutation,
  useFetchDeleteMessageMutation,
  useFetchEditMessageMutation,
} = messagesApi;
