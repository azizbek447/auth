import { createAsyncThunk } from '@reduxjs/toolkit';

import { chatRequest } from '../../../services/axios/chat.axios';

export const endpoints = {
  health: '/api/health',
  register: '/api/auth/register',
  login: '/api/auth/login',
  me: '/api/auth/me',
  refresh: '/api/auth/refresh',
  logout: '/api/auth/logout',
};

const rejectError = (error, endpoint, silent = false) => ({
  endpoint,
  message:
    error?.response?.data?.message || error?.response?.data || error?.message || 'Request error',
  silent,
});

export const checkHealthQuery = createAsyncThunk('chatAuth/checkHealth', async (_, thunkApi) => {
  try {
    return await chatRequest.health();
  } catch (error) {
    return thunkApi.rejectWithValue(rejectError(error, endpoints.health, true));
  }
});

export const loginQuery = createAsyncThunk('chatAuth/login', async (data, thunkApi) => {
  if (!data?.email || !data?.password) {
    return thunkApi.rejectWithValue({ message: 'email and password required', silent: true });
  }

  try {
    return await chatRequest.login(data);
  } catch (error) {
    return thunkApi.rejectWithValue(rejectError(error, endpoints.login));
  }
});

export const registerQuery = createAsyncThunk('chatAuth/register', async (data, thunkApi) => {
  if (!data?.username || !data?.email || !data?.password) {
    return thunkApi.rejectWithValue({
      message: 'username, email and password required',
      silent: true,
    });
  }

  try {
    return await chatRequest.register(data);
  } catch (error) {
    return thunkApi.rejectWithValue(rejectError(error, endpoints.register));
  }
});

export const fetchMeQuery = createAsyncThunk('chatAuth/me', async (_, thunkApi) => {
  try {
    return await chatRequest.me();
  } catch (error) {
    return thunkApi.rejectWithValue(rejectError(error, endpoints.me, true));
  }
});

export const refreshTokenQuery = createAsyncThunk(
  'chatAuth/refresh',
  async (refreshToken, thunkApi) => {
    try {
      return await chatRequest.refresh(refreshToken);
    } catch (error) {
      return thunkApi.rejectWithValue(rejectError(error, endpoints.refresh, true));
    }
  }
);

export const logoutQuery = createAsyncThunk('chatAuth/logout', async (refreshToken, thunkApi) => {
  try {
    await chatRequest.logout(refreshToken);
    return true;
  } catch (error) {
    return thunkApi.rejectWithValue(rejectError(error, endpoints.logout, true));
  }
});
