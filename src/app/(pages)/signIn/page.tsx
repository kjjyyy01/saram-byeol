'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/zustand/store';
import { supabase } from '@/app/api/supabase/client';
import { PATHS } from '@/constants/paths';
import { EMAIL_PLACEHOLDER, PASSWORD_PLACEHOLDER } from '@/constants/placeholders';

export interface SigninFormType {
  email: string;
  password: string;
}

const Signin = () => {
  const { register, handleSubmit } = useForm<SigninFormType>();
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const onSigninHandler = async (value: SigninFormType) => {
    const { email, password } = value;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.error('로그인에 실패했습니다. 다시 시도해주세요.', error);
      throw error;
    } else {
      setUser(data.user);
      alert(`로그인되었습니다.'내 사람' 페이지로 이동합니다.`);
      router.push(PATHS.PEOPLE.to);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSigninHandler)}>
      <div>
        <label htmlFor='email'>이메일</label>
        <input
          type='email'
          id='email'
          placeholder={EMAIL_PLACEHOLDER}
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
          placeholder={PASSWORD_PLACEHOLDER}
          {...register('password', {
            required: '비밀번호 입력은 필수입니다.',
          })}
        />
      </div>
      <button type='submit'>로그인</button>
    </form>
  );
};

export default Signin;
