import React from 'react';
import { useProtectedRoutes } from '@/hooks/auth/useProtectedRoutes';

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  useProtectedRoutes();

  return <>{children}</>;
};
