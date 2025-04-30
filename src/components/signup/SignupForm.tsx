'use client';

import { emailDuplicateTest, NicknameDuplicateTest } from '@/app/api/supabase/service';
import {
  PLACEHOLDER_DEFAULT_DOMAIN,
  PLACEHOLDER_NICKNAME,
  PLACEHOLDER_PASSWORD,
  PLACEHOLDER_PASSWORD_CHECK,
  PLACEHOLDER_SELECTED_DOMAIN,
} from '@/constants/placeholders';
import { useSignup } from '@/hooks/useSignup';
import { signupSchemaWithDomain, signupSchemaWithoutDomain } from '@/lib/schemas/signupSchema';
import { zodResolver } from '@hookform/resolvers/zod';
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
  const [emailDomain, setEmailDomain] = useState<string>('');

  //회원가입 커스텀 훅
  const { SignUpHandler, setIsEmailChecked, setIsNicknameChecked } = useSignup(emailDomain);

  const { register, handleSubmit, getValues, formState, setFocus } = useForm<SignUpFormType>({
    mode: 'onChange',
    resolver: zodResolver(emailDomain === '' ? signupSchemaWithoutDomain : signupSchemaWithDomain),
  });

  //닉네임 중복 검사 핸들러
  const NicknameDuplicateTestHandler = async () => {
    const nickname = getValues('nickname');
    const data = await NicknameDuplicateTest(nickname);

    if (!nickname) {
      toast.warning('닉네임을 입력해주세요.');
      setFocus('nickname');
      return;
    }

    if (data?.nickname) {
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
    const emailPrefix = getValues('email');
    let fullEmail = '';

    if (emailDomain === '') {
      fullEmail = emailPrefix;
    } else {
      fullEmail = emailPrefix + emailDomain;
    }

    const data = await emailDuplicateTest(fullEmail);

    if (!emailPrefix) {
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
    <form onSubmit={handleSubmit(SignUpHandler)} className='flex flex-col'>
      <div className='mx-auto w-full max-w-[375px] px-5 md:max-w-[456px] md:px-0'>
        <div className='mb-6 flex flex-col gap-1 md:mb-8'>
          <div className='flex flex-col justify-start gap-1'>
            <label
              className={`md:text- self-stretch text-sm font-bold leading-[150%] ${formState.errors.nickname ? `text-status-error` : `text-grey-900`}`}
            >
              이름(닉네임)
            </label>
            <div className='flex flex-row gap-6'>
              <input
                className={`w-full flex-1 items-center gap-2 self-stretch rounded-lg border p-4 placeholder-grey-100 ${formState.errors.nickname ? `border-status-error focus:outline-none` : `border-grey-200`}`}
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
            <span className='self-stretch text-xs font-normal not-italic leading-[150%] text-grey-100 md:text-base'>
              2자 이상 8자 이하로 입력해주세요.
            </span>
          )}
        </div>

        <div className='mb-6 flex flex-col gap-1 md:mb-8'>
          <div className='flex flex-col justify-start gap-1'>
            <label
              className={`self-stretch text-sm font-bold leading-[150%] ${formState.errors.email ? `text-status-error` : `text-grey-900`}`}
            >
              아이디(이메일)
            </label>
            <div className='flex flex-row'>
              <input
                className={`w-full flex-1 items-center gap-2 self-stretch rounded-lg border p-4 placeholder-grey-100 ${formState.errors.email ? `border-status-error focus:outline-none` : `border-grey-200`}`}
                type='text'
                id='email'
                placeholder={
                  emailDomain === '' || emailDomain === 'default'
                    ? PLACEHOLDER_DEFAULT_DOMAIN
                    : PLACEHOLDER_SELECTED_DOMAIN
                }
                {...register('email')}
              />
              <select
                id='domain'
                value={emailDomain}
                onChange={(e) => setEmailDomain(e.target.value)}
                className='mr-6 rounded-lg border border-grey-200 p-4'
              >
                <option value=''>도메인 선택</option>
                <option value='naver.com'>naver.com</option>
                <option value='gmail.com'>gmail.com</option>
                <option value='daum.net'>daum.net</option>
                <option value='hanmail.net'>hanmail.net</option>
                <option value='nate.com'>nate.com</option>
              </select>
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
            <span className='self-stretch text-xs font-normal not-italic leading-[150%] text-grey-100 md:text-base'>
              이메일 형식에 맞게 입력해주세요.
            </span>
          )}
        </div>

        <div className='mb-6 flex flex-col gap-1 md:mb-8'>
          <div className='flex flex-col justify-start gap-1'>
            <label
              className={`self-stretch text-sm font-bold leading-[150%] ${formState.errors.password ? `text-status-error` : `text-grey-900`}`}
            >
              비밀번호
            </label>
            <input
              className={`w-full flex-1 items-center gap-2 self-stretch rounded-lg border p-4 placeholder-grey-100 ${formState.errors.password ? `border-status-error focus:outline-none` : `border-grey-200`}`}
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
            <span className='self-stretch text-xs font-normal not-italic leading-[150%] text-grey-100 md:text-base'>
              특수문자(!@#$%^&*)를 1개 이상 포함하여 입력해주세요.
            </span>
          )}
        </div>

        <div className='mb-6 flex flex-col gap-1 md:mb-8'>
          <div className='flex flex-col justify-start gap-1'>
            <label
              className={`self-stretch text-sm font-bold leading-[150%] ${formState.errors.passwordCheck ? `text-status-error` : `text-grey-900`}`}
            >
              비밀번호 확인
            </label>
            <input
              className={`w-full flex-1 items-center gap-2 self-stretch rounded-lg border p-4 placeholder-grey-100 ${formState.errors.passwordCheck ? `border-status-error focus:outline-none` : `border-grey-200`}`}
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
            <span className='self-stretch text-xs font-normal not-italic leading-[150%] text-grey-100 md:text-base'>
              비밀번호를 한번 더 입력해주세요.
            </span>
          )}
        </div>
      </div>
      <div className='w-full px-[10px] md:px-0'>
        <button
          type='submit'
          className='duration-600 mx-auto w-full rounded-lg bg-primary-500 px-6 py-4 font-bold leading-[135%] text-white transition hover:bg-primary-600 active:bg-primary-700 md:w-[456px]'
        >
          이메일 인증 가입
        </button>
      </div>
    </form>
  );
};

export default SignupForm;
