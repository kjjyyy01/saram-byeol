'use client';
import Image from 'next/image';
import Link from 'next/link';
import { SIGNIN } from '@/constants/paths';

const MainDoor = () => {
  return (
    <div className='flex flex-col justify-center items-center gap-12'>
      <Image src={'/og-image.png'} alt='메인 이미지' width={1200} height={630} className='h-full w-full object-cover p-8 rounded-lg' />
      <Link
        href={SIGNIN}
        className='inline-flex min-h-12 flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-primary-500 px-6 py-4 hover:bg-primary-600 active:bg-primary-700 text-grey-0 font-lg'
      > 사람 별로 지금 바로 로그인</Link>
    </div>
  );
};

export default MainDoor;
