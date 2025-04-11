'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/zustand/store';
import { mutateSignIn } from '@/app/api/supabase/service';
import { PLACEHOLDER_EMAIL, PLACEHOLDER_PASSWORD } from '@/constants/placeholders';
import { PEOPLE, SIGNUP } from '@/constants/paths';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInSchema } from '@/lib/schemas/signinSchema';
import { supabase } from '@/app/api/supabase/client';
import { z } from 'zod';
import Link from 'next/link';

export type SignInFormType = z.infer<typeof signInSchema>;

const SignIn = () => {
  const { register, handleSubmit, formState } = useForm<SignInFormType>({
    mode: 'onChange',
    resolver: zodResolver(signInSchema),
  });
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  //로그인 기능 핸들러
  const onSignInHandler = async (value: SignInFormType) => {
    const { data, error } = await mutateSignIn(value);
    if (data.session) {
      localStorage.setItem('alreadySignIn', 'true');
      alert(`로그인되었습니다.'내 사람' 페이지로 이동합니다.`);
      setUser(data.session.user);
      router.push(PEOPLE);
    } else if (error) {
      alert('아이디 또는 비밀번호를 확인해주세요.');
    }
  };

  //구글 로그인 기능 핸들러
  const googleSignin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'http://localhost:3000/people',
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    });

    if (error) alert('구글 로그인에 실패했습니다. 새로고침 후 다시 시도해주세요.');
  };

  //카카오 로그인 기능 핸들러
  const kakaoSignin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'kakao',
      options: {
        redirectTo: 'http://localhost:3000/people',
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    });

    if (error) alert('로그인 중 오류가 발생했습니다. 새로고침 후 다시 로그인해주세요.');
  };

  return (
    <form onSubmit={handleSubmit(onSignInHandler)}>
      <div className='flex flex-col'>
        <section>
          <label htmlFor='email'>아이디</label>
          <input type='email' id='email' placeholder={PLACEHOLDER_EMAIL} {...register('email')} />
        </section>
        {formState.errors.email && <span>{formState.errors.email.message}</span>}
      </div>

      <div className='flex flex-col'>
        <section>
          <label htmlFor='password'>비밀번호</label>
          <input type='password' id='password' placeholder={PLACEHOLDER_PASSWORD} {...register('password')} />
        </section>
        {formState.errors.password && <span>{formState.errors.password.message}</span>}
      </div>

      <button type='submit'>로그인</button>
      <p>아이디가 없으신가요?</p>
      <Link href={SIGNUP}>회원가입</Link>
      <button type='button' onClick={googleSignin}>
        구글 로그인
      </button>
      <button type='button' onClick={kakaoSignin}>
        카카오 로그인
      </button>
    </form>
  );
};

export default SignIn;
