'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

import { signIn, signUp, signOut, getCurrentUser } from '../lib/auth';



interface User {
  id: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  
  const [user, setUser] = useState<any>(null);

  const [isLoading, setIsLoading] = useState(true);

  // 🔹 App load par token se user nikalna
  useEffect(() => {
    const initAuth = async () => {
      try {
        const tokenData = getCurrentUser();
if (tokenData) {
  setUser({
    id: "temp",
    email: "logged-in-user",
  });
}

      } catch (err) {
        localStorage.removeItem('token');
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  // ✅ LOGIN (FIXED)
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const result = await signIn(email, password);
      if (result) {
        setUser(result.user); // ✅ token already auth.ts me save ho raha
        return true;
      }
      return false;
    } catch (err) {
      console.error('Login error:', err);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ REGISTER (FIXED)
  const register = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const result = await signUp(email, password);
      if (result) {
        setUser(result.user);
        return true;
      }
      return false;
    } catch (err) {
      console.error('Register error:', err);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ LOGOUT
  const logout = () => {
    signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
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

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
