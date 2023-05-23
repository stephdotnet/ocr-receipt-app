import { User } from '@/types/User';
import { create } from 'zustand';

interface Store {
  token: string | null;
  setToken: (token: string | null) => void;
  clearToken: () => void;
  user: Partial<User> | null;
  setUserData: (data: User | null) => void;
}

export const useStore = create<Store>((set) => ({
  token: null,
  setToken: (token) => set(() => ({ token })),
  clearToken: () => set(() => ({ token: null })),
  user: null,
  setUserData: (data) => set(() => ({ user: data })),
}));
