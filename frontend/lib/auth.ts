
// auth.ts
interface User {
  id: string;
  email: string;
}

// Sign in function
export async function signIn(email: string, password: string): Promise<{ token: string; user: User } | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(errorText || 'Login failed');
    }

    const data = await res.json();
    localStorage.setItem('access_token', data.token); // token store
    return data;
  } catch (err) {
    console.error('SignIn Error:', err);
    return null;
  }
}

// Sign up function
export async function signUp(email: string, password: string): Promise<{ token: string; user: User } | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(errorText || 'Register failed');
    }

    const data = await res.json();
    localStorage.setItem('access_token', data.token); // token store
    return data;
  } catch (err) {
    console.error('SignUp Error:', err);
    return null;
  }
}

// Logout
export function logout() {
  localStorage.removeItem('access_token');
}


// auth.ts ke end me add 
export function getAuthHeaders(): { [key: string]: string } {
  const token = localStorage.getItem('access_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}



