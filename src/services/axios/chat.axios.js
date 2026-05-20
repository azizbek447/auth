import axios from 'axios';

const trimTrailingSlash = (value = '') => String(value).replace(/\/+$/, '');

export const CHAT_API_URL = trimTrailingSlash(
  import.meta.env.VITE_API_URL ||
    import.meta.env.VITE_REACT_API_URL ||
    import.meta.env.REACT_APP_API_URL ||
    'http://localhost:5000'
);

export const CHAT_SOCKET_URL = trimTrailingSlash(
  import.meta.env.VITE_SOCKET_URL ||
    import.meta.env.VITE_REACT_SOCKET_URL ||
    import.meta.env.REACT_APP_SOCKET_URL ||
    CHAT_API_URL ||
    'http://localhost:5000'
);

const STORAGE_KEYS = {
  accessToken: 'chat_access_token',
  refreshToken: 'chat_refresh_token',
  user: 'chat_user',
};

export const getStoredChatSession = () => {
  try {
    const user = localStorage.getItem(STORAGE_KEYS.user);

    return {
      accessToken: localStorage.getItem(STORAGE_KEYS.accessToken) || '',
      refreshToken: localStorage.getItem(STORAGE_KEYS.refreshToken) || '',
      user: user ? JSON.parse(user) : null,
    };
  } catch {
    return { accessToken: '', refreshToken: '', user: null };
  }
};

export const saveChatSession = ({ accessToken, refreshToken, user }) => {
  if (accessToken) localStorage.setItem(STORAGE_KEYS.accessToken, accessToken);
  if (refreshToken) localStorage.setItem(STORAGE_KEYS.refreshToken, refreshToken);
  if (user) localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(user));
};

export const clearChatSession = () => {
  localStorage.removeItem(STORAGE_KEYS.accessToken);
  localStorage.removeItem(STORAGE_KEYS.refreshToken);
  localStorage.removeItem(STORAGE_KEYS.user);
};

const chatAxios = axios.create({
  baseURL: CHAT_API_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 30000,
  withCredentials: true,
});

chatAxios.interceptors.request.use((config) => {
  const token = getStoredChatSession().accessToken;

  if (token && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

chatAxios.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;
    const url = String(originalRequest?.url || '');
    const isRefreshRequest = url.includes('/api/auth/refresh');
    const isAuthEntryRequest =
      url.includes('/api/auth/login') || url.includes('/api/auth/register');

    if (status === 401 && !originalRequest?._retry && !isRefreshRequest && !isAuthEntryRequest) {
      const refreshToken = getStoredChatSession().refreshToken;

      if (refreshToken) {
        originalRequest._retry = true;
        try {
          const session = await axios.post(
            `${CHAT_API_URL}/api/auth/refresh`,
            { refreshToken },
            { withCredentials: true }
          );

          saveChatSession(session.data);
          originalRequest.headers.Authorization = `Bearer ${session.data.accessToken}`;

          return chatAxios(originalRequest);
        } catch {
          clearChatSession();
        }
      }
    }

    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      'Server bilan aloqa qilishda xatolik';

    return Promise.reject({ message, status, data: error.response?.data });
  }
);

class ChatAPIClient {
  health = () => chatAxios.get('/api/health');

  register = (data) => chatAxios.post('/api/auth/register', data);
  login = (data) => chatAxios.post('/api/auth/login', data);
  me = () => chatAxios.get('/api/auth/me');
  refresh = (refreshToken) =>
    chatAxios.post('/api/auth/refresh', refreshToken ? { refreshToken } : {});
  logout = (refreshToken) =>
    chatAxios.post('/api/auth/logout', refreshToken ? { refreshToken } : {});

  searchUsers = (query) => chatAxios.get('/api/users/search', { params: { q: query } });
  getUser = (id) => chatAxios.get(`/api/users/${id}`);

  getConversations = () => chatAxios.get('/api/conversations');
  createConversation = (userId) => chatAxios.post('/api/conversations', { userId });

  getMessages = (conversationId, params = {}, config = {}) =>
    chatAxios.get(`/api/messages/${conversationId}`, { ...config, params });

  createMessage = (conversationId, message) =>
    chatAxios.post(`/api/messages/${conversationId}`, { message });

  createMessageAlt = (conversationId, text) =>
    chatAxios.post('/api/messages', { conversationId, text });

  markRead = (conversationId) => chatAxios.patch(`/api/messages/read/${conversationId}`);
}

export const chatRequest = new ChatAPIClient();
