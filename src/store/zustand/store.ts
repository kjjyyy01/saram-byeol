import { supabase } from '@/app/api/supabase/client';
import { User } from '@supabase/supabase-js';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface AuthStateType {
  user: User | null;
  isSignIn: boolean;
  setUser: (user: User | null) => void;
  signOut: () => void;
}

export const initialState = { user: null, isSignIn: false };

export const useAuthStore = create<AuthStateType>()(
  persist(
    (set) => ({
      user: null,
      isSignIn: false,
      setUser: (user) => set({ user, isSignIn: true }),
      signOut: async () => {
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
