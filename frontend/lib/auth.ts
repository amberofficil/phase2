// auth.ts
// Actual authentication functions that call the backend API

interface User {
  id: string;
  email: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL + "/api";

// Sign in user
export async function signIn(email: string, password: string): Promise<{ access_token: string; user: User } | null> {
  try {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({ detail: "Login failed" }));
      throw new Error(errorData.detail || "Login failed");
    }

    const data = await res.json();
    // Save token to localStorage
    localStorage.setItem("token", data.data.access_token);
    return data.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}

// Register user
export async function signUp(email: string, password: string): Promise<{ access_token: string; user: User } | null> {
  try {
    const res = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({ detail: "Registration failed" }));
      throw new Error(errorData.detail || "Registration failed");
    }

    const data = await res.json();
    // Save token to localStorage
    localStorage.setItem("token", data.data.access_token);
    return data.data;
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
}

// Sign out user
export async function signOut(): Promise<void> {
  localStorage.removeItem("token");
}

// Get currently authenticated user
export async function getCurrentUser(): Promise<User | null> {
  try {
    const token = localStorage.getItem("token");
    if (!token) return null;

    const res = await fetch(`${API_URL}/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      if (res.status === 401) localStorage.removeItem("token"); // Invalid token
      return null;
    }

    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Get current user error:", error);
    return null;
  }
}

// Utility to get auth headers for API requests
export function getAuthHeaders(): Record<string, string> {
  const token = localStorage.getItem("token");
  if (!token) return { "Content-Type": "application/json" };
  return {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
  };
}
