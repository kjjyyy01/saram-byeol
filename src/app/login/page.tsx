'use client';

import { FieldValues, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { supabase } from '../api/client';

const LoginPage = () => {
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  // const setUser = useAuthStore((state)=>state.setUser)

  const onLoginHandler = async (value: FieldValues) => {
    const { email, password } = value;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      throw new Error('이메일 또는 비밀번호가 올바르지 않습니다.');
    } else {
      // 전역상태관리 추가 시 사용
      // setUser(data.user);
      alert('로그인되었습니다.');
      router.push('/people');
    }
  };

  return (
    <form onSubmit={handleSubmit(onLoginHandler)}>
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

export default LoginPage;
