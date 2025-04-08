'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/zustand/store';
import { mutateSignIn } from '@/app/api/supabase/service';
import { PLACEHOLDER_EMAIL, PLACEHOLDER_PASSWORD } from '@/constants/placeholders';
import { PEOPLE } from '@/constants/paths';

export interface SignInFormType {
  email: string;
  password: string;
}

const SignIn = () => {
  const { register, handleSubmit } = useForm<SignInFormType>();
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const onSignInHandler = async (value: SignInFormType) => {
    const user = await mutateSignIn(value);

    setUser(user);
    alert(`로그인되었습니다.'내 사람' 페이지로 이동합니다.`);
    router.push(PEOPLE);
  };

  return (
    <form onSubmit={handleSubmit(onSignInHandler)}>
      <div>
        <label htmlFor='email'>이메일</label>
        <input
          type='email'
          id='email'
          placeholder={PLACEHOLDER_EMAIL}
          {...register('email', {
            required: '이메일 입력은 필수입니다.',
          })}
        />
      </div>

      <div>
        <label htmlFor='password'>비밀번호</label>
        <input
          type='password'
          id='password'
          placeholder={PLACEHOLDER_PASSWORD}
          {...register('password', {
            required: '비밀번호 입력은 필수입니다.',
          })}
        />
      </div>
      <button type='submit'>로그인</button>
    </form>
  );
};

export default SignIn;
