import { FaComments, FaPlus, FaSearch, FaSyncAlt } from 'react-icons/fa';

import { CHAT_SOCKET_URL } from '../../services/axios/chat.axios';
import { getConversationId } from '../../store/chat/utils/chatFormat';
import Avatar from './Avatar';

export default function Sidebar({
  activeConversationId,
  conversations,
  loading,
  onCreateConversation,
  onRefresh,
  onSelect,
  onlineUsers,
  searchResults,
  searchTerm,
  setSearchTerm,
  socketStatus,
  user,
}) {
  return (
    <aside className='flex h-full min-h-0 flex-col border-r border-slate-200 bg-white'>
      <SidebarHeader
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        socketStatus={socketStatus}
        user={user}
        onRefresh={onRefresh}
      />

      {searchTerm.trim() && (
        <UserSearchResults results={searchResults} onCreateConversation={onCreateConversation} />
      )}

      <ConversationList
        activeConversationId={activeConversationId}
        conversations={conversations}
        loading={loading}
        onlineUsers={onlineUsers}
        onSelect={onSelect}
      />
    </aside>
  );
}

function SidebarHeader({ searchTerm, setSearchTerm, socketStatus, user, onRefresh }) {
  return (
    <div className='border-b border-slate-200 bg-white p-4'>
      <div className='mb-4 flex items-center justify-between gap-3'>
        <div className='flex min-w-0 items-center gap-3'>
          <Avatar user={user} />
          <div className='min-w-0'>
            <h2 className='truncate text-sm font-black text-slate-950'>{user?.username}</h2>
            <p className='truncate text-xs font-semibold text-slate-500'>{user?.email}</p>
          </div>
        </div>
        <button
          type='button'
          onClick={onRefresh}
          className='flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:border-sky-300 hover:text-sky-700'
          title='Yangilash'
        >
          <FaSyncAlt />
        </button>
      </div>

      <div className='mb-3 flex items-center gap-2 rounded-xl bg-slate-100 px-3 text-slate-500 ring-1 ring-transparent transition focus-within:bg-white focus-within:ring-sky-200'>
        <FaSearch className='shrink-0' />
        <input
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          className='h-11 min-w-0 flex-1 bg-transparent text-sm font-semibold text-slate-900 outline-none placeholder:text-slate-400'
          placeholder='User qidirish...'
        />
      </div>

      <div className='hidden items-center justify-between gap-3 text-xs font-black md:flex'>
        <span className='text-slate-500'>Socket: {socketStatus}</span>
        <span className='truncate text-slate-500'>{CHAT_SOCKET_URL}</span>
      </div>
    </div>
  );
}

function UserSearchResults({ results, onCreateConversation }) {
  return (
    <div className='border-b border-slate-200 bg-white p-3'>
      <p className='mb-2 text-xs font-black text-slate-500'>Topilgan userlar</p>
      <div className='grid max-h-48 gap-2 overflow-y-auto'>
        {results.map((item) => (
          <button
            key={item.id}
            type='button'
            onClick={() => onCreateConversation(item.id)}
            className='flex items-center gap-3 rounded-md p-2 text-left transition hover:bg-sky-50'
          >
            <Avatar user={item} />
            <span className='min-w-0 flex-1'>
              <span className='block truncate text-sm font-black text-slate-900'>
                {item.username}
              </span>
              <span className='block truncate text-xs font-semibold text-slate-500'>
                {item.email}
              </span>
            </span>
            <FaPlus className='text-sky-700' />
          </button>
        ))}

        {!results.length && (
          <p className='rounded-md bg-slate-50 px-3 py-3 text-sm font-semibold text-slate-500'>
            User topilmadi
          </p>
        )}
      </div>
    </div>
  );
}

function ConversationList({ activeConversationId, conversations, loading, onlineUsers, onSelect }) {
  return (
    <div className='min-h-0 flex-1 overflow-y-auto bg-slate-50 p-3'>
      {loading ? (
        <div className='grid gap-2'>
          {[1, 2, 3].map((item) => (
            <div key={item} className='h-20 animate-pulse rounded-md bg-slate-100' />
          ))}
        </div>
      ) : (
        <div className='grid gap-2'>
          {conversations.map((conversation) => (
            <ConversationItem
              key={conversation.id}
              active={activeConversationId === getConversationId(conversation)}
              conversation={conversation}
              onlineUsers={onlineUsers}
              onSelect={onSelect}
            />
          ))}

          {!conversations.length && (
            <div className='rounded-2xl bg-white p-6 text-center ring-1 ring-slate-200'>
              <FaComments className='mx-auto mb-3 text-3xl text-slate-300' />
              <p className='text-sm font-bold text-slate-500'>Chat boshlash uchun user qidiring.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ConversationItem({ active, conversation, onlineUsers, onSelect }) {
  const otherUser = conversation.other_user;
  const online = onlineUsers.includes(Number(otherUser?.id)) || otherUser?.is_online;
  const lastMessage =
    conversation.last_message?.message ||
    conversation.last_message?.text ||
    conversation.last_message ||
    'Hali xabar yoq';

  return (
    <button
      type='button'
      onClick={() => onSelect(conversation)}
      className={`flex w-full items-center gap-3 rounded-2xl p-3 text-left transition ${
        active ? 'bg-sky-600 text-white shadow-lg shadow-sky-200' : 'bg-white hover:bg-slate-100'
      }`}
    >
      <div className='relative'>
        <Avatar user={otherUser} />
        <span
          className={`absolute -right-0.5 -bottom-0.5 h-3 w-3 rounded-full border-2 ${
            active ? 'border-sky-600' : 'border-white'
          } ${online ? 'bg-emerald-500' : 'bg-slate-300'}`}
        />
      </div>
      <span className='min-w-0 flex-1'>
        <span className='flex items-center justify-between gap-3'>
          <span className='truncate text-sm font-black'>{otherUser?.username || 'User'}</span>
          {conversation.unread_count > 0 && (
            <span
              className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-black ${
                active ? 'bg-white text-sky-700' : 'bg-red-600 text-white'
              }`}
            >
              {conversation.unread_count}
            </span>
          )}
        </span>
        <span
          className={`mt-1 block truncate text-xs font-semibold ${active ? 'text-sky-50' : 'text-slate-500'}`}
        >
          {lastMessage}
        </span>
      </span>
    </button>
  );
}
