import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: null,
  setUser: (user: { nickName: string; ProfileImage: string }) => set({ user }),

  clearUser: () => set({ user: null }),
}));
