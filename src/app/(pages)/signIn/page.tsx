'use client';

import { PEOPLE, SIGNUP } from '@/constants/paths';
import Link from 'next/link';
import Image from 'next/image';
import SigninForm from '@/components/signin/SigninForm';
import SigninSocial from '@/components/signin/SigninSocial';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuthStore } from '@/store/zustand/store';

const SignIn = () => {
  const router = useRouter();
  const isSignin = useAuthStore((state) => state.isSignIn);

  useEffect(() => {
    if (isSignin) {
      router.replace(PEOPLE);
    }
  }, [isSignin, router]);

  return (
    <div className='h-screen w-screen'>
      <div className='flex h-full w-full items-center justify-center overflow-hidden pb-8 pt-4 md:pb-0 md:pt-0'>
        <section className='flex w-full flex-col items-center justify-center'>
          <h1 className='mb-10 text-center text-[28px] font-bold text-primary-500'>사람, 별 로그인</h1>
          <section className='mb-8 md:mb-6'>
            <SigninForm />
          </section>

          <section className='flex flex-col items-center justify-center'>
            <div className='mb-[45px] flex md:mb-[42px]'>
              <p className='mr-2 text-sm md:text-base'>아이디가 없으신가요?</p>
              <Link href={SIGNUP} className='text-sm text-primary-500 md:text-base'>
                회원가입
              </Link>
            </div>
            <div className='mb-[39.5px] flex items-center gap-1 md:mb-[42px]'>
              <div className='w-[77.5px] outline outline-1 outline-stone-300 md:w-[150px]' />
              <p className='text-nowrap text-base font-bold text-zinc-800'>SNS계정으로 간편로그인</p>
              <div className='w-[77.5px] outline outline-1 outline-stone-300 md:w-[150px]' />
            </div>
            <SigninSocial />
          </section>
        </section>

        <section className='hidden md:flex md:h-full md:w-full md:items-center md:justify-center lg:flex'>
          <Image
            src={'/saram-byeol_img.avif'}
            alt='metaphor image'
            width={950}
            height={1080}
            className='mx-auto object-contain'
          />
        </section>
      </div>
    </div>
  );
};

export default SignIn;
