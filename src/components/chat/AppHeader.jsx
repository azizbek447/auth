import { FaComments, FaSignOutAlt } from 'react-icons/fa';

import { CHAT_API_URL } from '../../services/axios/chat.axios';

export default function AppHeader({ socketError, onLogout }) {
  return (
    <header className='flex h-14 shrink-0 items-center justify-between border-b border-slate-800 bg-slate-950 px-3 text-white md:px-4'>
      <div className='flex min-w-0 items-center gap-3'>
        <FaComments className='text-sky-300' />
        <span className='truncate text-sm font-black'>Realtime Chat</span>
        <span className='hidden max-w-[40vw] truncate text-xs font-bold text-slate-400 sm:inline'>
          {CHAT_API_URL}
        </span>
      </div>
      <div className='flex items-center gap-3'>
        {socketError && (
          <span className='hidden text-xs font-bold text-red-200 md:inline'>{socketError}</span>
        )}
        <button
          type='button'
          onClick={onLogout}
          className='inline-flex h-9 items-center gap-2 rounded-lg bg-white/10 px-3 text-xs font-black transition hover:bg-white/15'
        >
          <FaSignOutAlt />
          Chiqish
        </button>
      </div>
    </header>
  );
}
