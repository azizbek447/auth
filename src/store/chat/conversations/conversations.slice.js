import { createSlice } from '@reduxjs/toolkit';

import { getConversationId } from '../utils/chatFormat';
import { createConversationQuery, fetchConversationsQuery } from './conversations.query';

const initialState = {
  list: [],
  active: null,
  loading: false,
  error: '',
};

const upsertConversation = (list, conversation) => {
  const exists = list.some((item) => getConversationId(item) === getConversationId(conversation));
  return exists
    ? list.map((item) =>
        getConversationId(item) === getConversationId(conversation) ? conversation : item
      )
    : [conversation, ...list];
};

const conversationsSlice = createSlice({
  name: 'chatConversations',
  initialState,
  reducers: {
    setActiveConversation: (state, action) => {
      state.active = action.payload;
    },
    clearActiveConversation: (state) => {
      state.active = null;
    },
    clearConversations: () => initialState,
    markConversationReadLocal: (state, action) => {
      const conversationId = Number(action.payload);
      state.list = state.list.map((item) =>
        getConversationId(item) === conversationId ? { ...item, unread_count: 0 } : item
      );
    },
    updateConversationPreview: (state, action) => {
      const { conversationId, isOpen, message } = action.payload;

      state.list = state.list.map((conversation) => {
        if (getConversationId(conversation) !== Number(conversationId)) return conversation;

        return {
          ...conversation,
          last_message: message,
          unread_count: isOpen ? 0 : Number(conversation.unread_count || 0) + 1,
          updated_at: message.created_at || new Date().toISOString(),
        };
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchConversationsQuery.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchConversationsQuery.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload || [];
      })
      .addCase(fetchConversationsQuery.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || action.payload || '';
      })
      .addCase(createConversationQuery.fulfilled, (state, action) => {
        state.list = upsertConversation(state.list, action.payload);
        state.active = action.payload;
      });
  },
});

export const {
  clearActiveConversation,
  clearConversations,
  markConversationReadLocal,
  setActiveConversation,
  updateConversationPreview,
} = conversationsSlice.actions;

export default conversationsSlice.reducer;
