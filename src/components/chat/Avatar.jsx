export default function Avatar({ user, label }) {
  const text = user?.username || user?.email || label || '?';

  return (
    <div className='flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-md bg-slate-900 text-sm font-black text-white'>
      {user?.avatar_url ? (
        <img src={user.avatar_url} alt={text} className='h-full w-full object-cover' />
      ) : (
        text.slice(0, 1).toUpperCase()
      )}
    </div>
  );
}
