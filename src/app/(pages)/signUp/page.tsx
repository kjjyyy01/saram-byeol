'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/zustand/store';
import {
  emailDuplicateTest,
  NicknameDuplicateTest,
  signInWithGoogle,
  signInWithKakao,
  signUpUser,
} from '@/app/api/supabase/service';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  PLACEHOLDER_EMAIL,
  PLACEHOLDER_NICKNAME,
  PLACEHOLDER_PASSWORD,
  PLACEHOLDER_PASSWORD_CHECK,
} from '@/constants/placeholders';
import { PEOPLE } from '@/constants/paths';
import { useState } from 'react';
import { signUpSchema } from '@/lib/schemas/signupSchema';
import Image from 'next/image';
import { toast } from 'react-toastify';

export interface SignUpFormType {
  email: string;
  password: string;
  nickname: string;
  passwordCheck: string;
}

const SignUp = () => {
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

  //구글 로그인 기능 핸들러
  const googleSignin = async () => {
    const error = await signInWithGoogle();

    if (error) toast.warning('구글 로그인에 실패했습니다. 새로고침 후 다시 시도해주세요.');
  };

  //카카오 로그인 기능 핸들러
  const kakaoSignin = async () => {
    const error = await signInWithKakao();

    if (error) toast.warning('로그인 중 오류가 발생했습니다. 새로고침 후 다시 로그인해주세요.');
  };

  return (
    <div className='flex h-[100vh] w-[100vw] items-center justify-center overflow-hidden'>
      <section className='flex w-1/2 flex-col items-center justify-center'>
        <h1 className="mb-10 text-center font-['Pretendard'] text-[28px] font-bold text-[#06F]">사람, 별 회원가입</h1>
        <section className='mb-8'>
          <form onSubmit={handleSubmit(onSignUpHandler)} className='flex flex-col gap-8'>
            <div className='flex flex-col'>
              <div className='flex flex-col justify-start'>
                <label
                  className={`self-stretch font-['Pretendard'] text-sm font-bold leading-[150%] ${formState.errors.nickname ? `text-[#FF4242]` : `text-[#2B2B2B]`}`}
                >
                  이름(닉네임)
                </label>
                <div className='flex flex-row gap-6'>
                  <input
                    className={`flex-1 items-center gap-2 self-stretch rounded-lg border p-4 ${formState.errors.nickname ? `border-[#FF4242] focus:outline-none` : `border-[#B9B9B9] p-4`}`}
                    type='text'
                    id='nickname'
                    maxLength={8}
                    placeholder={PLACEHOLDER_NICKNAME}
                    {...register('nickname')}
                  />
                  <button
                    type='button'
                    className='duration-300" rounded-[8px] border border-gray-600 bg-white px-6 py-4 transition hover:bg-[#06F] hover:text-white'
                    onClick={NicknameDuplicateTestHandler}
                  >
                    중복 검사
                  </button>
                </div>
              </div>
              {formState.errors.nickname ? (
                <span className='self-stretch font-[Pretendard] text-sm font-normal not-italic leading-[150%] text-[#FF4242]'>
                  {formState.errors.nickname.message}
                </span>
              ) : (
                <span className='self-stretch font-[Pretendard] font-normal not-italic leading-[150%] text-[#D0D0D0]'>
                  2자 이상 8자 이하로 입력해주세요.
                </span>
              )}
            </div>

            <div className='flex flex-col'>
              <div className='flex flex-col justify-start'>
                <label
                  className={`self-stretch font-['Pretendard'] text-sm font-bold leading-[150%] ${formState.errors.email ? `text-[#FF4242]` : `text-[#2B2B2B]`}`}
                >
                  아이디(이메일)
                </label>
                <div className='flex flex-row gap-6'>
                  <input
                    className={`flex-1 items-center gap-2 self-stretch rounded-lg border p-4 ${formState.errors.email ? `border-[#FF4242] focus:outline-none` : `border-[#B9B9B9] p-4`}`}
                    type='email'
                    id='email'
                    placeholder={PLACEHOLDER_EMAIL}
                    {...register('email')}
                  />
                  <button
                    type='button'
                    className='duration-300" rounded-[8px] border border-gray-600 bg-white px-6 py-4 transition hover:bg-[#06F] hover:text-white'
                    onClick={EmailDuplicateTestHandler}
                  >
                    중복 검사
                  </button>
                </div>
              </div>
              {formState.errors.email ? (
                <span className='self-stretch font-[Pretendard] text-sm font-normal not-italic leading-[150%] text-[#FF4242]'>
                  {formState.errors.email.message}
                </span>
              ) : (
                <span className='self-stretch font-[Pretendard] font-normal not-italic leading-[150%] text-[#D0D0D0]'>
                  이메일 형식에 맞게 입력해주세요.
                </span>
              )}
            </div>

            <div className='flex flex-col'>
              <div className='flex flex-col justify-start'>
                <label
                  className={`self-stretch font-['Pretendard'] text-sm font-bold leading-[150%] ${formState.errors.password ? `text-[#FF4242]` : `text-[#2B2B2B]`}`}
                >
                  비밀번호
                </label>
                <input
                  className={`flex-1 items-center gap-2 self-stretch rounded-lg border p-4 ${formState.errors.password ? `border-[#FF4242] focus:outline-none` : `border-[#B9B9B9] p-4`}`}
                  type='password'
                  id='password'
                  placeholder={PLACEHOLDER_PASSWORD}
                  {...register('password')}
                />
              </div>
              {formState.errors.password ? (
                <span className='self-stretch font-[Pretendard] text-sm font-normal not-italic leading-[150%] text-[#FF4242]'>
                  {formState.errors.password.message}
                </span>
              ) : (
                <span className='self-stretch font-[Pretendard] font-normal not-italic leading-[150%] text-[#D0D0D0]'>
                  특수문자(!@#$%^&*)를 1개 이상 포함하여 입력해주세요.
                </span>
              )}
            </div>

            <div className='flex flex-col'>
              <div className='flex flex-col justify-start'>
                <label
                  className={`self-stretch font-['Pretendard'] text-sm font-bold leading-[150%] ${formState.errors.passwordCheck ? `text-[#FF4242]` : `text-[#2B2B2B]`}`}
                >
                  비밀번호 확인
                </label>
                <input
                  className={`flex-1 items-center gap-2 self-stretch rounded-lg border p-4 ${formState.errors.passwordCheck ? `border-[#FF4242] focus:outline-none` : `border-[#B9B9B9] p-4`}`}
                  type='password'
                  id='passwordCheck'
                  placeholder={PLACEHOLDER_PASSWORD_CHECK}
                  {...register('passwordCheck')}
                />
              </div>
              {formState.errors.passwordCheck ? (
                <span className='self-stretch font-[Pretendard] text-sm font-normal not-italic leading-[150%] text-[#FF4242]'>
                  {formState.errors.passwordCheck.message}
                </span>
              ) : (
                <span className='self-stretch font-[Pretendard] font-normal not-italic leading-[150%] text-[#D0D0D0]'>
                  비밀번호를 한번 더 입력해주세요.
                </span>
              )}
            </div>
            <button
              type='submit'
              className="duration-600 w-[456px] justify-start rounded-lg bg-[#06F] px-6 py-4 font-['Pretendard'] text-base font-bold not-italic leading-[135%] text-white transition hover:bg-[#EEE] hover:text-[#06F]"
            >
              회원가입
            </button>
          </form>
        </section>
        <section className='flex flex-col items-center justify-center'>
          <div className='mb-[42px] flex items-center gap-1'>
            <div className='w-[150px] outline outline-1 outline-stone-300' />
            <p className='text-base font-bold leading-normal text-zinc-800'>SNS계정으로 간편로그인</p>
            <div className='h-0 w-[150px] outline outline-1 outline-stone-300' />
          </div>
          <div className='flex items-center justify-center gap-[78px]'>
            <button
              type='button'
              onClick={googleSignin}
              className='flex h-[45px] w-[300px] items-center justify-center gap-[10px] rounded-[6px] border-2 border-[#F5F5F5] font-[Pretendard] text-sm font-semibold text-[#595959]'
            >
              <Image src='/google_login_img.png' alt='google login' width={22} height={22} />
              구글계정으로 로그인
            </button>
            <button type='button' onClick={kakaoSignin}>
              <Image src='/kakao_login_img.png' alt='kakao login' width={300} height={45} />
            </button>
          </div>
        </section>
      </section>

      <section className='relative h-full w-1/2'>
        <Image src={'/saram-byeol_img.avif'} alt='metaphor image' fill className='object-contain' />
      </section>
    </div>
  );
};

export default SignUp;
