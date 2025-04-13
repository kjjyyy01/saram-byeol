'use client';

import Link from 'next/link';
import { CALENDER, PEOPLE } from '@/constants/paths';
import { Users, CalendarBlank, SignOut, Bell } from '@phosphor-icons/react';
import { useAuthStore } from '@/store/zustand/store';
import Image from 'next/image';

const LeftNavBar = () => {
  const { user, isSignIn, signOut } = useAuthStore();
  return (
    <nav className='flex flex-col'>
      <Link href={PEOPLE}>
        <div className='w-40 h-[150px] flex flex-col justify-center items-center gap-2 px-5'>
          <Users size={24} />
          내사람
        </div>
      </Link>
      <Link href={CALENDER}>
        <div className='w-40 h-[150px] flex flex-col justify-center items-center gap-2 px-5'>
          <CalendarBlank size={24} />
          캘린더
        </div>
      </Link>
      <div className='w-40 h-[150px] flex flex-col justify-center items-center gap-2 px-5' onClick={() => signOut()}>
        <SignOut size={24} />
        로그아웃
      </div>
      {/* 로그인된 상태일 때만 보여줌 */}
      {/* {isSignIn && ( */}
      <div className='w-40 h-[150px] text-black flex flex-col justify-center items-center gap-6 px-5'>
        <Bell size={24} />
        <div className='flex flex-row justify-center gap-2 items-center'>
            <Image
              src={
                'http://img1.kakaocdn.net/thumb/R640x640.q70/?fname=http://t1.kakaocdn.net/account_images/default_profile.jpeg'
              }
              width={48}
              height={48}
              alt='유저 프로필 이미지'
              className='w-12 h-12 rounded-full object-cover'
            />
          {/* <div>{user?.user_metadata.nickname}</div>  */}
          <div>닉네임위치글자수제한</div>
        </div>
      </div>
      {/* )} */}
    </nav>
  );
};

export default LeftNavBar;
