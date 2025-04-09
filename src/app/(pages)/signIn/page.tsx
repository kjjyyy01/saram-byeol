'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/zustand/store';
import { mutateSignIn } from '@/app/api/supabase/service';
import { PLACEHOLDER_EMAIL, PLACEHOLDER_PASSWORD } from '@/constants/placeholders';
import { PEOPLE } from '@/constants/paths';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

export interface SignInFormType {
  email: string;
  password: string;
}
// 로그인 유효성검사 스키마
const signInSchema = z.object({
  email: z
    .string()
    .min(1, { message: '이메일을 입력해주세요.' })
    .email({ message: '올바른 이메일 형식을 입력해주세요.' }),
  password: z.string().min(1, { message: '비밀번호를 입력해주세요.' }),
});

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
    if (data.user) {
      setUser(data.user);
      alert(`로그인되었습니다.'내 사람' 페이지로 이동합니다.`);
      router.push(PEOPLE);
    } else if (error) {
      alert('아이디 또는 비밀번호를 확인해주세요.');
    }
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
    </form>
  );
};

export default SignIn;
