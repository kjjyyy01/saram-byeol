'use client';

import { FieldValues, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/zustand/store';
import { supabase } from '@/app/api/supabase/client';

const Signin = () => {
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const onSigninHandler = async (value: FieldValues) => {
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
      alert('로그인되었습니다.');
      router.push('/people');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSigninHandler)}>
      <div>
        <label htmlFor='email'>이메일</label>
        <input
          type='email'
          id='email'
          placeholder='sarambyeol@sarambyeol.com'
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
          placeholder='비밀번호를 입력해주세요'
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
