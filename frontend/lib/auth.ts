// Actual authentication functions that call the backend API

interface User {
  id: string;
  email: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL + "/api";

export async function signIn(email: string, password: string): Promise<{ access_token: string; user: User } | null> {
  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({ detail: "Login failed" }));
      throw new Error(errorData.detail || "Login failed");
    }

    const data = await res.json();
    return data.data; // Return the response data which contains access_token and user
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}

export async function signUp(email: string, password: string): Promise<{ access_token: string; user: User } | null> {
  try {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({ detail: "Registration failed" }));
      throw new Error(errorData.detail || "Registration failed");
    }

    const data = await res.json();
    return data.data; // Return the response data which contains access_token and user
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
}

export async function signOut(): Promise<void> {
  // Clear the stored token
  localStorage.removeItem("token");
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      return null;
    }

    const res = await fetch(`${API_URL}/auth/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      if (res.status === 401) {
        // Token is invalid, remove it
        localStorage.removeItem("token");
      }
      return null;
    }

    const data = await res.json();
    return data.data; // Return user data
  } catch (error) {
    console.error("Get current user error:", error);
    return null;
  }
}

// Function to attach auth headers to API requests
export function getAuthHeaders(): Record<string, string> {
  const token = localStorage.getItem("token");
  if (!token) {
    return {};
  }

  return {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
  };
}