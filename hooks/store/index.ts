import { User } from '@/types/User';
import { ThemeName } from 'tamagui';
import { create } from 'zustand';

type theme = 'light' | 'dark' | ThemeName;

interface Store {
  token: string | null;
  setToken: (token: string | null) => void;
  clearToken: () => void;
  user: Partial<User> | null;
  setUserData: (data: User | null) => void;
  theme: theme;
  setTheme: (theme: theme) => void;
}

export const useStore = create<Store>((set) => ({
  token: null,
  setToken: (token) => set(() => ({ token })),
  clearToken: () => set(() => ({ token: null })),
  user: null,
  setUserData: (data) => set(() => ({ user: data })),
  theme: 'light',
  setTheme: (theme) => set(() => ({ theme })),
}));
