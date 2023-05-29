import { useEffect } from 'react';
import { useToken } from '@/hooks/auth/useToken';
import { User } from '@/types/User';
import auth, { LoginRequestData } from '@/utils/api/auth';
import { QueryKey, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios/index';
import { useSecureStorageToken } from '../auth/useSecureStorageToken';
import { useStore } from '../store';

export const useLogin = () => {
  const { setToken: setStoreToken, setUserData } = useStore();
  const { setToken } = useSecureStorageToken();

  return useMutation({
    mutationFn: async (data: LoginRequestData) => auth.login(data),
    onSuccess: async (data) => {
      console.log('onSuccess');
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

const QUERY_KEY_ME = 'me';

export function getQueryMe(): QueryKey {
  return [QUERY_KEY_ME];
}

export const useMe = () => {
  const { setUserData, token } = useStore();
  const queryClient = useQueryClient();
  const { setToken } = useToken();
  const query = useQuery<User, AxiosError>(
    getQueryMe(),
    ({ signal }) => auth.me(token!, { signal }),
    {
      enabled: !!token,
      retry: false,
    },
  );

  useEffect(() => {
    setUserData(query.data ?? null);

    if (query.isError) {
      queryClient.cancelQueries(getQueryMe());
      setToken(null);
      setUserData(null);
    }
  }, [query.data, query.isError]);

  return query;
};
