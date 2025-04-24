import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import { PEOPLE, SIGNIN } from '@/constants/paths';
import { useDemoStore } from '@/store/zustand/useDemoStore';

interface Props {
  onNavClick: (key: 'about' | 'function' | 'subscription') => void;
}

const MainHeader = ({ onNavClick }: Props) => {
  const setDemoUser = useDemoStore((state) => state.setDemoUser);
  return (
    <div className='fixed box-border flex h-24 w-full items-center justify-center'>
      <div className='container flex flex-row items-center justify-between px-6'>
        <Image
          src={'/home/app-logo-icon-noShadow.png'}
          alt='app-logo-icon'
          width={88}
          height={85}
          className='rounded-[20px] shadow-app-logo'
        />
        <div className='flex flex-row items-center justify-center gap-14 text-2xl font-bold'>
          <div onClick={() => onNavClick('about')} className='cursor-pointer'>
            사람별이란?
          </div>
          <div onClick={() => onNavClick('function')} className='cursor-pointer'>
            기능소개
          </div>
          <div onClick={() => onNavClick('subscription')} className='cursor-pointer'>
            구독
          </div>
        </div>
        <div className='flex flex-row items-center justify-center gap-6'>
          <Link href={SIGNIN}>로그인</Link>
          <Link
            href={PEOPLE}
            className='box-border h-14 w-[180px] rounded-lg bg-primary-500 px-6 py-4 text-center font-bold text-grey-0 hover:bg-primary-600 active:bg-primary-700'
            onClick={setDemoUser}
          >
            지금 데모 체험하기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainHeader;
