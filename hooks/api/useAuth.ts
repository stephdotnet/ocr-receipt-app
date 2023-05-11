import auth, { LoginRequestData } from '@/utils/api/auth';
import { useMutation } from '@tanstack/react-query';

export const useLogin = () => {
  return useMutation({ mutationFn: async (data: LoginRequestData) => auth.login(data) });
};

export const useLogout = () => {
  return useMutation({ mutationFn: async (token: string) => auth.logout(token) });
};
