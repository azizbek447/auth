import { io } from 'socket.io-client';

import { CHAT_SOCKET_URL } from '../axios/chat.axios';

let socket = null;

export const connectChatSocket = ({ token, handlers = {} }) => {
  if (!token) return null;

  if (socket?.connected) return socket;

  socket?.disconnect();

  socket = io(CHAT_SOCKET_URL, {
    auth: { token },
    withCredentials: true,
    transports: ['websocket', 'polling'],
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
  });

  socket.on('connect', () => handlers.onStatus?.('connected'));
  socket.on('disconnect', () => handlers.onStatus?.('disconnected'));
  socket.on('connect_error', (error) => handlers.onError?.(error.message || 'Socket ulanmagan'));

  socket.on('joined', handlers.onJoined || (() => {}));
  socket.on('new_message', handlers.onNewMessage || (() => {}));
  socket.on('user_typing', handlers.onUserTyping || (() => {}));
  socket.on('user_stopped_typing', handlers.onUserStoppedTyping || (() => {}));
  socket.on('messages_read', handlers.onMessagesRead || (() => {}));
  socket.on('user_online', handlers.onUserOnline || (() => {}));
  socket.on('user_offline', handlers.onUserOffline || (() => {}));
  socket.on('socket_error', (error) => handlers.onError?.(error?.message || 'Socket xatoligi'));

  return socket;
};

export const disconnectChatSocket = () => {
  if (socket) {
    socket.removeAllListeners();
    socket.disconnect();
  }

  socket = null;
};

export const joinConversationSocket = (conversationId) =>
  new Promise((resolve) => {
    if (!socket || !conversationId) {
      resolve({ ok: false });
      return;
    }

    socket.emit('join_conversation', { conversationId }, (response) => resolve(response));
  });

export const sendMessageSocket = ({ conversationId, message }) =>
  new Promise((resolve) => {
    if (!socket || !conversationId || !message?.trim()) {
      resolve({ ok: false });
      return;
    }

    socket.emit('send_message', { conversationId, message: message.trim() }, (response) =>
      resolve(response)
    );
  });

export const emitTypingStartSocket = (conversationId) => {
  if (socket && conversationId) socket.emit('typing_start', { conversationId });
};

export const emitTypingStopSocket = (conversationId) => {
  if (socket && conversationId) socket.emit('typing_stop', { conversationId });
};

export const emitMessageReadSocket = (conversationId) =>
  new Promise((resolve) => {
    if (!socket || !conversationId) {
      resolve({ ok: false });
      return;
    }

    socket.emit('message_read', { conversationId }, (response) => resolve(response));
  });
