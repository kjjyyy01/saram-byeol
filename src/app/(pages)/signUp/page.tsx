'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/zustand/store';
import { supabase } from '@/app/api/supabase/client';
import { PATHS } from '@/constants/paths';

export interface SignupFormType {
  email: string;
  password: string;
  nickname: string;
}

const Signup = () => {
  const { register, handleSubmit } = useForm<SignupFormType>();
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const onSignupHandler = async (value: SignupFormType) => {
    const { email, password, nickname } = value;

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { nickname } },
    });
    if (error) {
      console.error('회원가입에 실패했습니다. 다시 시도해주세요.', error);
      throw error;
    } else {
      setUser(data.user);
      alert(`회원가입이 완료되었습니다. 자동으로 로그인되어 '내 사람' 페이지로 이동합니다.`);
      router.push(PATHS.PEOPLE.to);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSignupHandler)}>
      <div>
        <label htmlFor='nickname'>닉네임</label>
        <input
          type='text'
          id='nickname'
          placeholder='헤엄치는 수달'
          {...register('nickname', {
            required: '닉네임 입력은 필수입니다.',
          })}
        />
      </div>

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

      <button type='submit'>회원가입</button>
    </form>
  );
};

export default Signup;
