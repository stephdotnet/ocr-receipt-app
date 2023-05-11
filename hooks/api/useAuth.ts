import auth, { LoginRequestData } from '@/utils/api/auth';
import { useMutation } from '@tanstack/react-query';
import { useStore } from '../store';

export const useLogin = () => {
  return useMutation({ mutationFn: async (data: LoginRequestData) => auth.login(data) });
};

export const useLogout = () => {
  const token = useStore((state) => state.token);

  return token && useMutation(() => auth.logout(token));
};
