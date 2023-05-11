import { User } from '@/types/User';
import { create } from 'zustand';

interface Store {
  token: string | null;
  setToken: (token: string) => void;
  clearToken: () => void;
  user: Partial<User> | null;
  setUserData: (data: Partial<User>) => void;
}

export const useStore = create<Store>((set) => ({
  token: null,
  setToken: (token: string) => set(() => ({ token })),
  clearToken: () => set(() => ({ token: null })),
  user: null,
  setUserData: (data: Partial<User>) => set((state) => ({ user: { ...state.user, ...data } })),
}));
