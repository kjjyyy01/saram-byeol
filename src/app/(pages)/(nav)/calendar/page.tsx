'use client';
import MainCalendar from '@/components/calendar/MainCalendar';
import SelectPlan from '@/components/calendar/SelectPlan';
import PlanForm from '@/components/plans/PlanForm';
import UpcomingPlans from '@/components/schedule/UpcomingPlans';
import { SIGNIN } from '@/constants/paths';
import { useAuthStore } from '@/store/zustand/store';
import { SelectPlanstType } from '@/types/plans';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';

export default function Calendar() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const isSignIn = useAuthStore((state) => state.isSignIn);
  const [hasMounted, setHasMounted] = useState(false);
  const [selectPlan, setSelectPlan] = useState<SelectPlanstType[] | null>(null);
  const [showUpcoming, setShowUpcoming] = useState(true);
  const [showPlanForm, setShowPlanForm] = useState(false);

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
        <MainCalendar
          setSelectPlan={(plan) => {
            setSelectPlan(plan);
            setShowUpcoming(false); // 약속 선택 시 upcoming 닫기
            setShowPlanForm(false); // 다른 거 열릴 땐 폼 닫기
          }}
          CustomToolbarProps={{
            onShowUpcomingPlans: () => {
              setSelectPlan(null); // 기존 선택 약속 제거
              setShowUpcoming(true); // upcoming 보여주기
              setShowPlanForm(false); // 다른 거 열릴 땐 폼 닫기
            },
            onAddPlan: () => {
              setSelectPlan(null);
              setShowUpcoming(false);
              setShowPlanForm(true); // 👉 PlanForm 열기
            },
          }}
        />
      </div>
      <div className='flex-shrink-0 md:w-auto'>
        {showPlanForm && (
          <>
            <h2 className='mb-4 text-xl font-bold'>약속 추가</h2>
            <div className='m-5'>
              <PlanForm />
            </div>
          </>
        )}
        {selectPlan ? (
          <>
            <h2 className='mb-4 text-xl font-bold'>약속 디테일</h2>
            <div className='m-12'>
              <SelectPlan plans={selectPlan} />
            </div>
          </>
        ) : (
          showUpcoming && user?.id && <UpcomingPlans userId={user.id} />
        )}
      </div>
    </div>
  );
}
