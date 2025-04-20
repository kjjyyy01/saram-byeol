'use client';

import { SIGNUP } from '@/constants/paths';
import Link from 'next/link';
import Image from 'next/image';
import SigninForm from '@/components/signin/SigninForm';
import SigninSocial from '@/components/signin/SigninSocial';

const SignIn = () => {
  return (
    <div className='flex h-[100vh] w-[100vw] items-center justify-center overflow-hidden overflow-y-auto'>
      <section className='flex w-full flex-col items-center justify-center'>
        <h1 className='mb-10 text-center text-[28px] font-bold text-primary-500'>사람, 별 로그인</h1>
        <section className='mb-8'>
          <SigninForm />
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
            <p className='text-nowrap text-base font-bold leading-normal text-zinc-800'>SNS계정으로 간편로그인</p>
            <div className='h-0 w-[150px] outline outline-1 outline-stone-300' />
          </div>
          <SigninSocial />
        </section>
      </section>

      <section className='relative h-full w-full'>
        <Image src={'/saram-byeol_img.avif'} alt='metaphor image' fill className='object-contain' />
      </section>
    </div>
  );
};

export default SignIn;
