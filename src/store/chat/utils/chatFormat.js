export const getConversationId = (conversation) => Number(conversation?.id);

export const getMessageConversationId = (message) =>
  Number(message?.conversation_id || message?.conversationId || message?.conversation?.id);

export const getMessageText = (message) => message?.message || message?.text || '';

export const normalizeMessage = (message) => ({
  ...message,
  id: message?.id ?? `${Date.now()}-${Math.random()}`,
  message: getMessageText(message),
  conversation_id: getMessageConversationId(message),
  sender: message?.sender || {
    id: message?.sender_id,
    username: message?.sender_username,
    avatar_url: message?.sender_avatar_url,
  },
});

export const sortMessages = (messages) =>
  [...messages].sort((a, b) => new Date(a.created_at || 0) - new Date(b.created_at || 0));

export const formatTime = (value) => {
  if (!value) return '';

  return new Intl.DateTimeFormat('uz-UZ', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value));
};

export const formatLastSeen = (value) => {
  if (!value) return 'Oxirgi aktiv vaqti yoq';

  return new Intl.DateTimeFormat('uz-UZ', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value));
};
