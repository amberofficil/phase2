'use client';


import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../providers/AuthProvider';


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();


  // ✅ Redirect inside useEffect instead of render
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isLoading, isAuthenticated, router]);


  // Show loading spinner while auth state is loading
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }


  // Return children only if authenticated
  if (!isAuthenticated) {
    return null; // temporarily hide dashboard while redirecting
  }


  return <>{children}</>;
}





