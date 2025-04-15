'use client';

import { emailDuplicateTest, NicknameDuplicateTest, signUpUser } from '@/app/api/supabase/service';
import { PEOPLE } from '@/constants/paths';
import {
  PLACEHOLDER_EMAIL,
  PLACEHOLDER_NICKNAME,
  PLACEHOLDER_PASSWORD,
  PLACEHOLDER_PASSWORD_CHECK,
} from '@/constants/placeholders';
import { signUpSchema } from '@/lib/schemas/signupSchema';
import { useAuthStore } from '@/store/zustand/store';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export interface SignUpFormType {
  email: string;
  password: string;
  nickname: string;
  passwordCheck: string;
}

const SignupForm = () => {
  const [isNicknameChecked, setIsNicknameChecked] = useState<boolean>(false);
  const [isEmailChecked, setIsEmailChecked] = useState<boolean>(false);

  const { register, handleSubmit, getValues, formState, setFocus } = useForm<SignUpFormType>({
    mode: 'onChange',
    resolver: zodResolver(signUpSchema),
  });
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  //회원가입 기능 핸들러
  const onSignUpHandler = async (value: SignUpFormType) => {
    if (!isEmailChecked || !isNicknameChecked) {
      toast.warning('이메일과 닉네임 중복 검사를 완료해주세요.');
      return;
    }

    const { data, error } = await signUpUser(value);
    if (data.session) {
      localStorage.setItem('alreadySignIn', 'true');
      toast.success(`회원가입이 완료되었습니다. 자동으로 로그인되어 '내 사람' 페이지로 이동합니다.`);
      setUser(data.session.user);
      router.push(PEOPLE);
    } else if (error) {
      toast.warning('입력한 정보를 다시 한 번 확인해주세요.');
    }
  };

  //닉네임 중복 검사 핸들러
  const NicknameDuplicateTestHandler = async () => {
    const nickname = getValues('nickname');
    const data = await NicknameDuplicateTest(nickname);

    if (!nickname) {
      toast.warning('닉네임을 입력해주세요.');
      setFocus('nickname');
      return;
    }

    if (data) {
      toast.warning('중복된 닉네임이 존재합니다.');
      setFocus('nickname');
      setIsNicknameChecked(false);
    } else if (formState.errors.nickname) {
      toast.warning('닉네임 형식을 확인해주세요.');
      setFocus('nickname');
      setIsNicknameChecked(false);
    } else {
      toast.success('사용가능한 닉네임입니다.');
      setIsNicknameChecked(true);
    }
  };

  //이메일 중복 검사 핸들러
  const EmailDuplicateTestHandler = async () => {
    const email = getValues('email');
    const data = await emailDuplicateTest(email);

    if (!email) {
      toast.warning('이메일을 입력해주세요.');
      setFocus('email');
      return;
    }

    if (data) {
      toast.warning('중복된 이메일이 존재합니다.');
      setFocus('email');
      setIsEmailChecked(false);
    } else if (formState.errors.email) {
      toast.warning('이메일 형식을 확인해주세요.');
      setFocus('email');
      setIsEmailChecked(false);
    } else {
      toast.success('사용가능한 이메일입니다.');
      setIsEmailChecked(true);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSignUpHandler)} className='flex flex-col gap-8'>
      <div className='flex flex-col'>
        <div className='flex flex-col justify-start'>
          <label
            className={`self-stretch text-sm font-bold leading-[150%] ${formState.errors.nickname ? `text-status-error` : `text-grey-900`}`}
          >
            이름(닉네임)
          </label>
          <div className='flex flex-row gap-6'>
            <input
              className={`w-full flex-1 items-center gap-2 self-stretch rounded-lg border p-4 ${formState.errors.nickname ? `border-status-error focus:outline-none` : `border-grey-200`}`}
              type='text'
              id='nickname'
              maxLength={8}
              placeholder={PLACEHOLDER_NICKNAME}
              {...register('nickname')}
            />
            <button
              type='button'
              className='duration-300" rounded-lg border border-grey-500 bg-grey-0 px-6 py-4 transition hover:bg-primary-600 hover:text-grey-0'
              onClick={NicknameDuplicateTestHandler}
            >
              중복 검사
            </button>
          </div>
        </div>
        {formState.errors.nickname ? (
          <span className='self-stretch text-sm leading-[150%] text-status-error'>
            {formState.errors.nickname.message}
          </span>
        ) : (
          <span className='self-stretch font-normal not-italic leading-[150%] text-grey-100'>
            2자 이상 8자 이하로 입력해주세요.
          </span>
        )}
      </div>

      <div className='flex flex-col'>
        <div className='flex flex-col justify-start'>
          <label
            className={`self-stretch text-sm font-bold leading-[150%] ${formState.errors.email ? `text-status-error` : `text-grey-900`}`}
          >
            아이디(이메일)
          </label>
          <div className='flex flex-row gap-6'>
            <input
              className={`w-full flex-1 items-center gap-2 self-stretch rounded-lg border p-4 ${formState.errors.email ? `border-status-error focus:outline-none` : `border-grey-200`}`}
              type='email'
              id='email'
              placeholder={PLACEHOLDER_EMAIL}
              {...register('email')}
            />
            <button
              type='button'
              className='duration-300" rounded-lg border border-grey-500 bg-grey-0 px-6 py-4 transition hover:bg-primary-600 hover:text-grey-0'
              onClick={EmailDuplicateTestHandler}
            >
              중복 검사
            </button>
          </div>
        </div>
        {formState.errors.email ? (
          <span className='self-stretch text-sm leading-[150%] text-status-error'>
            {formState.errors.email.message}
          </span>
        ) : (
          <span className='self-stretch font-normal not-italic leading-[150%] text-grey-100'>
            이메일 형식에 맞게 입력해주세요.
          </span>
        )}
      </div>

      <div className='flex flex-col'>
        <div className='flex flex-col justify-start'>
          <label
            className={`self-stretch text-sm font-bold leading-[150%] ${formState.errors.password ? `text-status-error` : `text-grey-900`}`}
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
        {formState.errors.password ? (
          <span className='self-stretch text-sm leading-[150%] text-status-error'>
            {formState.errors.password.message}
          </span>
        ) : (
          <span className='self-stretch font-normal not-italic leading-[150%] text-grey-100'>
            특수문자(!@#$%^&*)를 1개 이상 포함하여 입력해주세요.
          </span>
        )}
      </div>

      <div className='flex flex-col'>
        <div className='flex flex-col justify-start'>
          <label
            className={`self-stretch text-sm font-bold leading-[150%] ${formState.errors.passwordCheck ? `text-status-error` : `text-grey-900`}`}
          >
            비밀번호 확인
          </label>
          <input
            className={`w-full flex-1 items-center gap-2 self-stretch rounded-lg border p-4 ${formState.errors.passwordCheck ? `border-status-error focus:outline-none` : `border-grey-200`}`}
            type='password'
            id='passwordCheck'
            placeholder={PLACEHOLDER_PASSWORD_CHECK}
            {...register('passwordCheck')}
          />
        </div>
        {formState.errors.passwordCheck ? (
          <span className='self-stretch text-sm leading-[150%] text-status-error'>
            {formState.errors.passwordCheck.message}
          </span>
        ) : (
          <span className='self-stretch font-normal not-italic leading-[150%] text-grey-100'>
            비밀번호를 한번 더 입력해주세요.
          </span>
        )}
      </div>
      <button
        type='submit'
        className='duration-600 bg-h w-[456px] justify-start rounded-lg bg-primary-500 px-6 py-4 font-bold leading-[135%] text-white transition hover:bg-primary-600 active:bg-primary-700'
      >
        회원가입
      </button>
    </form>
  );
};

export default SignupForm;
