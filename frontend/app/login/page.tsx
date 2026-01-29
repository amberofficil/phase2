'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../components/ui/Card';

import { useAuth } from '../../providers/AuthProvider';

export default function LoginPage() {
  const router = useRouter();
  const { login, isAuthenticated, isLoading } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // ------------------- AUTO REDIRECT IF ALREADY LOGGED IN -------------------
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push('/my-tasks');
    }
  }, [isAuthenticated, isLoading, router]);

  // ------------------- HANDLE FORM CHANGE -------------------
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ------------------- HANDLE FORM SUBMIT -------------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const success = await login(formData.email, formData.password);

    if (success) {
      router.push('/my-tasks');
    } else {
      setError('Invalid email or password');
    }

    setLoading(false);
  };

  // ------------------- RENDER -------------------
  if (isLoading) return <p>Loading...</p>;

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl">Sign in</CardTitle>
        <CardDescription>Access your tasks</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Input
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          {error && <p className="text-sm text-red-600">{error}</p>}

          <Button type="submit" className="w-full" loading={loading}>
            Sign In
          </Button>
        </form>
      </CardContent>

      <CardFooter>
        <p className="text-sm">
          Don’t have an account?{' '}
          <Link href="/signup" className="text-blue-600 underline">
            Sign up
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
