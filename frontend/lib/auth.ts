

interface User {
  id: string;
  email: string;
}

/* ================= SIGN IN ================= */
export async function signIn(
  email: string,
  password: string
): Promise<{ token: string; user: User } | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(errorText || "Login failed");
    }

    const data = await res.json();

    if (typeof window !== "undefined") {
      localStorage.setItem("access_token", data.token);
    }

    return data;
  } catch (err) {
    console.error("SignIn Error:", err);
    return null;
  }
}

/* ================= SIGN UP ================= */
export async function signUp(
  email: string,
  password: string
): Promise<{ token: string; user: User } | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(errorText || "Register failed");
    }

    const data = await res.json();

    if (typeof window !== "undefined") {
      localStorage.setItem("access_token", data.token);
    }

    return data;
  } catch (err) {
    console.error("SignUp Error:", err);
    return null;
  }
}

/* ================= SIGN OUT ================= */
export function signOut() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("access_token");
  }
}

/* ================= CURRENT USER ================= */
export function getCurrentUser() {
  if (typeof window === "undefined") return null;

  const token = localStorage.getItem("access_token");
  return token ? { token } : null;
}

/* ================= AUTH HEADERS ================= */
export function getAuthHeaders(): { [key: string]: string } {
  if (typeof window === "undefined") return {};

  const token = localStorage.getItem("access_token");
  return token ? { Authorization: `Bearer ${token}` } : {}
}
