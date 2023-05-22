import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useStore } from '@/hooks/store';

export const useProtectedRoutes = () => {
  const router = useRouter();
  const { token } = useStore();

  useEffect(() => {
    if (!token) {
      router.push('/login');
    }
  }, [token]);
};
