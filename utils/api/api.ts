import { dataGetValue, env } from '@/utils/system';
import Axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

const axios = Axios.create({
  baseURL: env('API_URL'),
  withCredentials: true,
});

export interface CustomAxiosError<T = any> extends AxiosError<T> {
  response?: CustomAxiosResponse;
}

interface CustomAxiosResponse<T = any> extends AxiosResponse<T> {
  validationErrors: Record<string, string[]>;
}

axios.interceptors.response.use(null, (error) => {
  if (error.response && error.response.status === 419) {
    // If the response status is 419 (CSRF token expired), re-trigger the CSRF request
    return axios.get('/sanctum/csrf-cookie').then(() => {
      // Once the CSRF request is complete, re-send the original request
      return axios(error.config);
    });
  }

  if (dataGetValue(error, 'response.data.errors')) {
    error = {
      ...error,
      response: {
        ...error.response,
        validationErrors: error.response.data.errors,
      },
    };
  }

  return Promise.reject(error);
});

interface ApiClientType {
  get: <T = unknown>(route: string, config?: AxiosRequestConfig) => Promise<AxiosResponse<T>>;
  post: <T = unknown>(
    route: string,
    data: unknown,
    config?: AxiosRequestConfig,
  ) => Promise<AxiosResponse<T>>;
  put: <T = unknown>(
    route: string,
    data: unknown,
    config?: AxiosRequestConfig,
  ) => Promise<AxiosResponse<T>>;
  patch: <T = unknown>(
    route: string,
    data: unknown,
    config?: AxiosRequestConfig,
  ) => Promise<AxiosResponse<T>>;
  delete: <T = unknown>(route: string, config?: AxiosRequestConfig) => Promise<AxiosResponse<T>>;
}

export const apiClient: ApiClientType = {
  get: (route, config) =>
    axios.get(route, { signal: config?.signal, params: config?.params, ...config }),
  post: (route, data, config) => axios.post(route, data, { signal: config?.signal, ...config }),
  put: (route, data, config) => axios.put(route, data, { signal: config?.signal, ...config }),
  patch: (route, data, config) => axios.patch(route, data, { signal: config?.signal, ...config }),
  delete: (route, config) => axios.delete(route, { signal: config?.signal, ...config }),
};
