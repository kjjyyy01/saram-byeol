import Image from 'next/image';
import React from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';
import { SIGNIN } from '@/constants/paths';

interface Props {
  onNavClick: (key: 'about' | 'function' | 'subscription') => void;
}
const MainHeader = ({ onNavClick }: Props) => {
  return (
    <div className='fixed box-border flex h-24 w-full items-center justify-center'>
      <div className='container flex flex-row items-center justify-between px-6'>
        <Image
          src={'/home/app-logo-icon-noShadow.png'}
          alt='app-logo-icon'
          width={88}
          height={85}
          className='shadow-app-logo rounded-[20px]'
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
          <Button className='box-border h-[54px] w-[180px] rounded-lg bg-primary-500 px-6 py-4 font-bold hover:bg-primary-600 active:bg-primary-700'>
            지금 무료로 시작하기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MainHeader;
