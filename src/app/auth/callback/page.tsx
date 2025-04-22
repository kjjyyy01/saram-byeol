'use client';

import { useEffect } from 'react';
import { supabase } from '@/app/api/supabase/client';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { PEOPLE, SIGNIN } from '@/constants/paths';

// 컴포넌트 마운트 시 현재 로그인 세션 확인
// 세션이 있으면 '/people'로
// 세션이 없으면 '/signin'으로
const AuthCallbackPage = () => {
  const router = useRouter();

  useEffect(() => {
    toast.success(`로그인에 성공했습니다. '내사람'으로 이동합니다.`);
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        router.replace(PEOPLE);
      } else {
        router.replace(SIGNIN);
      }
    });
  }, [router]);

  return (
    <div className='flex h-screen w-screen items-center justify-center'>
      <p>로그인 처리 중…</p>
    </div>
  );
};

export default AuthCallbackPage;
