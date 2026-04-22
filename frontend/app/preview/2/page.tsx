'use client';
import { useState } from 'react';

export default function Preview2() {
  const [pw, setPw] = useState('');
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-indigo-600 to-indigo-500">
      {/* Top branding */}
      <div className="flex-1 flex flex-col items-center justify-center gap-4 pt-16 pb-8">
        <div className="w-20 h-20 rounded-3xl bg-white/20 backdrop-blur flex items-center justify-center shadow-xl">
          <span className="text-white text-4xl font-bold">А</span>
        </div>
        <h1 className="text-white text-3xl font-bold tracking-tight">Arav</h1>
        <p className="text-indigo-200 text-sm">Мэдээлэл оруулах · Хайх · Тайлан</p>
      </div>

      {/* Bottom sheet form */}
      <div className="bg-white rounded-t-3xl shadow-2xl px-6 pt-8 pb-10">
        <h2 className="text-lg font-bold text-gray-800 mb-6">Нэвтрэх</h2>
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1.5">НЭВТРЭХ НЭР</label>
            <input className="w-full border-b-2 border-gray-200 focus:border-indigo-500 py-2.5 text-sm outline-none bg-transparent transition-colors" placeholder="Нэвтрэх нэрээ оруулна уу" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1.5">НУУЦ ҮГ</label>
            <input type="password" value={pw} onChange={e=>setPw(e.target.value)} className="w-full border-b-2 border-gray-200 focus:border-indigo-500 py-2.5 text-sm outline-none bg-transparent transition-colors" placeholder="••••••••" />
          </div>
          <button className="mt-4 w-full bg-indigo-600 text-white rounded-2xl py-4 text-sm font-bold shadow-lg hover:bg-indigo-700 active:scale-95 transition-all">
            Нэвтрэх
          </button>
        </div>
      </div>
    </div>
  );
}
