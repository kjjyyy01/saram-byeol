'use client';
import MainCalendar from '@/components/calendar/MainCalendar';
import UpcomingPlans from '@/components/schedule/UpcomingPlans';
import { SIGNIN } from '@/constants/paths';
import { useAuthStore } from '@/store/zustand/store';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';

export default function Calendar() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const isSignIn = useAuthStore((state) => state.isSignIn);
  const [hasMounted, setHasMounted] = useState(false);

  // 마운트 이후에만 렌더링
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // 마운트 전, 로그아웃 상태 감지 막기
  useEffect(() => {
    if (hasMounted && !isSignIn) {
      router.replace(SIGNIN);
    }
  }, [hasMounted, isSignIn, router]);

  if (!hasMounted) return null;
  if (!isSignIn) return null;

  return (
    <div className='flex flex-col gap-4 p-4 md:flex-row'>
      <div className='md:flex-grow'>
        <MainCalendar />
      </div>
      <div className='flex-shrink-0 md:w-auto'>{user?.id && <UpcomingPlans userId={user.id} />}</div>
    </div>
  );
}
