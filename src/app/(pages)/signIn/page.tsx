'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/zustand/store';
import { signInUser, signInWithGoogle, signInWithKakao } from '@/app/api/supabase/service';
import { PLACEHOLDER_EMAIL, PLACEHOLDER_PASSWORD } from '@/constants/placeholders';
import { PEOPLE, SIGNUP } from '@/constants/paths';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInSchema } from '@/lib/schemas/signinSchema';
import { z } from 'zod';
import Link from 'next/link';
import Image from 'next/image';

export type SignInFormType = z.infer<typeof signInSchema>;

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
      alert(`로그인되었습니다.'내 사람' 페이지로 이동합니다.`);
      setUser(data.session.user);
      router.push(PEOPLE);
    } else if (error) {
      alert('아이디 또는 비밀번호를 확인해주세요.');
    }
  };

  //구글 로그인 기능 핸들러
  const googleSignin = async () => {
    const error = await signInWithGoogle();

    if (error) alert('구글 로그인에 실패했습니다. 새로고침 후 다시 시도해주세요.');
  };

  //카카오 로그인 기능 핸들러
  const kakaoSignin = async () => {
    const error = await signInWithKakao();

    if (error) alert('로그인 중 오류가 발생했습니다. 새로고침 후 다시 로그인해주세요.');
  };

  const alreadyService = () => {
    alert('아직 준비중인 기능입니다.');
  };

  return (
    <div className='flex h-[100vh] w-[100vw] items-center justify-center overflow-hidden'>
      <section className='flex w-1/2 flex-col items-center justify-center'>
        <h1 className="mb-10 text-center font-['Pretendard'] text-[28px] font-bold text-[#06F]">사람, 별 로그인</h1>
        <section className='mb-8'>
          <form onSubmit={handleSubmit(onSignInHandler)} className='flex flex-col gap-8'>
            <div className='flex flex-col'>
              <div className='flex flex-col justify-start'>
                <label
                  className={`self-stretch font-['Pretendard'] text-sm font-bold leading-[150%] ${formState.errors.email ? `text-[#FF4242]` : `text-[#2B2B2B]`}`}
                  htmlFor='email'
                >
                  아이디(이메일)
                </label>
                <input
                  className={`flex-1 items-center gap-2 self-stretch rounded-lg border p-4 ${formState.errors.email ? `border-[#FF4242] focus:outline-none` : `border-[#B9B9B9] p-4`}`}
                  type='email'
                  id='email'
                  placeholder={PLACEHOLDER_EMAIL}
                  {...register('email')}
                />
              </div>
              {formState.errors.email && (
                <span className='self-stretch font-[Pretendard] text-sm font-normal not-italic leading-[150%] text-[#FF4242]'>
                  {formState.errors.email.message}
                </span>
              )}
            </div>
            <div className='flex flex-col'>
              <div className='flex flex-col justify-start'>
                <label
                  className={`self-stretch font-['Pretendard'] text-sm font-bold leading-[150%] ${formState.errors.password ? `text-[#FF4242]` : `text-[#2B2B2B]`}`}
                  htmlFor='password'
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
              {formState.errors.password && (
                <span className='self-stretch font-[Pretendard] text-sm font-normal not-italic leading-[150%] text-[#FF4242]'>
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
              className="duration-600 w-[456px] justify-start rounded-lg bg-[#06F] px-6 py-4 font-['Pretendard'] text-base font-bold not-italic leading-[135%] text-white transition hover:bg-[#EEE] hover:text-[#06F]"
            >
              로그인
            </button>
          </form>
        </section>

        <section className='flex flex-col items-center justify-center'>
          <div className='mb-[42px] flex'>
            <p className='mr-1'>아이디가 없으신가요?</p>
            <Link href={SIGNUP} className='text-[#06F]'>
              회원가입
            </Link>
          </div>
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
              <Image src='/google_login_img.png' alt='google login img' width={22} height={22} />
              구글계정으로 로그인
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
