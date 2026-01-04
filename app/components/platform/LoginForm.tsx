'use client';

import { authenticate } from '../../lib/auth-actions';
import { useActionState } from 'react'; // Ganti useFormState dengan useActionState
import { useFormStatus } from 'react-dom';
import { Lock, Loader2, AlertCircle } from 'lucide-react';

export default function LoginForm() {
  // PERUBAHAN DI SINI:
  // React 19 mengubah useFormState menjadi useActionState
  // Return value-nya juga sedikit berbeda (ada isPending di index ke-2), tapi logic utamanya sama.
  const [errorMessage, dispatch, isPending] = useActionState(authenticate, undefined);

  return (
    <form action={dispatch} className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-300">Email Address</label>
        <input
          type="email"
          name="email"
          placeholder="admin@swakarsa.id"
          required
          className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all placeholder:text-slate-600"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-300">Password</label>
        <div className="relative">
          <input
            type="password"
            name="password"
            placeholder="••••••••"
            required
            className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all placeholder:text-slate-600"
          />
          <Lock size={16} className="absolute right-4 top-3.5 text-slate-500" />
        </div>
      </div>

      {/* Menampilkan Error jika login gagal */}
      {errorMessage && (
        <div className="flex items-center gap-2 text-red-400 text-sm bg-red-900/20 p-3 rounded-lg border border-red-900/50">
          <AlertCircle size={16} />
          <p>{errorMessage}</p>
        </div>
      )}

      <LoginButton />
    </form>
  );
}

// Tombol terpisah agar bisa menggunakan hook useFormStatus
function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-600/50 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2"
    >
      {pending ? (
        <>
          <Loader2 className="animate-spin" size={20} />
          Signing in...
        </>
      ) : (
        "Sign In"
      )}
    </button>
  );
}