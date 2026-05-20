import { createSlice } from '@reduxjs/toolkit';

import { normalizeMessage, sortMessages } from '../utils/chatFormat';
import { fetchMessagesQuery, markMessagesReadQuery, sendMessageRestQuery } from './messages.query';

const initialState = {
  byConversation: {},
  readInfo: null,
  loading: false,
  sending: false,
  error: '',
};

const mergeMessages = (oldMessages = [], newMessages = []) => {
  const byId = new Map([...newMessages, ...oldMessages].map((message) => [message.id, message]));
  return sortMessages([...byId.values()]);
};

const messagesSlice = createSlice({
  name: 'chatMessages',
  initialState,
  reducers: {
    clearMessages: () => initialState,
    addRealtimeMessage: (state, action) => {
      const message = normalizeMessage(action.payload);
      const conversationId = message.conversation_id;
      if (!conversationId || !message.id || !message.message) return;

      const existing = state.byConversation[conversationId] || [];
      const byId = new Map([...existing, message].map((item) => [item.id, item]));

      state.byConversation[conversationId] = sortMessages([...byId.values()]);
    },
    setReadInfo: (state, action) => {
      state.readInfo = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessagesQuery.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchMessagesQuery.fulfilled, (state, action) => {
        const conversationId = action.payload.conversationId;
        const normalized = (action.payload.messages || []).map(normalizeMessage);
        const existing = state.byConversation[conversationId] || [];

        state.loading = false;
        state.byConversation[conversationId] = mergeMessages(existing, normalized);
      })
      .addCase(fetchMessagesQuery.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || action.payload || '';
      })
      .addCase(sendMessageRestQuery.pending, (state) => {
        state.sending = true;
      })
      .addCase(sendMessageRestQuery.fulfilled, (state, action) => {
        const conversationId = action.payload.conversationId;
        const message = normalizeMessage(action.payload.message);

        state.sending = false;
        state.byConversation[conversationId] = sortMessages([
          ...(state.byConversation[conversationId] || []),
          message,
        ]);
      })
      .addCase(sendMessageRestQuery.rejected, (state, action) => {
        state.sending = false;
        state.error = action.payload?.message || action.payload || '';
      })
      .addCase(markMessagesReadQuery.fulfilled, (state, action) => {
        state.readInfo = action.payload;
      });
  },
});

export const { addRealtimeMessage, clearMessages, setReadInfo } = messagesSlice.actions;

export default messagesSlice.reducer;
