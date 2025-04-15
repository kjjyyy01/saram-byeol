'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/zustand/store';
import { signInUser, signInWithGoogle, signInWithKakao } from '@/app/api/supabase/service';
import { PLACEHOLDER_EMAIL, PLACEHOLDER_PASSWORD } from '@/constants/placeholders';
import { PEOPLE, SIGNUP } from '@/constants/paths';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInSchema } from '@/lib/schemas/signinSchema';
import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'react-toastify';

export interface SignInFormType {
  email: string;
  password: string;
}

const SignIn = () => {
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

  const alreadyService = () => {
    toast.info('아직 준비중인 기능입니다.');
  };

  return (
    <div className='flex h-[100vh] w-[100vw] items-center justify-center overflow-hidden overflow-y-auto'>
      <section className='flex w-1/2 flex-col items-center justify-center'>
        <h1 className='mb-10 text-center text-[28px] font-bold text-primary-500'>사람, 별 로그인</h1>
        <section className='mb-8'>
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
        </section>

        <section className='flex flex-col items-center justify-center'>
          <div className='mb-[42px] flex'>
            <p className='mr-2'>아이디가 없으신가요?</p>
            <Link href={SIGNUP} className='text-primary-500'>
              회원가입
            </Link>
          </div>
          <div className='mb-[42px] flex items-center gap-1'>
            <div className='w-[150px] outline outline-1 outline-stone-300' />
            <p className='text-base font-bold leading-normal text-zinc-800'>SNS계정으로 간편로그인</p>
            <div className='h-0 w-[150px] outline outline-1 outline-stone-300' />
          </div>
          <div className='flex items-center justify-center gap-[78px]'>
            <button type='button' onClick={googleSignin}>
              <Image src='/google_login_img.png' alt='google login img' width={300} height={45} />
            </button>
            <button type='button' onClick={kakaoSignin}>
              <Image src='/kakao_login_img.png' alt='kakao login img' width={300} height={45} />
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

export default SignIn;
