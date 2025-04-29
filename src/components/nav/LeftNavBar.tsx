'use client';

import Link from 'next/link';
import { CALENDER, HOME, PEOPLE, SIGNIN } from '@/constants/paths';
import { Users, CalendarBlank, SignOut, ImagesSquare } from '@phosphor-icons/react';
import { useAuthStore } from '@/store/zustand/store';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { toast } from 'react-toastify';
import { useDemoStore } from '@/store/zustand/useDemoStore';
import { PLACEHOLDER_PROFILE_IMG } from '@/constants/placeholders';

const LeftNavBar = () => {
  const { user, isSignIn, signOut } = useAuthStore();
  const { isDemoUser, demoUser, clearAll } = useDemoStore();
  const accessUser = isDemoUser ? demoUser : user;
  const provider = accessUser?.app_metadata?.provider;
  const page = usePathname().slice(1);
  const profile = accessUser?.user_metadata?.profile_img || PLACEHOLDER_PROFILE_IMG;
  const isAccessGranted = isSignIn || isDemoUser;

  const logoutHandler = async () => {
    if (isDemoUser) {
      toast.info('데모 체험을 종료합니다');
      signOut();
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
  const notifyHandler = () => {
    toast.warning('준비중입니다.');
    return;
  };

  return (
    <nav className='mr-4 flex h-full'>
      <div className='flex flex-col items-center justify-between pb-24 pt-8'>
        <div className='py-8'>
          <Link href={HOME}>
            <Image src={'/nav/app-logo.png'} width={80} height={80} alt='app logo' />
          </Link>
        </div>
        <div>
          <Link href={PEOPLE}>
            <div
              className={`flex h-36 w-36 flex-col items-center justify-center gap-2 bg-grey-0 px-5 ${page === 'people' ? 'pointer-events-none cursor-default bg-primary-500 text-grey-0' : 'hover: cursor-pointer hover:bg-grey-50'}`}
            >
              <Users size={24} />
              내사람
            </div>
          </Link>
          <Link href={CALENDER}>
            <div
              className={`flex h-36 w-36 flex-col items-center justify-center gap-2 bg-grey-0 px-5 ${page === 'calendar' ? 'pointer-events-none cursor-default bg-primary-500 text-grey-0' : 'hover: cursor-pointer hover:bg-grey-50'}`}
            >
              <CalendarBlank size={24} />
              캘린더
            </div>
          </Link>
          <button onClick={notifyHandler}>
            <div
              className={
                'flex h-36 w-36 cursor-pointer flex-col items-center justify-center gap-2 bg-grey-0 px-5 hover:bg-grey-50'
              }
            >
              <ImagesSquare size={24} />
              추억 앨범
            </div>
          </button>
        </div>
        <div>
          {isAccessGranted ? (
            <div className='flex w-36 flex-col items-center justify-center gap-6 px-5 text-grey-1000'>
              <div className='flex flex-col items-center justify-center gap-2 text-center'>
                <Image
                  src={profile}
                  width={40}
                  style={{ height: 'auto' }}
                  alt='유저 프로필 이미지'
                  className='h-10 w-10 rounded-full object-cover'
                />
                {provider !== 'email' ? (
                  <div>{accessUser?.user_metadata?.name}</div>
                ) : (
                  <div>{accessUser?.user_metadata?.nickname}</div>
                )}
              </div>
              <div
                className={`flex h-auto w-auto cursor-pointer flex-row items-center justify-center gap-2 p-2 text-base hover:font-bold hover:text-primary-500`}
                onClick={logoutHandler}
              >
                <SignOut size={20} />
                {isDemoUser ? <p>데모 종료</p> : <p>로그아웃</p>}
              </div>
            </div>
          ) : (
            <Link href={SIGNIN}>
              <div className='flex h-36 w-36 items-center justify-center hover:bg-grey-50'>로그인하러가기</div>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default LeftNavBar;
