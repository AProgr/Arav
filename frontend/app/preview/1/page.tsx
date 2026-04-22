'use client';
import { useState } from 'react';

export default function Preview1() {
  const [pw, setPw] = useState('');
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-500 p-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl p-8">
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center mb-3 shadow-lg">
            <span className="text-white text-2xl font-bold">А</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Arav</h1>
          <p className="text-sm text-gray-400 mt-1">Системд нэвтрэх</p>
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Нэвтрэх нэр</label>
            <input className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent bg-gray-50" placeholder="username" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Нууц үг</label>
            <input type="password" value={pw} onChange={e=>setPw(e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent bg-gray-50" placeholder="••••••••" />
          </div>
          <button className="mt-2 w-full bg-gradient-to-r from-indigo-500 to-blue-600 text-white rounded-xl py-3 text-sm font-semibold shadow-md hover:shadow-lg hover:opacity-95 transition-all">
            Нэвтрэх
          </button>
        </div>
      </div>
    </div>
  );
}
