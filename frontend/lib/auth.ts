interface User {
  id: string;
  email: string;
}


const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:7860"; // Use env var or fallback to localhost

// Sign in
export async function signIn(email: string, password: string) {
  const res = await fetch(`${API_URL}/api/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) throw new Error('Login failed');

  const data = await res.json();
  localStorage.setItem('token', data.data.access_token);
  return data.data;
}

// Sign up
export async function signUp(email: string, password: string) {
  const res = await fetch(`${API_URL}/api/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) throw new Error('Register failed');

  const data = await res.json();
  localStorage.setItem('token', data.data.access_token);
  return data.data;
}

// ✅ SIGN OUT (MUST EXIST)
export function signOut() {
  localStorage.removeItem('token');
}

// CURRENT USER
export async function getCurrentUser(): Promise<User | null> {
  const token = localStorage.getItem('token');
  if (!token) return null;

  const res = await fetch(`${API_URL}/api/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) return null;

  const data = await res.json();
  return data.data;
}

