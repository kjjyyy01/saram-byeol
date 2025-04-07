'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/zustand/store';
import { PATHS } from '@/constants/paths';
import { PLACEHOLDER } from '@/constants/placeholders';
import { mutateSignIn } from '@/app/api/supabase/service';

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
    router.push(PATHS.PEOPLE.to);
  };

  return (
    <form onSubmit={handleSubmit(onSignInHandler)}>
      <div>
        <label htmlFor='email'>이메일</label>
        <input
          type='email'
          id='email'
          placeholder={PLACEHOLDER.email.message}
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
          placeholder={PLACEHOLDER.password.message}
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
