'use client';

import { PLACEHOLDER_EMAIL, PLACEHOLDER_PASSWORD } from '@/constants/placeholders';
import { useSignin } from '@/hooks/useSignin';
import { signInSchema } from '@/lib/schemas/signinSchema';
import { zodResolver } from '@hookform/resolvers/zod';
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

  //로그인 커스텀 훅
  const { SignInHandler } = useSignin();

  //준비중인 기능을 알리기 위한 핸들러함수
  const alreadyServiceHandler = () => {
    toast.info('아직 준비중인 기능입니다.');
  };

  return (
    <form onSubmit={handleSubmit(SignInHandler)} className='flex flex-col gap-8'>
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
          <input type='checkbox' id='saveId' onClick={alreadyServiceHandler} className='mr-1' />
          로그인 정보 저장
        </label>
        <button type='button' onClick={alreadyServiceHandler}>
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
