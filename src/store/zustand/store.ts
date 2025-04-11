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
        alert(`로그아웃되었습니다.`);
      },
    }),
    {
      name: 'user-storage',
    }
  )
);

// 로그인 시 alert가 탭 전환 시 반복해서 뜨지 않도록 localStorage로 제어
export const AuthStateChangeHandler = () => {
  const { setUser, signOut } = useAuthStore.getState();

  const { data: unsubscribe } = supabase.auth.onAuthStateChange((event, session) => {
    const alreadySignIn = localStorage.getItem('alreadySignIn');

    if (event === 'SIGNED_IN' && session) {
      setUser(session.user); // 사용자 정보 저장, isSignIn 을 true로 변경

      if (!alreadySignIn) {
        localStorage.setItem('alreadySignIn', 'true');
        alert(`로그인되었습니다.'내 사람' 페이지로 이동합니다.`);
      }
    } else if (event === 'SIGNED_OUT') {
      localStorage.removeItem('alreadySignIn');
      signOut(); // 사용자 정보 null로 초기화, isSignIn 을 false로 변경
    }
  });

  return unsubscribe;
};
