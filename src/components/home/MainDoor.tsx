'use client';
import Image from 'next/image';
import Link from 'next/link';
import { SIGNIN, PEOPLE } from '@/constants/paths';
import { useDemoStore } from '@/store/zustand/useDemoStore';

const MainDoor = () => {
  const setDemoUser = useDemoStore((state) => state.setDemoUser);

  return (
    <div className='flex flex-col items-center justify-center gap-12'>
      <Image
        src={'/og-image.png'}
        alt='메인 이미지'
        width={1200}
        height={630}
        className='h-full w-full rounded-lg object-cover p-8'
      />
      <Link
        href={SIGNIN}
        className='font-lg inline-flex min-h-12 flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-primary-500 px-6 py-4 text-grey-0 hover:bg-primary-600 active:bg-primary-700'
      >
        사람 별로 지금 바로 로그인
      </Link>
      <Link href={PEOPLE} onClick={setDemoUser}>
        데모체험
      </Link>
    </div>
  );
};

export default MainDoor;
