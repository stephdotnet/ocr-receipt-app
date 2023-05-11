import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { useStore } from '@/hooks/store';
import { useSecureStorageToken } from './useSecureStorageToken';

export const useProtectedRoutes = () => {
  const router = useRouter();
  const { getToken } = useSecureStorageToken();
  const { setToken } = useStore();

  useEffect(() => {
    getToken().then((token) => {
      console.log('TOKEN RETRIEVED', token);

      if (!token) {
        router.push('/login');
      } else {
        setToken(token);
      }
    });
  }, []);
};
