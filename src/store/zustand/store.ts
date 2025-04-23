import { supabase } from '@/app/api/supabase/client';
import { SignOutUser } from '@/app/api/supabase/service';
import { User } from '@supabase/supabase-js';
import { toast } from 'react-toastify';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useDemoStore } from './useDemoStore';
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
      setUser: (user) => {
        const { clearAll } = useDemoStore.getState();
        clearAll();
        set({ user, isSignIn: true });
      },
      signOut: async () => {
        set(initialState);
        await SignOutUser();
      },
    }),
    {
      name: 'user-storage',
    }
  )
);

// 로그인 시 탭 전환 등으로 인해 중복 알림이 발생하지 않도록 localStorage를 사용해 제어
export const AuthStateChangeHandler = () => {
  const { setUser } = useAuthStore.getState();

  const { data: unsubscribe } = supabase.auth.onAuthStateChange((event, session) => {
    const alreadySignIn = localStorage.getItem('alreadySignIn');

    if ((event === 'INITIAL_SESSION' || event === 'SIGNED_IN') && session) {
      setUser(session.user);

      if (!alreadySignIn) {
        localStorage.setItem('alreadySignIn', 'true');
      }
    } else if (event === 'SIGNED_OUT') {
      localStorage.removeItem('alreadySignIn');
      const { isDemoUser } = useDemoStore.getState();
      if (!isDemoUser) {
        toast.success(`로그아웃되었습니다.`);
      }
    }
  });

  return unsubscribe;
};
