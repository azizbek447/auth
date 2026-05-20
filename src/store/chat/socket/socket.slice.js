import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: 'offline',
  error: '',
  joined: null,
  typingUsers: {},
  onlineUsers: [],
};

const socketSlice = createSlice({
  name: 'chatSocket',
  initialState,
  reducers: {
    setSocketStatus: (state, action) => {
      state.status = action.payload.status;
      state.error = action.payload.error || '';
    },
    setJoinedConversation: (state, action) => {
      state.joined = action.payload;
    },
    setRemoteUserTyping: (state, action) => {
      state.typingUsers[action.payload.conversationId] = action.payload;
    },
    removeRemoteUserTyping: (state, action) => {
      delete state.typingUsers[action.payload.conversationId];
    },
    setUserOnline: (state, action) => {
      const id = Number(action.payload.userId);
      if (!state.onlineUsers.includes(id)) state.onlineUsers.push(id);
    },
    setUserOffline: (state, action) => {
      const id = Number(action.payload.userId);
      state.onlineUsers = state.onlineUsers.filter((item) => item !== id);
    },
    clearSocketState: () => initialState,
  },
});

export const {
  clearSocketState,
  removeRemoteUserTyping,
  setJoinedConversation,
  setRemoteUserTyping,
  setSocketStatus,
  setUserOffline,
  setUserOnline,
} = socketSlice.actions;

export default socketSlice.reducer;
