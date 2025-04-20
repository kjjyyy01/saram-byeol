'use client';

import Image from 'next/image';
import SignupForm from '@/components/signup/SignupForm';
import SigninSocial from '@/components/signin/SigninSocial';

const SignUp = () => {
  return (
    <div className='flex h-[100vh] w-[100vw] items-center justify-center overflow-y-auto'>
      <section className='flex w-full flex-col items-center justify-center'>
        <h1 className='mb-10 text-center text-[28px] font-bold text-primary-500'>사람, 별 회원가입</h1>
        <section className='mb-8'>
          <SignupForm />
        </section>
        <section className='mt-10 flex flex-col items-center justify-center'>
          <div className='mb-[42px] flex items-center gap-1'>
            <div className='w-[150px] outline outline-1 outline-stone-300' />
            <p className='text-base font-bold leading-normal text-zinc-800'>SNS계정으로 간편로그인</p>
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

export default SignUp;
