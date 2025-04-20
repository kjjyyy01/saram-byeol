'use client';

import Link from 'next/link';
import { CALENDER, PEOPLE, SIGNIN } from '@/constants/paths';
import { Users, CalendarBlank, SignOut, Bell } from '@phosphor-icons/react';
import { useAuthStore } from '@/store/zustand/store';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { toast } from 'react-toastify';
import { useDemoStore } from '@/store/zustand/useDemoStore';

const LeftNavBar = () => {
  const { user, isSignIn, signOut } = useAuthStore();
  const isDemoUser = useDemoStore((state) => state.isDemoUser);
  const clearAll = useDemoStore((state) => state.clearAll);
  const provider = user?.app_metadata.provider;
  const pathName = usePathname();
  const page = pathName.slice(1);

  const logoutHandler = () => {
    if (isDemoUser) {
      toast.info('데모 체험을 종료합니다');
      clearAll();
      return;
    }
    if (!isSignIn) {
      toast.info('이미 로그아웃 상태입니다.');
      return;
    }
    const ok = confirm('정말 로그아웃 하시겠습니까?');
    if (!ok) return;
    signOut();
  };

  return (
    <nav className='flex flex-col'>
      <Link href={PEOPLE}>
        <div
          className={`flex h-[150px] w-40 flex-col items-center justify-center gap-2 bg-grey-0 px-5 ${page === 'people' ? 'pointer-events-none cursor-default bg-primary-500 text-grey-0' : 'hover: cursor-pointer hover:bg-grey-50'}`}
        >
          <Users size={24} />
          내사람
        </div>
      </Link>
      <Link href={CALENDER}>
        <div
          className={`flex h-[150px] w-40 flex-col items-center justify-center gap-2 bg-grey-0 px-5 ${page === 'calendar' ? 'pointer-events-none cursor-default bg-primary-500 text-grey-0' : 'hover: cursor-pointer hover:bg-grey-50'}`}
        >
          <CalendarBlank size={24} />
          캘린더
        </div>
      </Link>
      <div
        className={`nav-cell hover: flex h-[150px] w-40 cursor-pointer flex-col items-center justify-center gap-2 px-5 hover:bg-grey-50`}
        onClick={logoutHandler}
      >
        <SignOut size={24} />
        {isDemoUser ? '데모 종료' : '로그아웃'}
      </div>

      {/* 로그인된 상태일 때만 보여줌 */}
      {isSignIn ? (
        <div className='flex h-[150px] w-40 flex-col items-center justify-center gap-6 px-5 text-grey-1000'>
          <Bell size={24} />
          <div className='flex flex-row items-center justify-center gap-2'>
            <Image
              src={
                'http://img1.kakaocdn.net/thumb/R640x640.q70/?fname=http://t1.kakaocdn.net/account_images/default_profile.jpeg'
              }
              width={48}
              height={48}
              alt='유저 프로필 이미지'
              className='h-12 w-12 rounded-full object-cover'
            />
            {provider !== 'email' ? <div>{user?.user_metadata.name}</div> : <div>{user?.user_metadata.nickname}</div>}
          </div>
        </div>
      ) : (
        <Link href={SIGNIN}>
          <div className='flex h-[150px] w-40 items-center justify-center hover:bg-grey-50'>로그인하러가기</div>
        </Link>
      )}
    </nav>
  );
};

export default LeftNavBar;

