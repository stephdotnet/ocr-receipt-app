import auth, { LoginRequestData } from '@/utils/api/auth';
import { useMutation } from '@tanstack/react-query';
import { useSecureStorageToken } from '../auth/useSecureStorageToken';
import { useStore } from '../store';

export const useLogin = () => {
  const { setToken: setStoreToken, setUserData } = useStore();
  const { setToken } = useSecureStorageToken();

  return useMutation({
    mutationFn: async (data: LoginRequestData) => auth.login(data),
    onSuccess: async (data) => {
      setStoreToken(data.token);
      await setToken(data.token);
      setUserData(data.user);
    },
  });
};

export const useLogout = () => {
  const { setToken: setStoreToken, setUserData } = useStore();
  const { removeToken } = useSecureStorageToken();

  return useMutation({
    mutationFn: async (token: string) => auth.logout(token),
    onSuccess: async () => {
      setStoreToken(null);
      await removeToken();
      setUserData(null);
    },
  });
};
