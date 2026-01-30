'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../../providers/AuthProvider';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/ui/Card';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const success = await login(formData.email, formData.password);

      if (success) {
        router.push('/dashboard'); // login success → dashboard
      } else {
        router.push('/signup'); // login fail → signup
      }

    } catch (err) {
      console.error(err);
      router.push('/signup'); // fallback
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center">Sign in to your account</CardTitle>
        <CardDescription>Enter your email and password below to access your account</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <Input label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required className="w-64" />
            <Input label="Password" name="password" type="password" value={formData.password} onChange={handleChange} required className="w-64" />
          </div>
          <Button type="submit" className="w-full mt-6" loading={loading}>Sign In</Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col">
        <div className="text-sm text-center">
          Don't have an account?{' '}
          <Link href="/signup" className="font-medium text-blue-600 hover:underline">
            Sign up
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
