import { createSlice } from '@reduxjs/toolkit';

import {
  clearChatSession,
  getStoredChatSession,
  saveChatSession,
} from '../../../services/axios/chat.axios';
import {
  checkHealthQuery,
  fetchMeQuery,
  loginQuery,
  logoutQuery,
  refreshTokenQuery,
  registerQuery,
} from './auth.query';

const storedSession = getStoredChatSession();

const initialState = {
  accessToken: storedSession.accessToken,
  refreshToken: storedSession.refreshToken,
  user: storedSession.user,
  health: null,
  loading: false,
  error: '',
};

const authSlice = createSlice({
  name: 'chatAuth',
  initialState,
  reducers: {
    clearAuthState: (state) => {
      clearChatSession();
      state.accessToken = '';
      state.refreshToken = '';
      state.user = null;
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkHealthQuery.fulfilled, (state, action) => {
        state.health = action.payload;
      })
      .addCase(checkHealthQuery.rejected, (state, action) => {
        state.health = { ok: false, service: action.payload?.message || action.payload };
      })
      .addCase(fetchMeQuery.fulfilled, (state, action) => {
        state.user = action.payload;
        saveChatSession({
          accessToken: state.accessToken,
          refreshToken: state.refreshToken,
          user: action.payload,
        });
      })
      .addCase(logoutQuery.fulfilled, (state) => {
        clearChatSession();
        state.accessToken = '';
        state.refreshToken = '';
        state.user = null;
      })
      .addCase(refreshTokenQuery.fulfilled, (state, action) => {
        saveChatSession(action.payload);
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.user = action.payload.user;
        state.error = '';
      })
      .addCase(refreshTokenQuery.rejected, (state, action) => {
        clearChatSession();
        state.accessToken = '';
        state.refreshToken = '';
        state.user = null;
        state.error = action.payload?.message || action.payload || 'Session tugagan';
      })
      .addMatcher(
        (action) => [loginQuery.pending.type, registerQuery.pending.type].includes(action.type),
        (state) => {
          state.loading = true;
          state.error = '';
        }
      )
      .addMatcher(
        (action) => [loginQuery.fulfilled.type, registerQuery.fulfilled.type].includes(action.type),
        (state, action) => {
          saveChatSession(action.payload);
          state.loading = false;
          state.accessToken = action.payload.accessToken;
          state.refreshToken = action.payload.refreshToken;
          state.user = action.payload.user;
        }
      )
      .addMatcher(
        (action) => [loginQuery.rejected.type, registerQuery.rejected.type].includes(action.type),
        (state, action) => {
          state.loading = false;
          state.error = action.payload?.message || action.payload || 'Kirishda xatolik';
        }
      );
  },
});

export const { clearAuthState } = authSlice.actions;

export default authSlice.reducer;
