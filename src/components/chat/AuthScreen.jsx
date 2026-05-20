import { useEffect, useState } from 'react';
import { FaCircle, FaComments, FaSyncAlt, FaUser } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';

import { CHAT_API_URL } from '../../services/axios/chat.axios';
import { checkHealthQuery, loginQuery, registerQuery } from '../../store/chat/auth/auth.query';

export default function AuthScreen() {
  const dispatch = useDispatch();
  const { error, health, loading } = useSelector((state) => state.chatAuth);
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const isRegister = mode === 'register';

  useEffect(() => {
    dispatch(checkHealthQuery());
  }, [dispatch]);

  const submit = (event) => {
    event.preventDefault();

    if (isRegister) {
      dispatch(registerQuery(form));
      return;
    }

    dispatch(loginQuery({ email: form.email, password: form.password }));
  };

  return (
    <main className='grid min-h-screen place-items-center bg-slate-100 px-4 py-10'>
      <div className='w-full max-w-md rounded-md border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/80'>
        <div className='mb-6 flex items-center gap-3'>
          <div className='flex h-12 w-12 items-center justify-center rounded-md bg-sky-600 text-white'>
            <FaComments className='text-xl' />
          </div>
          <div>
            <h1 className='text-2xl font-black text-slate-950'>Realtime Chat</h1>
            <p className='text-sm font-semibold text-slate-500'>{CHAT_API_URL}</p>
          </div>
        </div>

        <div className='mb-5 flex rounded-md border border-slate-200 p-1'>
          {[
            ['login', 'Login'],
            ['register', 'Register'],
          ].map(([key, label]) => (
            <button
              key={key}
              type='button'
              onClick={() => setMode(key)}
              className={`h-10 flex-1 rounded text-sm font-black transition ${
                mode === key ? 'bg-slate-950 text-white' : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <form onSubmit={submit} className='grid gap-4'>
          {isRegister && (
            <AuthInput
              label='Username'
              value={form.username}
              placeholder='ali'
              onChange={(username) => setForm((current) => ({ ...current, username }))}
            />
          )}
          <AuthInput
            label='Email'
            type='email'
            value={form.email}
            placeholder='ali@example.com'
            onChange={(email) => setForm((current) => ({ ...current, email }))}
          />
          <AuthInput
            label='Password'
            type='password'
            value={form.password}
            placeholder='123456'
            onChange={(password) => setForm((current) => ({ ...current, password }))}
          />

          {error && (
            <p className='rounded-md bg-red-50 px-4 py-3 text-sm font-bold text-red-700'>{error}</p>
          )}

          <button
            type='submit'
            disabled={loading}
            className='inline-flex h-12 items-center justify-center gap-2 rounded-md bg-sky-600 px-5 text-sm font-black text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-60'
          >
            {loading ? <FaSyncAlt className='animate-spin' /> : <FaUser />}
            {isRegister ? 'Royxatdan otish' : 'Kirish'}
          </button>
        </form>

        <div className='mt-5 flex items-center justify-between rounded-md bg-slate-50 px-4 py-3 text-xs font-bold text-slate-500'>
          <span className='inline-flex items-center gap-2'>
            <FaCircle className={health?.ok ? 'text-emerald-500' : 'text-red-500'} />
            {health?.service || 'chat-backend'}
          </span>
          <button
            type='button'
            onClick={() => dispatch(checkHealthQuery())}
            className='text-sky-700 hover:text-sky-900'
          >
            Health
          </button>
        </div>
      </div>
    </main>
  );
}

function AuthInput({ label, type = 'text', value, placeholder, onChange }) {
  return (
    <label className='grid gap-2 text-sm font-bold text-slate-700'>
      {label}
      <input
        required
        type={type}
        minLength={type === 'password' ? 6 : undefined}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className='h-12 rounded-md border border-slate-300 px-4 transition outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-100'
        placeholder={placeholder}
      />
    </label>
  );
}
