'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/zustand/store';
import { PATHS } from '@/constants/paths';
import { PLACEHOLDER } from '@/constants/placeholders';
import { mutateSignUp } from '@/app/api/supabase/service';

export interface SignUpFormType {
  email: string;
  password: string;
  nickname: string;
}

const SignUp = () => {
  const { register, handleSubmit } = useForm<SignUpFormType>();
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const onSignUpHandler = async (value: SignUpFormType) => {
    const user = await mutateSignUp(value);

    setUser(user);
    alert(`회원가입이 완료되었습니다. 자동으로 로그인되어 '내 사람' 페이지로 이동합니다.`);
    router.push(PATHS.PEOPLE.to);
  };

  return (
    <form onSubmit={handleSubmit(onSignUpHandler)}>
      <div>
        <label htmlFor='nickname'>닉네임</label>
        <input
          type='text'
          id='nickname'
          placeholder={PLACEHOLDER.nickname.message}
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

      <button type='submit'>회원가입</button>
    </form>
  );
};

export default SignUp;
