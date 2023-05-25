import { useSecureStorageToken } from '@/hooks/auth/useSecureStorageToken';
import { useStore } from '@/hooks/store';

export const useToken = () => {
  const { setToken: setStoreToken } = useStore();
  const { setToken: setSecureToken, removeToken } = useSecureStorageToken();

  const setToken = (value: string | null) => {
    setStoreToken(value);
    if (value === null) {
      removeToken();
    } else {
      setSecureToken(value);
    }
  };

  return {
    setToken,
  };
};
