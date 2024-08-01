import React, { useEffect, ReactNode } from 'react';
import { useRouter } from 'next/router';

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const router = useRouter();
  const isAuthenticated = () => localStorage.getItem('token') !== null;

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
    }
  }, [router]);

  if (!isAuthenticated()) {
    return null; // Render nothing until authentication is verified
  }

  return <>{children}</>;
};

export default PrivateRoute;
