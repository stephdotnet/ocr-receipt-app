import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'token';

export const useSecureStorageToken = () => {
  const getToken = async () => {
    if (Platform.OS === 'web') {
      return await localStorage.getItem(TOKEN_KEY);
    } else {
      return await SecureStore.getItemAsync(TOKEN_KEY);
    }
  };

  const setToken = async (value: string) => {
    if (Platform.OS === 'web') {
      await localStorage.setItem(TOKEN_KEY, value);
    } else {
      await SecureStore.setItemAsync(TOKEN_KEY, value);
    }
  };

  return {
    getToken,
    setToken,
  };
};
