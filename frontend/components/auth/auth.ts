// auth.ts
const API_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  'https://amberofficial-todo.hf.space';

// ================= SIGN IN =================
export async function signIn(email: string, password: string) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) return null;

  const data: { token: string; user: { id: string; email: string } } =
    await res.json();

  // ✅ ONE STANDARD TOKEN NAME
  localStorage.setItem('token', data.token);

  return data;
}

// ================= SIGN UP =================
export async function signUp(email: string, password: string) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) return null;

  const data = await res.json();

  // ✅ SAME TOKEN NAME
  localStorage.setItem('token', data.token);

  return data;
}

// ================= AUTH HEADERS =================
export function getAuthHeaders(): Record<string, string> {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// ================= LOGOUT =================
export function signOut() {
  localStorage.removeItem('token');
}
