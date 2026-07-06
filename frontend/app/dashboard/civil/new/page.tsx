'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { api, Civil, LuItem } from '../../../lib/api';

type FormState = Partial<Civil>;

// Ачаалах энгийн (шаталсан биш) лавлахууд
const SIMPLE_LOOKUPS = [
  'ethnicity', 'nationality', 'birth_place', 'marital_status',
  'aimag_city', 'edu_level', 'edu_profession', 'org',
  'emp_position', 'social_status', 'disability', 'military_status',
  'income_level', 'leader_type',
] as const;

export default function NewCivilPage() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>({ gender: undefined });
  const [lu, setLu] = useState<Record<string, LuItem[]>>({});
  const [soums, setSoums] = useState<LuItem[]>([]);
  const [bags, setBags] = useState<LuItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Бүх энгийн лавлахыг эхэнд ачаалах
  useEffect(() => {
    Promise.all(SIMPLE_LOOKUPS.map((n) => api.lookup(n).then((rows) => [n, rows] as const)))
      .then((pairs) => setLu(Object.fromEntries(pairs)))
      .catch((e) => setError(e instanceof Error ? e.message : 'Лавлах ачаалахад алдаа'));
  }, []);

  function set<K extends keyof Civil>(key: K, value: Civil[K] | '') {
    setForm((f) => ({ ...f, [key]: value === '' ? undefined : value }));
  }

  // Аймаг сонгоход сум ачаалах
  async function onAimagChange(code: string) {
    set('addr_aimag_city_code', code);
    set('addr_soum_district_code', '');
    set('addr_bag_khorro_code', '');
    setBags([]);
    if (code) {
      try { setSoums(await api.lookup('soum_district', code)); } catch { setSoums([]); }
    } else setSoums([]);
  }

  // Сум сонгоход хороо ачаалах
  async function onSoumChange(code: string) {
    set('addr_soum_district_code', code);
    set('addr_bag_khorro_code', '');
    if (code) {
      try { setBags(await api.lookup('bag_khoroo', code)); } catch { setBags([]); }
    } else setBags([]);
  }

  async function handleSubmit(e: React.BaseSyntheticEvent) {
    e.preventDefault();
    setError('');
    if (!form.last_name || !form.first_name || !form.gender || !form.date_of_birth) {
      setError('Овог, нэр, хүйс, төрсөн огноог заавал бөглөнө үү');
      return;
    }
    setLoading(true);
    try {
      const user_id = Number(localStorage.getItem('user_id')) || undefined;
      await api.civil.create({ ...form, user_id });
      setSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Бүртгэхэд алдаа гарлаа');
    } finally {
      setLoading(false);
    }
  }

  function resetForm() {
    setForm({ gender: undefined });
    setSoums([]);
    setBags([]);
    setSuccess(false);
  }

  if (success) {
    return (
      <div className="max-w-md mx-auto mt-10 bg-white rounded-xl border border-gray-200 p-8 text-center">
        <div className="w-14 h-14 mx-auto rounded-full bg-green-100 flex items-center justify-center text-2xl">✓</div>
        <h2 className="text-lg font-bold text-gray-800 mt-4">Амжилттай бүртгэгдлээ</h2>
        <p className="text-sm text-gray-500 mt-1">Иргэний мэдээлэл хадгалагдлаа.</p>
        <div className="flex gap-2 justify-center mt-6">
          <button onClick={resetForm} className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700">
            Дахин бүртгэх
          </button>
          <Link href="/dashboard" className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50">
            Нүүр рүү
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-5">
        <h1 className="text-xl font-bold text-gray-800">Шинэ иргэн бүртгэх</h1>
        <p className="text-sm text-gray-500 mt-1">Хувь хүний мэдээллийг бөглөнө үү. (*) талбар заавал.</p>
      </div>

      {error && (
        <div className="mb-4 text-sm rounded-lg px-4 py-3 bg-red-50 text-red-700 border border-red-200">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Үндсэн мэдээлэл */}
        <Section title="Үндсэн мэдээлэл">
          <Input label="Ургийн овог" value={form.forename} onChange={(v) => set('forename', v)} />
          <Input label="Овог *" value={form.last_name} onChange={(v) => set('last_name', v)} />
          <Input label="Нэр *" value={form.first_name} onChange={(v) => set('first_name', v)} />
          <Select label="Хүйс *" value={form.gender} onChange={(v) => set('gender', v as 'M' | 'F')}
            options={[{ code: 'M', name: 'Эрэгтэй' }, { code: 'F', name: 'Эмэгтэй' }]} />
          <Input label="Төрсөн огноо *" type="date" value={form.date_of_birth} onChange={(v) => set('date_of_birth', v)} />
          <Input label="Регистрийн дугаар" value={form.register_num} onChange={(v) => set('register_num', v)} />
          <Input label="Иргэний үнэмлэхний дугаар" value={form.id_card_num} onChange={(v) => set('id_card_num', v)} />
          <Input label="Системийн дугаар (гишүүний)" value={form.registered_num} onChange={(v) => set('registered_num', v)} />
        </Section>

        {/* Холбоо барих */}
        <Section title="Холбоо барих">
          <Input label="Утас" value={form.phone} onChange={(v) => set('phone', v)} />
          <Input label="Нэмэлт утас" value={form.secondary_phone} onChange={(v) => set('secondary_phone', v)} />
          <Input label="Яаралтай үед" value={form.emergency_phone} onChange={(v) => set('emergency_phone', v)} />
          <Input label="Имэйл" type="email" value={form.email} onChange={(v) => set('email', v)} />
        </Section>

        {/* Хувийн мэдээлэл */}
        <Section title="Хувийн мэдээлэл">
          <Select label="Үндэс угсаа" value={form.ethnicity_code} onChange={(v) => set('ethnicity_code', v)} options={lu.ethnicity} />
          <Select label="Иргэншил" value={form.nationality_code} onChange={(v) => set('nationality_code', v)} options={lu.nationality} />
          <Select label="Төрсөн газар" value={form.birth_place_code} onChange={(v) => set('birth_place_code', v)} options={lu.birth_place} />
          <Select label="Гэр бүлийн байдал" value={form.marital_status_code} onChange={(v) => set('marital_status_code', v)} options={lu.marital_status} />
          <Input label="Цусны бүлэг" value={form.blood_type} onChange={(v) => set('blood_type', v)} />
        </Section>

        {/* Гэр бүл */}
        <Section title="Гэр бүл">
          <Input label="Эцгийн нэр" value={form.father_name} onChange={(v) => set('father_name', v)} />
          <Input label="Эхийн нэр" value={form.mother_name} onChange={(v) => set('mother_name', v)} />
          <Input label="Хамтрагчийн нэр" value={form.spouse_name} onChange={(v) => set('spouse_name', v)} />
          <Input label="Хүүхдийн тоо" type="number" value={form.children_count?.toString()} onChange={(v) => set('children_count', v === '' ? '' : Number(v))} />
        </Section>

        {/* Хаяг */}
        <Section title="Хаяг">
          <Select label="Аймаг / нийслэл" value={form.addr_aimag_city_code} onChange={onAimagChange} options={lu.aimag_city} />
          <Select label="Сум / дүүрэг" value={form.addr_soum_district_code} onChange={onSoumChange} options={soums} disabled={!form.addr_aimag_city_code} />
          <Select label="Баг / хороо" value={form.addr_bag_khorro_code} onChange={(v) => set('addr_bag_khorro_code', v)} options={bags} disabled={!form.addr_soum_district_code} />
          <Input label="Дэлгэрэнгүй хаяг" value={form.addr_detail} onChange={(v) => set('addr_detail', v)} full />
        </Section>

        {/* Боловсрол / Ажил */}
        <Section title="Боловсрол / Ажил эрхлэлт">
          <Select label="Боловсролын зэрэг" value={form.edu_level_code} onChange={(v) => set('edu_level_code', v)} options={lu.edu_level} />
          <Select label="Мэргэжил" value={form.edu_profession_code} onChange={(v) => set('edu_profession_code', v)} options={lu.edu_profession} />
          <Select label="Байгууллага" value={form.org_code} onChange={(v) => set('org_code', v)} options={lu.org} />
          <Select label="Албан тушаал" value={form.emp_position_code} onChange={(v) => set('emp_position_code', v)} options={lu.emp_position} />
          <Select label="Нийгмийн байдал" value={form.social_status_code} onChange={(v) => set('social_status_code', v)} options={lu.social_status} />
          <Select label="Орлогын түвшин" value={form.income_level_code} onChange={(v) => set('income_level_code', v)} options={lu.income_level} />
          <Select label="Хөгжлийн бэрхшээл" value={form.disability_code} onChange={(v) => set('disability_code', v)} options={lu.disability} />
          <Select label="Цэргийн алба" value={form.military_status_code} onChange={(v) => set('military_status_code', v)} options={lu.military_status} />
        </Section>

        {/* Бүтэц */}
        <Section title="Бүтцийн мэдээлэл">
          <Select label="Ахлагчийн төрөл" value={form.leader_code} onChange={(v) => set('leader_code', v)} options={lu.leader_type} />
        </Section>

        <div className="flex gap-3 pt-1 pb-8">
          <button type="submit" disabled={loading}
            className="px-6 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 disabled:opacity-50">
            {loading ? 'Хадгалж байна...' : 'Бүртгэх'}
          </button>
          <Link href="/dashboard" className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50">
            Болих
          </Link>
        </div>
      </form>
    </div>
  );
}

/* ---------- Туслах компонентууд ---------- */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <h3 className="text-sm font-semibold text-gray-800 mb-4">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{children}</div>
    </div>
  );
}

function Input({ label, value, onChange, type = 'text', full = false }: {
  label: string; value?: string; onChange: (v: string) => void; type?: string; full?: boolean;
}) {
  return (
    <div className={full ? 'sm:col-span-2' : ''}>
      <label className="block text-xs font-medium text-gray-500 mb-1">{label}</label>
      <input
        type={type}
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-800 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
      />
    </div>
  );
}

function Select({ label, value, onChange, options, disabled = false }: {
  label: string; value?: string; onChange: (v: string) => void; options?: LuItem[]; disabled?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-500 mb-1">{label}</label>
      <select
        value={value ?? ''}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-800 bg-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-400"
      >
        <option value="">— сонгох —</option>
        {(options ?? []).map((o) => (
          <option key={o.code} value={o.code}>{o.name}</option>
        ))}
      </select>
    </div>
  );
}
