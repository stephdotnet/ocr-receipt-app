import { User } from '@/types/User';
import { AxiosResponse } from 'axios';
import { apiClient } from './api';

const ENDPOINT_LOGIN = 'login';
const ENDPOINT_LOGOUT = 'logout';

interface AuthHttpResponse {
  data: {
    token: string;
    user: User;
  };
}

export interface LoginRequestData {
  email: string;
  password: string;
}

interface AuthRequestOptions {
  signal?: AbortSignal;
}

interface LoginFunction {
  (data: LoginRequestData, options?: AuthRequestOptions): Promise<AuthHttpResponse['data']>;
}

const login: LoginFunction = async (data, options) => {
  const response: AxiosResponse<AuthHttpResponse> = await apiClient.post(
    ENDPOINT_LOGIN,
    data,
    options,
  );

  return response.data.data;
};

interface LogoutFunction {
  (token: string, options?: AuthRequestOptions): Promise<boolean>;
}

const logout: LogoutFunction = async (token, options) => {
  const response: AxiosResponse<void> = await apiClient.post(
    ENDPOINT_LOGOUT,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      ...options,
    },
  );

  return response.status === 200;
};

export default {
  login,
  logout,
};
