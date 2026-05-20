import { createAsyncThunk } from '@reduxjs/toolkit';

import { chatRequest } from '../../../services/axios/chat.axios';
import { normalizeMessage } from '../utils/chatFormat';

export const endpoints = {
  getMessages: (conversationId) => `/api/messages/${conversationId}`,
  sendMessage: (conversationId) => `/api/messages/${conversationId}`,
  sendMessageAlt: '/api/messages',
  markRead: (conversationId) => `/api/messages/read/${conversationId}`,
};

const abortControllers = new Map();

const abortPreviousRequest = (conversationId) => {
  const existing = abortControllers.get(conversationId);
  if (existing) {
    existing.abort();
    abortControllers.delete(conversationId);
  }
};

const normalizeResponse = (response) => {
  if (Array.isArray(response)) return response;

  const candidates = [
    response?.data?.data,
    response?.data?.messages,
    response?.data?.result,
    response?.data?.items,
    response?.data?.rows,
    response?.messages,
    response?.result,
    response?.items,
    response?.rows,
    response?.data,
  ];

  const direct = candidates.find(Array.isArray);
  if (direct) return direct;

  const nested = candidates
    .filter((item) => item && typeof item === 'object')
    .map((item) => item.messages || item.data || item.result || item.items || item.rows)
    .find(Array.isArray);

  return nested || [];
};

const rejectError = (error, endpoint, silent = true) => ({
  endpoint,
  message:
    error?.response?.data?.message || error?.response?.data || error?.message || 'Request error',
  silent,
});

export const fetchMessagesQuery = createAsyncThunk(
  'chatMessages/fetchHistory',
  async ({ conversationId, params = {}, isForUpdate = false }, { rejectWithValue, signal }) => {
    if (!conversationId) {
      return rejectWithValue({ message: 'conversationId required', silent: true });
    }

    const validLimit =
      typeof params.limit === 'number' && params.limit > 0 ? Math.min(params.limit, 100) : 50;

    try {
      if (!isForUpdate) abortPreviousRequest(conversationId);

      const controller = new AbortController();
      abortControllers.set(conversationId, controller);
      signal?.addEventListener('abort', () => controller.abort());

      const requestParams = {
        ...params,
        limit: validLimit,
      };

      const messages = await chatRequest.getMessages(conversationId, requestParams, {
        signal: controller.signal,
      });

      abortControllers.delete(conversationId);

      return {
        conversationId,
        isForUpdate,
        messages: normalizeResponse(messages).map((message) =>
          normalizeMessage({
            ...message,
            conversation_id: message.conversation_id || conversationId,
          })
        ),
        params: requestParams,
      };
    } catch (error) {
      abortControllers.delete(conversationId);

      if (error.name === 'AbortError' || error.code === 'ERR_CANCELED') {
        return rejectWithValue({ message: 'aborted', silent: true });
      }

      return rejectWithValue(rejectError(error, endpoints.getMessages(conversationId)));
    }
  }
);

export const sendMessageRestQuery = createAsyncThunk(
  'chatMessages/sendRest',
  async ({ conversationId, message }, { rejectWithValue }) => {
    if (!conversationId || !message?.trim()) {
      return rejectWithValue({ message: 'conversationId and message required', silent: true });
    }

    try {
      const response = await chatRequest.createMessage(conversationId, message);
      return {
        conversationId,
        message: normalizeMessage(response?.message || response),
      };
    } catch {
      try {
        const response = await chatRequest.createMessageAlt(conversationId, message);
        return {
          conversationId,
          message: normalizeMessage(response?.message || response),
        };
      } catch (error) {
        return rejectWithValue(rejectError(error, endpoints.sendMessage(conversationId), false));
      }
    }
  }
);

export const markMessagesReadQuery = createAsyncThunk(
  'chatMessages/markRead',
  async (conversationId, { rejectWithValue }) => {
    if (!conversationId) {
      return rejectWithValue({ message: 'conversationId required', silent: true });
    }

    try {
      return await chatRequest.markRead(conversationId);
    } catch (error) {
      return rejectWithValue(rejectError(error, endpoints.markRead(conversationId)));
    }
  }
);
