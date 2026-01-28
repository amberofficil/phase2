'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../../providers/AuthProvider';

export default function SignupPage() {
  const router = useRouter();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const success = await register(formData.email, formData.password);
      if (success) {
        router.push('/dashboard'); // ✅ redirect after signup
      } else {
        setError('Signup failed');
      }
    } catch (err) {
      setError('Something went wrong');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-md shadow-md">
        <h1 className="text-4xl font-bold text-blue-500 text-center">Sign Up</h1>

        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-md"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 border rounded-md"
          />
          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full p-3 border rounded-md"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white p-3 rounded-md"
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-500 font-medium">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
