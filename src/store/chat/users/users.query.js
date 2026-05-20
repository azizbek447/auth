import { createAsyncThunk } from '@reduxjs/toolkit';

import { chatRequest } from '../../../services/axios/chat.axios';

export const endpoints = {
  searchUsers: '/api/users/search',
  getUser: (id) => `/api/users/${id}`,
};

const normalizeResponse = (response) => {
  if (Array.isArray(response)) return response;

  const candidates = [
    response?.data?.data,
    response?.data?.users,
    response?.data?.items,
    response?.data?.rows,
    response?.users,
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

export const searchUsersQuery = createAsyncThunk('chatUsers/search', async (query, thunkApi) => {
  if (!query?.trim()) return [];

  try {
    const response = await chatRequest.searchUsers(query);
    return normalizeResponse(response);
  } catch (error) {
    return thunkApi.rejectWithValue(rejectError(error, endpoints.searchUsers));
  }
});

export const fetchUserByIdQuery = createAsyncThunk('chatUsers/fetchById', async (id, thunkApi) => {
  if (!id) return thunkApi.rejectWithValue({ message: 'id required', silent: true });

  try {
    return await chatRequest.getUser(id);
  } catch (error) {
    return thunkApi.rejectWithValue(rejectError(error, endpoints.getUser(id)));
  }
});
