
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
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
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize auth state from stored token
    const initializeAuth = async () => {
      try {
        const userData = await getCurrentUser();
        if (userData) {
          setUser(userData);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        // Clear invalid token if present
        localStorage.removeItem('token');
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);

    try {
      const result = await signIn(email, password);
      if (result) {
        localStorage.setItem("token", result.access_token);
        setUser(result.user);
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

  const register = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);

    try {
      const result = await signUp(email, password);
      if (result) {
        localStorage.setItem('token', result.access_token);
        setUser(result.user);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await signOut();
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
      // Still clear local state even if backend call fails
      localStorage.removeItem('token');
      setUser(null);
    }
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
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
