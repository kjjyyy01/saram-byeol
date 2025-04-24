'use client';

import { PLACEHOLDER_EMAIL, PLACEHOLDER_PASSWORD } from '@/constants/placeholders';
import { useSignin } from '@/hooks/useSignin';
import { signInSchema } from '@/lib/schemas/signinSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export interface SignInFormType {
  email: string;
  password: string;
}

const SigninForm = () => {
  const [isChecked, setIsChecked] = useState<boolean>(() => {
    return !!localStorage.getItem('saved-email');
  });

  const { register, handleSubmit, formState, setValue, getValues } = useForm<SignInFormType>({
    mode: 'onChange',
    resolver: zodResolver(signInSchema),
  });

  useEffect(() => {
    const savedEmail = localStorage.getItem('saved-email') || '';
    setValue('email', savedEmail);
  }, [setValue]);

  //로그인 커스텀 훅
  const { SignInHandler } = useSignin(getValues, isChecked);

  //준비중인 기능을 알리기 위한 핸들러함수
  const alreadyServiceHandler = () => {
    toast.info('아직 준비중인 기능입니다.');
  };

  return (
    <form onSubmit={handleSubmit(SignInHandler)} className='md: flex flex-col items-center justify-center md:gap-8'>
      <div className='mx-auto w-full max-w-[375px] px-5 md:max-w-full md:px-0'>
        <div className='mb-8 flex flex-col'>
          <div className='flex flex-col justify-start gap-1'>
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
          <div className='flex flex-col justify-start gap-1'>
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
      </div>
      <div className='mb-[22px] mt-9 flex w-full items-center justify-between px-5 md:mb-0 md:mt-0 md:flex md:justify-between md:px-0'>
        <label htmlFor='saveId' className='flex items-center justify-center text-sm md:text-base'>
          <input
            type='checkbox'
            id='saveId'
            checked={isChecked}
            onChange={(e) => {
              const checked = e.target.checked;
              setIsChecked(checked);
              if (checked) {
                toast.success('앞으로 로그인 정보가 저장됩니다.');
              } else {
                toast.warning('앞으로 로그인 정보가 저장되지않습니다.');
              }
            }}
            className='mr-2 h-5 w-5'
          />
          로그인 정보 저장
        </label>
        <button type='button' onClick={alreadyServiceHandler} className='hidden md:block'>
          비밀번호를 잊어버리셨습니까?
        </button>
        <button type='button' onClick={alreadyServiceHandler} className='block text-sm md:hidden'>
          비밀번호찾기
        </button>
      </div>
      <div className='w-full px-[10px] md:px-0'>
        <button
          type='submit'
          className='duration-600 mx-auto w-full rounded-lg bg-primary-500 px-6 py-4 font-bold leading-[135%] text-white transition hover:bg-primary-600 active:bg-primary-700 md:w-[456px]'
        >
          로그인
        </button>
      </div>
    </form>
  );
};

export default SigninForm;
