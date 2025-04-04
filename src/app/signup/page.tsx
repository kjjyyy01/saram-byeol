'use client';

import { FieldValues, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { supabase } from '../api/client';

const SignupPage = () => {
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  // const setUser = useAuthStore((state)=>state.setUser)

  const onSignupHandler = async (value: FieldValues) => {
    const { email, password, nickname } = value;

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { nickname } },
    });
    if (error) {
      throw new Error('회원가입에 실패했습니다. 이메일과 비밀번호를 다시 확인해주세요.');
    } else {
      // 전역상태관리 추가 시 사용
      // setUser(data.user);
      alert('회원가입이 완료되었습니다. 자동으로 로그인되어 내 사람 페이지로 이동합니다.');
      router.push('/person');
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

export default SignupPage;
