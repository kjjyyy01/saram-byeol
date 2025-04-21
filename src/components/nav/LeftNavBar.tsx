'use client';

import Link from 'next/link';
import { CALENDER, PEOPLE, SIGNIN } from '@/constants/paths';
import { Users, CalendarBlank, SignOut, Bell } from '@phosphor-icons/react';
import { useAuthStore } from '@/store/zustand/store';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { toast } from 'react-toastify';
import { useDemoStore } from '@/store/zustand/useDemoStore';
import { PLACEHOLDER_PROFILE_IMG } from '@/constants/placeholders';

const LeftNavBar = () => {
  const { user, isSignIn, signOut } = useAuthStore();
  const { isDemoUser, demoUser, clearAll } = useDemoStore();
  const accessUser = isDemoUser ? demoUser.user : user;
  const isAccessGranted = isSignIn || isDemoUser; //로그인하거나, 데모유저일 때 접근가능하도록 함
  const provider = accessUser?.app_metadata.provider;
  const page = usePathname().slice(1);
  const profile = accessUser?.user_metadata.profile_img || PLACEHOLDER_PROFILE_IMG; //이메일 로그인 시 이미지 (아직 여기 값은 없음) //이미지 없을경우 디폴트 이미지

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
      {isAccessGranted ? (
        <div className='flex h-[150px] w-40 flex-col items-center justify-center gap-6 px-5 text-grey-1000'>
          <Bell size={24} />
          <div className='flex flex-row items-center justify-center gap-2'>
            <Image
              src={profile}
              width={48}
              height={48}
              alt='유저 프로필 이미지'
              className='h-12 w-12 rounded-full object-cover'
            />
            {provider !== 'email' ? (
              <div>{accessUser?.user_metadata.name}</div>
            ) : (
              <div>{accessUser?.user_metadata.nickname}</div>
            )}
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
