import { dataGetValue, env } from '@/utils/system';
import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const axios = Axios.create({
  baseURL: env('API_URL'),
  withCredentials: true,
});

axios.interceptors.response.use(null, (error) => {
  if (error.response && error.response.status === 419) {
    // If the response status is 419 (CSRF token expired), re-trigger the CSRF request
    return axios.get('/sanctum/csrf-cookie').then(() => {
      // Once the CSRF request is complete, re-send the original request
      return axios(error.config);
    });
  }

  if (dataGetValue(error, 'response.data.data.errors')) {
    error = {
      ...error,
      response: {
        ...error.response,
        validationErrors: error.response.data.data.errors,
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
  get: (route, config) => axios.get(route, { signal: config?.signal, params: config?.params }),
  post: (route, data, config) => axios.post(route, data, { signal: config?.signal, ...config }),
  put: (route, data, config) => axios.put(route, data, { signal: config?.signal }),
  patch: (route, data, config) => axios.patch(route, data, { signal: config?.signal }),
  delete: (route, config) => axios.delete(route, { signal: config?.signal }),
};
