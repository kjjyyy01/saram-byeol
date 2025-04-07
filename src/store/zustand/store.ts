import { supabase } from '@/app/api/supabase/client';
import { User } from '@supabase/supabase-js';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface AuthStateType {
  user: User | null;
  isSignin: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const initialState = { user: null, isSignin: false };

export const useAuthStore = create<AuthStateType>()(
  persist(
    (set) => ({
      user: null,
      isSignin: false,
      setUser: (user) => set({ user, isSignin: true }),
      logout: async () => {
        const { error } = await supabase.auth.signOut();
        if (error) console.error('로그아웃에 실패했습니다. 다시 시도해주세요.', error);

        set(initialState);
        localStorage.removeItem('user-state');
      },
    }),
    {
      name: 'user-state',
    }
  )
);
