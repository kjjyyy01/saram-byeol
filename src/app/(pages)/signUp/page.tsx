'use client';

import Image from 'next/image';
import SignupForm from '@/components/signup/SignupForm';
import SigninSocial from '@/components/signin/SigninSocial';

const SignUp = () => {
  return (
    <div className='h-screen w-screen'>
      <div className='flex h-full w-full items-center justify-center overflow-hidden pb-8 pt-4 md:pb-0 md:pt-0'>
        <section className='flex w-full flex-col items-center justify-center'>
          <h1 className='mb-6 text-center text-[28px] font-bold text-primary-500 md:mb-10'>사람, 별 회원가입</h1>
          <section className='mb-6 md:mb-[42px]'>
            <SignupForm />
          </section>

          <section className='flex flex-col items-center justify-center'>
            <div className='mb-6 flex items-center gap-1 md:mb-[42px]'>
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

export default SignUp;
