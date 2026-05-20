import { useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AppHeader from '../../components/chat/AppHeader';
import AuthScreen from '../../components/chat/AuthScreen';
import ChatPanel from '../../components/chat/ChatPanel';
import Sidebar from '../../components/chat/Sidebar';
import { useChatSocket } from '../../hooks/useChatSocket';
import { disconnectChatSocket } from '../../services/socket/chat.socket';
import {
  emitMessageReadSocket,
  emitTypingStartSocket,
  emitTypingStopSocket,
  joinConversationSocket,
  sendMessageSocket,
} from '../../services/socket/chat.socket';
import { fetchMeQuery, logoutQuery, refreshTokenQuery } from '../../store/chat/auth/auth.query';
import { clearAuthState } from '../../store/chat/auth/auth.slice';
import {
  createConversationQuery,
  fetchConversationsQuery,
} from '../../store/chat/conversations/conversations.query';
import {
  clearConversations,
  markConversationReadLocal,
  setActiveConversation,
} from '../../store/chat/conversations/conversations.slice';
import {
  fetchMessagesQuery,
  markMessagesReadQuery,
  sendMessageRestQuery,
} from '../../store/chat/messages/messages.query';
import {
  addRealtimeMessage,
  clearMessages,
  setReadInfo,
} from '../../store/chat/messages/messages.slice';
import { clearSocketState } from '../../store/chat/socket/socket.slice';
import { fetchUserByIdQuery, searchUsersQuery } from '../../store/chat/users/users.query';
import { clearUserSearch, setSearchTerm } from '../../store/chat/users/users.slice';
import { getConversationId, sortMessages } from '../../store/chat/utils/chatFormat';

export default function ChatApp() {
  const dispatch = useDispatch();
  const typingTimer = useRef(null);

  const { accessToken, refreshToken, user } = useSelector((state) => state.chatAuth);
  const { active, list: conversations, loading } = useSelector((state) => state.chatConversations);
  const { byConversation, readInfo, sending } = useSelector((state) => state.chatMessages);
  const {
    error: socketError,
    onlineUsers,
    status: socketStatus,
    typingUsers,
  } = useSelector((state) => state.chatSocket);
  const { searchResults, searchTerm } = useSelector((state) => state.chatUsers);

  const activeConversationId = getConversationId(active);
  const activeMessages = useMemo(
    () => sortMessages(byConversation[activeConversationId] || []),
    [activeConversationId, byConversation]
  );

  useChatSocket({ accessToken, activeConversationId });

  useEffect(() => {
    if (!accessToken && refreshToken) {
      dispatch(refreshTokenQuery(refreshToken));
    }
  }, [accessToken, dispatch, refreshToken]);

  useEffect(() => {
    if (!accessToken) return;

    dispatch(fetchMeQuery());
    dispatch(fetchConversationsQuery());
  }, [accessToken, dispatch]);

  useEffect(() => {
    if (socketStatus === 'connected' && activeConversationId) {
      joinConversationSocket(activeConversationId);
    }
  }, [activeConversationId, socketStatus]);

  useEffect(() => {
    const query = searchTerm.trim();

    if (!query || !accessToken) return;

    const timer = window.setTimeout(() => {
      dispatch(searchUsersQuery(query));
    }, 300);

    return () => window.clearTimeout(timer);
  }, [accessToken, dispatch, searchTerm]);

  const openConversation = async (conversation) => {
    const conversationId = getConversationId(conversation);

    dispatch(setActiveConversation(conversation));
    dispatch(setReadInfo(null));
    if (conversation.other_user?.id) {
      dispatch(fetchUserByIdQuery(conversation.other_user.id));
    }
    await dispatch(fetchMessagesQuery({ conversationId })).unwrap();
    await joinConversationSocket(conversationId);

    const socketRead = await emitMessageReadSocket(conversationId);
    if (socketRead?.ok) dispatch(setReadInfo(socketRead));

    dispatch(markMessagesReadQuery(conversationId));
    dispatch(markConversationReadLocal(conversationId));
  };

  const createConversation = async (userId) => {
    const conversation = await dispatch(createConversationQuery(userId)).unwrap();

    dispatch(clearUserSearch());
    await openConversation(conversation);
  };

  const loadOlder = () => {
    if (!activeConversationId) return;

    const firstMessage = activeMessages[0];
    dispatch(
      fetchMessagesQuery({
        conversationId: activeConversationId,
        params: firstMessage ? { before_id: firstMessage.id, limit: 50 } : {},
      })
    );
  };

  const sendMessage = async (messageText) => {
    if (!activeConversationId) return;

    const socketResponse = await sendMessageSocket({
      conversationId: activeConversationId,
      message: messageText,
    });

    if (!socketResponse?.ok) {
      await dispatch(
        sendMessageRestQuery({ conversationId: activeConversationId, message: messageText })
      );
    } else if (socketResponse.message?.id) {
      dispatch(addRealtimeMessage(socketResponse.message));
    }

    emitTypingStopSocket(activeConversationId);
    dispatch(fetchConversationsQuery());
  };

  const handleTyping = (value) => {
    if (!activeConversationId) return;

    if (value.trim()) emitTypingStartSocket(activeConversationId);

    window.clearTimeout(typingTimer.current);
    typingTimer.current = window.setTimeout(() => emitTypingStopSocket(activeConversationId), 900);
  };

  const logout = async () => {
    try {
      await dispatch(logoutQuery(refreshToken)).unwrap();
    } catch {
      dispatch(clearAuthState());
    }

    disconnectChatSocket();
    dispatch(clearAuthState());
    dispatch(clearConversations());
    dispatch(clearMessages());
    dispatch(clearSocketState());
    dispatch(clearUserSearch());
  };

  if (!accessToken || !user) return <AuthScreen />;

  return (
    <div className='flex h-[100dvh] flex-col overflow-hidden bg-slate-100 text-slate-900'>
      <AppHeader socketError={socketError} onLogout={logout} />

      <div className='grid min-h-0 flex-1 grid-cols-1 md:grid-cols-[380px_minmax(0,1fr)]'>
        <div className={`${active ? 'hidden md:block' : 'block'} min-h-0`}>
          <Sidebar
            activeConversationId={activeConversationId}
            conversations={conversations}
            loading={loading}
            onCreateConversation={createConversation}
            onRefresh={() => dispatch(fetchConversationsQuery())}
            onSelect={openConversation}
            onlineUsers={onlineUsers}
            searchResults={searchResults.filter((item) => Number(item.id) !== Number(user?.id))}
            searchTerm={searchTerm}
            setSearchTerm={(value) => dispatch(setSearchTerm(value))}
            socketStatus={socketStatus}
            user={user}
          />
        </div>
        <div className={`${active ? 'block' : 'hidden md:block'} min-h-0`}>
          <ChatPanel
            activeConversation={active}
            currentUser={user}
            messages={activeMessages}
            onBack={() => dispatch(setActiveConversation(null))}
            onLoadOlder={loadOlder}
            onSend={sendMessage}
            onTyping={handleTyping}
            readInfo={readInfo}
            sending={sending}
            typingUsers={typingUsers}
          />
        </div>
      </div>
    </div>
  );
}
