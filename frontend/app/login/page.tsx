'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '../lib/api';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.BaseSyntheticEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await api.login(username, password);
      localStorage.setItem('token', data.token);
      localStorage.setItem('username', data.username);
      localStorage.setItem('user_id', String(data.user_id));
      router.push('/dashboard');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Нэвтрэхэд алдаа гарлаа');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundColor: '#080808',
        backgroundImage: `
          linear-gradient(rgba(163,255,80,0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(163,255,80,0.05) 1px, transparent 1px)
        `,
        backgroundSize: '44px 44px',
      }}
    >
    <div
      className="flex flex-col overflow-hidden"
      style={{
        width: '320px',
        height: '620px',
        borderRadius: '32px',
        border: '1.5px solid rgba(163,255,80,0.2)',
        boxShadow: '0 0 60px rgba(163,255,80,0.08), 0 24px 80px rgba(0,0,0,0.6)',
        backgroundColor: '#0d0d0d',
        backgroundImage: `
          linear-gradient(rgba(163,255,80,0.07) 1px, transparent 1px),
          linear-gradient(90deg, rgba(163,255,80,0.07) 1px, transparent 1px)
        `,
        backgroundSize: '44px 44px',
      }}
    >
      {/* Logo area */}
      <div className="flex-1 flex flex-col items-center justify-center gap-4 px-6 pt-16 pb-6">
        <div
          className="w-20 h-20 flex items-center justify-center"
          style={{ filter: 'drop-shadow(0 0 16px rgba(163,255,80,0.5))' }}
        >
          <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
            <rect x="6" y="6" width="38" height="60" rx="5" stroke="#a3ff50" strokeWidth="2.5" fill="none"/>
            <path d="M44 36h22M56 24l10 12-10 12" stroke="#a3ff50" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="38" cy="36" r="2.5" fill="#a3ff50"/>
          </svg>
        </div>
        <div className="text-center">
          <h1 className="text-white text-3xl font-bold tracking-tight">Arav</h1>
          <p className="text-sm mt-1" style={{ color: '#6b7280' }}>
            Мэдээлэл оруулах · Хайх · Тайлан
          </p>
        </div>
      </div>

      {/* Bottom card */}
      <div
        className="w-full rounded-t-3xl px-6 pt-8 pb-10"
        style={{ backgroundColor: '#161616' }}
      >
        {/* drag handle */}
        <div className="flex justify-center mb-6">
          <div className="w-10 h-1 rounded-full" style={{ backgroundColor: '#2a2a2a' }} />
        </div>

        <h2 className="text-white text-xl font-bold mb-1">Нэвтрэх</h2>
        <p className="text-sm mb-6" style={{ color: '#6b7280' }}>
          Системд нэвтэрч ажиллана уу
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {/* Username */}
          <div className="relative">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Нэвтрэх нэр"
              className="w-full rounded-xl px-4 py-3.5 pr-12 text-sm text-white placeholder-gray-600 outline-none transition-all"
              style={{
                backgroundColor: '#0f0f0f',
                border: '1px solid #2a2a2a',
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = '#a3ff50')}
              onBlur={(e) => (e.currentTarget.style.borderColor = '#2a2a2a')}
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2" style={{ color: '#4b5563' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </span>
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type={showPw ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Нууц үг"
              className="w-full rounded-xl px-4 py-3.5 pr-12 text-sm text-white placeholder-gray-600 outline-none transition-all"
              style={{
                backgroundColor: '#0f0f0f',
                border: '1px solid #2a2a2a',
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = '#a3ff50')}
              onBlur={(e) => (e.currentTarget.style.borderColor = '#2a2a2a')}
            />
            <button
              type="button"
              onClick={() => setShowPw(!showPw)}
              className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors"
              style={{ color: '#4b5563' }}
            >
              {showPw ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>

          {error && (
            <p
              className="text-xs text-center rounded-xl px-4 py-2.5"
              style={{ color: '#f87171', backgroundColor: 'rgba(239,68,68,0.1)' }}
            >
              {error}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="mt-1 w-full rounded-2xl py-4 text-sm font-bold text-black transition-all active:scale-95 disabled:opacity-50"
            style={{
              backgroundColor: '#a3ff50',
              boxShadow: '0 0 20px rgba(163,255,80,0.3)',
            }}
          >
            {loading ? 'Нэвтэрж байна...' : 'Нэвтрэх'}
          </button>
        </form>
      </div>
    </div>
    </div>
  );
}
