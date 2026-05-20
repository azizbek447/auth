import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import {
  connectChatSocket,
  disconnectChatSocket,
  emitMessageReadSocket,
} from '../services/socket/chat.socket';
import { fetchConversationsQuery } from '../store/chat/conversations/conversations.query';
import {
  markConversationReadLocal,
  updateConversationPreview,
} from '../store/chat/conversations/conversations.slice';
import { markMessagesReadQuery } from '../store/chat/messages/messages.query';
import { addRealtimeMessage, setReadInfo } from '../store/chat/messages/messages.slice';
import {
  removeRemoteUserTyping,
  setJoinedConversation,
  setRemoteUserTyping,
  setSocketStatus,
  setUserOffline,
  setUserOnline,
} from '../store/chat/socket/socket.slice';
import { getMessageConversationId, normalizeMessage } from '../store/chat/utils/chatFormat';

export const useChatSocket = ({ accessToken, activeConversationId }) => {
  const dispatch = useDispatch();
  const activeConversationIdRef = useRef(activeConversationId);

  useEffect(() => {
    activeConversationIdRef.current = activeConversationId;
  }, [activeConversationId]);

  useEffect(() => {
    if (!accessToken) return undefined;

    const socket = connectChatSocket({
      token: accessToken,
      handlers: {
        onStatus: (status) => dispatch(setSocketStatus({ status })),
        onError: (error) => dispatch(setSocketStatus({ status: 'error', error })),
        onNewMessage: (payload) => {
          const message = normalizeMessage(payload);
          const conversationId = getMessageConversationId(message);
          const isOpen = activeConversationIdRef.current === conversationId;

          dispatch(addRealtimeMessage(message));
          dispatch(updateConversationPreview({ conversationId, isOpen, message }));

          if (isOpen) {
            emitMessageReadSocket(conversationId).then((response) => {
              if (response?.ok) dispatch(setReadInfo(response));
            });
            dispatch(markMessagesReadQuery(conversationId));
            dispatch(markConversationReadLocal(conversationId));
          } else {
            dispatch(fetchConversationsQuery());
          }
        },
        onJoined: (payload) => dispatch(setJoinedConversation(payload)),
        onUserTyping: (payload) => dispatch(setRemoteUserTyping(payload)),
        onUserStoppedTyping: (payload) => dispatch(removeRemoteUserTyping(payload)),
        onMessagesRead: (payload) => dispatch(setReadInfo(payload)),
        onUserOnline: (payload) => dispatch(setUserOnline(payload)),
        onUserOffline: (payload) => dispatch(setUserOffline(payload)),
      },
    });

    dispatch(setSocketStatus({ status: socket?.connected ? 'connected' : 'connecting' }));

    return () => {
      disconnectChatSocket();
    };
  }, [accessToken, dispatch]);
};
