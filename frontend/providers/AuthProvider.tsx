'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { signIn, signUp } from '../components/auth/auth';

/* ================= TYPES ================= */

interface User {
  id: string;
  email: string;
}

/* 🔥 backend ke exact response ke mutabiq */
interface AuthResponse {
  token: string;
  user: User;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

/* ================= CONTEXT ================= */

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/* ================= PROVIDER ================= */

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  /* ---------- INIT ---------- */
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser({ id: 'temp', email: 'logged-in-user' });
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  /* ---------- LOGIN ---------- */
  const login = async (
    email: string,
    password: string
  ): Promise<boolean> => {
    setIsLoading(true);
    try {
      const result = await signIn(email, password);

      if (result && result.token && result.user) {
        localStorage.setItem('token', result.token);
        setUser(result.user);
        setIsAuthenticated(true);
        return true;
      }

      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  /* ---------- REGISTER ---------- */
  const register = async (
    email: string,
    password: string
  ): Promise<boolean> => {
    setIsLoading(true);
    try {
      const result = await signUp(email, password);

      if (result && result.token && result.user) {
        localStorage.setItem('token', result.token);
        setUser(result.user);
        setIsAuthenticated(true);
        return true;
      }

      return false;
    } catch (error) {
      console.error('Register error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  /* ---------- LOGOUT ---------- */
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/* ================= HOOK ================= */

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return ctx;
}
