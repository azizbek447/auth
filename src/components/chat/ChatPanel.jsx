import { useEffect, useRef, useState } from 'react';
import { FaArrowLeft, FaCheck, FaComments, FaPaperPlane, FaSyncAlt } from 'react-icons/fa';

import {
  formatLastSeen,
  formatTime,
  getConversationId,
  getMessageText,
} from '../../store/chat/utils/chatFormat';
import Avatar from './Avatar';

export default function ChatPanel({
  activeConversation,
  currentUser,
  messages,
  onBack,
  onLoadOlder,
  onSend,
  onTyping,
  readInfo,
  sending,
  typingUsers,
}) {
  const [text, setText] = useState('');
  const listRef = useRef(null);
  const activeConversationId = getConversationId(activeConversation);
  const otherUser = activeConversation?.other_user;
  const typing = typingUsers[activeConversationId];

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages.length, activeConversationId]);

  const submit = async (event) => {
    event.preventDefault();
    const value = text.trim();
    if (!value) return;

    setText('');
    await onSend(value);
  };

  if (!activeConversation) return <EmptyChat />;

  return (
    <section className='flex h-full min-h-0 flex-col bg-slate-100'>
      <ChatHeader otherUser={otherUser} onBack={onBack} onLoadOlder={onLoadOlder} />
      <MessageList
        currentUser={currentUser}
        listRef={listRef}
        messages={messages}
        otherUser={otherUser}
      />
      <MessageComposer
        readInfo={readInfo}
        sending={sending}
        text={text}
        typing={typing}
        setText={setText}
        onSubmit={submit}
        onTyping={onTyping}
      />
    </section>
  );
}

function EmptyChat() {
  return (
    <section className='grid min-h-0 place-items-center bg-slate-50 p-6'>
      <div className='max-w-md text-center'>
        <div className='mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-md bg-sky-100 text-sky-700'>
          <FaComments className='text-3xl' />
        </div>
        <h2 className='text-2xl font-black text-slate-950'>Conversation tanlang</h2>
        <p className='mt-2 text-sm leading-6 font-semibold text-slate-500'>
          Chap tomondan mavjud chatni oching yoki user qidirib yangi conversation yarating.
        </p>
      </div>
    </section>
  );
}

function ChatHeader({ otherUser, onBack, onLoadOlder }) {
  return (
    <header className='flex min-h-16 items-center justify-between gap-3 border-b border-slate-200 bg-white px-3 py-3 shadow-sm md:px-4'>
      <div className='flex min-w-0 items-center gap-2 md:gap-3'>
        <button
          type='button'
          onClick={onBack}
          className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-slate-700 transition hover:bg-slate-100 md:hidden'
          aria-label='Ortga'
        >
          <FaArrowLeft />
        </button>
        <Avatar user={otherUser} />
        <div className='min-w-0'>
          <h2 className='truncate text-base font-black text-slate-950'>
            {otherUser?.username || 'User'}
          </h2>
          <p className='truncate text-xs font-bold text-slate-500'>
            {otherUser?.is_online ? 'Online' : formatLastSeen(otherUser?.last_seen)}
          </p>
        </div>
      </div>
      <button
        type='button'
        onClick={onLoadOlder}
        className='hidden h-10 rounded-lg border border-slate-200 px-4 text-xs font-black text-slate-600 transition hover:border-sky-300 hover:text-sky-700 sm:block'
      >
        Oldingi xabarlar
      </button>
    </header>
  );
}

function MessageList({ currentUser, listRef, messages, otherUser }) {
  return (
    <div
      ref={listRef}
      className='min-h-0 flex-1 overflow-y-auto bg-[radial-gradient(circle_at_top_left,#e0f2fe_0,#f8fafc_34%,#f1f5f9_100%)] px-3 py-4 md:px-6 md:py-6'
    >
      <div className='mx-auto flex w-full max-w-5xl flex-col gap-3'>
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            currentUser={currentUser}
            message={message}
            otherUser={otherUser}
          />
        ))}

        {!messages.length && (
          <div className='rounded-md bg-white p-6 text-center text-sm font-bold text-slate-500'>
            Birinchi xabarni yuboring.
          </div>
        )}
      </div>
    </div>
  );
}

function MessageBubble({ currentUser, message, otherUser }) {
  const mine = Number(message.sender_id || message.sender?.id) === Number(currentUser?.id);

  return (
    <div className={`flex ${mine ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[86%] rounded-2xl px-4 py-3 shadow-sm md:max-w-[68%] ${
          mine
            ? 'rounded-br-md bg-sky-600 text-white shadow-sky-200'
            : 'rounded-bl-md bg-white text-slate-900 ring-1 ring-slate-200'
        }`}
      >
        {!mine && (
          <p className='mb-1 text-xs font-black text-sky-700'>
            {message.sender?.username || message.sender_username || otherUser?.username}
          </p>
        )}
        <p className='text-sm leading-6 font-semibold break-words whitespace-pre-wrap'>
          {getMessageText(message)}
        </p>
        <div
          className={`mt-2 flex items-center justify-end gap-2 text-[11px] font-bold ${
            mine ? 'text-sky-100' : 'text-slate-400'
          }`}
        >
          <span>{formatTime(message.created_at)}</span>
          {mine && (
            <span className='inline-flex items-center gap-1'>
              <FaCheck />
              {message.is_read ? 'read' : 'sent'}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function MessageComposer({ readInfo, sending, setText, text, typing, onSubmit, onTyping }) {
  return (
    <footer className='border-t border-slate-200 bg-white px-3 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] md:px-6 md:py-4'>
      <div className='mx-auto max-w-5xl'>
        <div className='mb-2 min-h-5 px-1 text-xs font-bold text-slate-500'>
          {typing
            ? `${typing.username || 'User'} yozmoqda...`
            : readInfo
              ? `Oqildi: ${readInfo.read_count}`
              : ''}
        </div>
        <form onSubmit={onSubmit} className='flex items-end gap-2 md:gap-3'>
          <textarea
            value={text}
            onChange={(event) => {
              setText(event.target.value);
              onTyping(event.target.value);
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault();
                onSubmit(event);
              }
            }}
            rows={1}
            className='max-h-32 min-h-12 flex-1 resize-none rounded-2xl border border-slate-300 px-4 py-3 text-sm font-semibold transition outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-100'
            placeholder='Xabar yozing...'
          />
          <button
            type='submit'
            disabled={sending || !text.trim()}
            className='flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sky-600 text-white shadow-lg shadow-sky-200 transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-60'
            title='Yuborish'
          >
            {sending ? <FaSyncAlt className='animate-spin' /> : <FaPaperPlane />}
          </button>
        </form>
      </div>
    </footer>
  );
}
