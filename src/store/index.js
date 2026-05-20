import { configureStore } from '@reduxjs/toolkit';

import authReducer from './chat/auth/auth.slice';
import conversationsReducer from './chat/conversations/conversations.slice';
import messagesReducer from './chat/messages/messages.slice';
import socketReducer from './chat/socket/socket.slice';
import usersReducer from './chat/users/users.slice';

export const store = configureStore({
  reducer: {
    chatAuth: authReducer,
    chatConversations: conversationsReducer,
    chatMessages: messagesReducer,
    chatSocket: socketReducer,
    chatUsers: usersReducer,
  },
});
