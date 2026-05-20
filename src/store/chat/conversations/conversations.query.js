import { createAsyncThunk } from '@reduxjs/toolkit';

import { chatRequest } from '../../../services/axios/chat.axios';

export const endpoints = {
  getConversations: '/api/conversations',
  createConversation: '/api/conversations',
};

const normalizeResponse = (response) => {
  if (Array.isArray(response)) return response;

  const candidates = [
    response?.data?.data,
    response?.data?.conversations,
    response?.data?.items,
    response?.data?.rows,
    response?.conversations,
    response?.items,
    response?.rows,
    response?.data,
  ];

  return candidates.find(Array.isArray) || [];
};

const rejectError = (error, endpoint, silent = true) => ({
  endpoint,
  message:
    error?.response?.data?.message || error?.response?.data || error?.message || 'Request error',
  silent,
});

export const fetchConversationsQuery = createAsyncThunk(
  'chatConversations/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await chatRequest.getConversations();
      return normalizeResponse(response);
    } catch (error) {
      return rejectWithValue(rejectError(error, endpoints.getConversations));
    }
  }
);

export const createConversationQuery = createAsyncThunk(
  'chatConversations/create',
  async (userId, { rejectWithValue }) => {
    if (!userId) {
      return rejectWithValue({ message: 'userId required', silent: true });
    }

    try {
      return await chatRequest.createConversation(userId);
    } catch (error) {
      return rejectWithValue(rejectError(error, endpoints.createConversation, false));
    }
  }
);
