const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token');
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers as Record<string, string> || {}),
    },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(err.message || 'Алдаа гарлаа');
  }
  return res.json();
}

export interface Civil {
  civil_id: number;
  user_id?: number;
  parent_civil_id?: number;

  forename?: string;
  last_name: string;
  first_name: string;
  gender: 'M' | 'F';
  date_of_birth: string;
  register_num?: string;
  registered_num?: string;

  phone?: string;
  email?: string;
  secondary_phone?: string;
  emergency_phone?: string;

  id_card_num?: string;
  blood_type?: string;
  ethnicity_code?: string;
  nationality_code?: string;
  birth_place_code?: string;
  marital_status_code?: string;
  photo_url?: string;

  father_name?: string;
  mother_name?: string;
  spouse_name?: string;
  children_count?: number;

  addr_aimag_city_code?: string;
  addr_soum_district_code?: string;
  addr_bag_khorro_code?: string;
  addr_detail?: string;

  edu_level_code?: string;
  edu_profession_code?: string;
  org_code?: string;
  emp_position_code?: string;
  social_status_code?: string;
  disability_code?: string;
  military_status_code?: string;
  income_level_code?: string;

  is_leaf?: string;
  leader_code?: string;
  username?: string;
  status?: string;
}

export interface LuItem {
  code: string;
  name: string;
  parent_code?: string | null;
}

export interface AuthResponse {
  token: string;
  user_id: number;
  username: string;
  roles: string[];
}

export const api = {
  login: (username: string, password: string) =>
    request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    }),

  civil: {
    getAll: () => request<Civil[]>('/civil'),
    getById: (id: number) => request<Civil>(`/civil/${id}`),
    search: (q: string) =>
      request<Civil[]>(`/civil/search?q=${encodeURIComponent(q)}`),
    create: (data: Partial<Civil>) =>
      request<Civil>('/civil', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: number, data: Partial<Civil>) =>
      request<Civil>(`/civil/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    deactivate: (id: number) =>
      request<{ message: string }>(`/civil/${id}/deactivate`, { method: 'PATCH' }),
  },

  lookup: (name: string, parent?: string) =>
    request<LuItem[]>(
      `/lookup/${name}${parent !== undefined ? `?parent=${encodeURIComponent(parent)}` : ''}`
    ),
};
