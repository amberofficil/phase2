
// auth.ts
const API_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL
    ? process.env.NEXT_PUBLIC_API_BASE_URL
    : "https://amberofficial-todo.hf.space";
// Sign In
export async function signIn(email: string, password: string) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) return null;

  const data: { token: string; user: { id: string; email: string } } = await res.json();
  localStorage.setItem("access_token", data.token);
  return data;
}

// Sign Up
export async function signUp(email: string, password: string) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) return null;

  const resData = await res.json();

localStorage.setItem("token", resData.data.access_token);

return resData;


}

// Get Auth Headers for API requests
export function getAuthHeaders(): Record<string, string> {
  const token = localStorage.getItem("access_token");
  if (token) {
    return { Authorization: `Bearer ${token}` };
  }
  return {};
}

// Logout
export function signOut() {
  localStorage.removeItem("access_token");
}

