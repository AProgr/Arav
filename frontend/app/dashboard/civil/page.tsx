'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { api, Civil } from '../../lib/api';

export default function CivilListPage() {
  const [rows, setRows] = useState<Civil[]>([]);
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.civil.getAll()
      .then(setRows)
      .catch((e) => setError(e instanceof Error ? e.message : 'Ачаалахад алдаа'))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return rows;
    return rows.filter((r) =>
      [r.forename, r.last_name, r.first_name, r.register_num, r.phone]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(term))
    );
  }, [rows, q]);

  const fullName = (r: Civil) =>
    [r.forename, r.last_name, r.first_name].filter(Boolean).join(' ');

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-5 gap-3 flex-wrap">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Иргэний бүртгэл</h1>
          <p className="text-sm text-gray-500 mt-1">Нийт {rows.length} бүртгэл</p>
        </div>
        <Link href="/dashboard/civil/new"
          className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700">
          + Шинэ бүртгэл
        </Link>
      </div>

      <div className="mb-4">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Нэр, регистр, утсаар хайх…"
          className="w-full sm:w-80 rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
      </div>

      {error && (
        <div className="mb-4 text-sm rounded-lg px-4 py-3 bg-red-50 text-red-700 border border-red-200">{error}</div>
      )}

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-left">
                <th className="px-4 py-3 font-medium">#</th>
                <th className="px-4 py-3 font-medium">Овог нэр</th>
                <th className="px-4 py-3 font-medium">Хүйс</th>
                <th className="px-4 py-3 font-medium">Төрсөн огноо</th>
                <th className="px-4 py-3 font-medium">Регистр</th>
                <th className="px-4 py-3 font-medium">Утас</th>
                <th className="px-4 py-3 font-medium">Бүртгэсэн</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={7} className="px-4 py-8 text-center text-gray-400">Ачаалж байна…</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={7} className="px-4 py-8 text-center text-gray-400">
                  {rows.length === 0 ? 'Бүртгэл алга. "Шинэ бүртгэл" дарж эхлүүлнэ үү.' : 'Хайлтад тохирох бүртгэл олдсонгүй.'}
                </td></tr>
              ) : (
                filtered.map((r) => (
                  <tr key={r.civil_id} className="border-t border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3 text-gray-400">{r.civil_id}</td>
                    <td className="px-4 py-3 font-medium text-gray-800">{fullName(r)}</td>
                    <td className="px-4 py-3 text-gray-600">{r.gender === 'M' ? 'Эр' : r.gender === 'F' ? 'Эм' : '—'}</td>
                    <td className="px-4 py-3 text-gray-600">{r.date_of_birth ? String(r.date_of_birth).slice(0, 10) : '—'}</td>
                    <td className="px-4 py-3 text-gray-600">{r.register_num || '—'}</td>
                    <td className="px-4 py-3 text-gray-600">{r.phone || '—'}</td>
                    <td className="px-4 py-3 text-gray-500">{r.username || '—'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
