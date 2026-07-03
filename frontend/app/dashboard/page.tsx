'use client';

import { useEffect, useState } from 'react';

export default function DashboardHome() {
  const [username, setUsername] = useState('');

  useEffect(() => {
    setUsername(localStorage.getItem('username') || '');
  }, []);

  const stats = [
    { label: 'Нийт иргэн', value: '—', hint: 'Бүртгэлийн тоо' },
    { label: 'Идэвхтэй', value: '—', hint: 'Идэвхтэй бүртгэл' },
    { label: 'Даргын тоо', value: '—', hint: '10/100/1000-ын дарга' },
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Тавтай морил{username ? `, ${username}` : ''} 👋
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Arav — Мэдээлэл оруулах · Хайх · Тайлан гаргах систем
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-white rounded-xl border border-gray-200 p-5"
          >
            <p className="text-sm text-gray-500">{s.label}</p>
            <p className="text-3xl font-bold text-gray-800 mt-2">{s.value}</p>
            <p className="text-xs text-gray-400 mt-1">{s.hint}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-white rounded-xl border border-gray-200 p-5">
        <h2 className="text-base font-semibold text-gray-800 mb-2">Эхлэх</h2>
        <p className="text-sm text-gray-500">
          Зүүн дээрх цэснээс <span className="font-medium text-gray-700">Иргэний бүртгэл</span> руу орж
          мэдээлэл нэмэх, хайх боломжтой.
        </p>
      </div>
    </div>
  );
}
