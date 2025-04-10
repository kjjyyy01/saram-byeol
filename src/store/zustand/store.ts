import { supabase } from '@/app/api/supabase/client';
import { mutateSignOut } from '@/app/api/supabase/service';
import { User } from '@supabase/supabase-js';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface AuthStateType {
  user: User | null;
  isSignIn: boolean;
  setUser: (user: User | null) => void;
  signOut: () => void;
}

// 상태 초기값
export const initialState = { user: null, isSignIn: false };

export const useAuthStore = create<AuthStateType>()(
  persist(
    (set) => ({
      ...initialState,
      setUser: (user) => set({ user, isSignIn: true }),
      signOut: async () => {
        await mutateSignOut();
        set(initialState);
      },
    }),
    {
      name: 'user-storage',
    }
  )
);

export const AuthStateChangeHandler = () => {
  const { setUser, signOut } = useAuthStore.getState();

  const { data: unsubscribe } = supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_IN' && session) {
      setUser(session.user); // 사용자 정보 저장, isSignIn 을 true로 변경
    } else if (event === 'SIGNED_OUT') {
      signOut(); // 사용자 정보 null로 초기화, isSignIn 을 false로 변경
    }
  });

  return unsubscribe;
};
