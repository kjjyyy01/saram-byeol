'use client';

import { signInUser } from '@/app/api/supabase/service';
import { PEOPLE } from '@/constants/paths';
import { PLACEHOLDER_EMAIL, PLACEHOLDER_PASSWORD } from '@/constants/placeholders';
import { signInSchema } from '@/lib/schemas/signinSchema';
import { useAuthStore } from '@/store/zustand/store';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export interface SignInFormType {
  email: string;
  password: string;
}

const SigninForm = () => {
  const { register, handleSubmit, formState } = useForm<SignInFormType>({
    mode: 'onChange',
    resolver: zodResolver(signInSchema),
  });
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  //로그인 기능 핸들러
  const onSignInHandler = async (value: SignInFormType) => {
    const { data, error } = await signInUser(value);
    if (data.session) {
      localStorage.setItem('alreadySignIn', 'true');
      toast.success(`로그인되었습니다.'내 사람' 페이지로 이동합니다.`);
      setUser(data.session.user);
      router.push(PEOPLE);
    } else if (error) {
      toast.warning('아이디 또는 비밀번호를 확인해주세요.');
    }
  };

  const alreadyService = () => {
    toast.info('아직 준비중인 기능입니다.');
  };

  return (
    <form onSubmit={handleSubmit(onSignInHandler)} className='flex flex-col gap-8'>
      <div className='flex flex-col'>
        <div className='flex flex-col justify-start'>
          <label
            className={`self-stretch text-sm font-bold leading-[150%] ${formState.errors.email ? `text-status-error` : `text-grey-900`}`}
            htmlFor='email'
          >
            아이디(이메일)
          </label>
          <input
            className={`w-full flex-1 items-center gap-2 self-stretch rounded-lg border p-4 ${formState.errors.email ? `border-status-error focus:outline-none` : `border-grey-200`}`}
            type='email'
            id='email'
            placeholder={PLACEHOLDER_EMAIL}
            {...register('email')}
          />
        </div>
        {formState.errors.email && (
          <span className='self-stretch text-sm leading-[150%] text-status-error'>
            {formState.errors.email.message}
          </span>
        )}
      </div>
      <div className='flex flex-col'>
        <div className='flex flex-col justify-start'>
          <label
            className={`self-stretch text-sm font-bold leading-[150%] ${formState.errors.password ? `text-status-error` : `text-grey-900`}`}
            htmlFor='password'
          >
            비밀번호
          </label>
          <input
            className={`w-full flex-1 items-center gap-2 self-stretch rounded-lg border p-4 ${formState.errors.password ? `border-status-error focus:outline-none` : `border-grey-200`}`}
            type='password'
            id='password'
            placeholder={PLACEHOLDER_PASSWORD}
            {...register('password')}
          />
        </div>
        {formState.errors.password && (
          <span className='self-stretch text-sm leading-[150%] text-status-error'>
            {formState.errors.password.message}
          </span>
        )}
      </div>
      <div className='flex justify-between'>
        <label htmlFor='saveId'>
          <input type='checkbox' id='saveId' onClick={alreadyService} className='mr-1' />
          로그인 정보 저장
        </label>
        <button type='button' onClick={alreadyService}>
          비밀번호를 잊어버리셨습니까?
        </button>
      </div>
      <button
        type='submit'
        className='duration-600 bg-h w-[456px] justify-start rounded-lg bg-primary-500 px-6 py-4 font-bold leading-[135%] text-white transition hover:bg-primary-600 active:bg-primary-700'
      >
        로그인
      </button>
    </form>
  );
};

export default SigninForm;
