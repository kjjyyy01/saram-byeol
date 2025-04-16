'use client';
import MainCalendar from '@/components/calendar/MainCalendar';
import SelectPlan from '@/components/calendar/SelectPlan';
import PlanForm from '@/components/plans/PlanForm';
import EditPlanForm from '@/components/contactDetail/editPlanForm/EditPlanForm';
import UpcomingPlans from '@/components/schedule/UpcomingPlans';
import { SIGNIN } from '@/constants/paths';
import { useAuthStore } from '@/store/zustand/store';
import { SelectPlanType } from '@/types/plans';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';

export default function Calendar() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const isSignIn = useAuthStore((state) => state.isSignIn);

  const [hasMounted, setHasMounted] = useState(false); //페이지 마운트 여부
  const [selectPlan, setSelectPlan] = useState<SelectPlanType[] | null>(null); // 선택된 약속 바

  const [showUpcoming, setShowUpcoming] = useState(true); // 다가오는 약속
  const [showPlanForm, setShowPlanForm] = useState(false); // 약속 추가

  const [editPlan, setEditPlan] = useState<SelectPlanType | null>(null); // 약속 상세-수정
  const [isEditMode, setIsEditMode] = useState(false); // 약속 수정 모드

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

  if (!hasMounted || !isSignIn) return null;

  return (
    <div className='flex flex-col gap-4 p-4 md:flex-row'>
      <div className='md:flex-grow'>
        <MainCalendar
          setSelectPlan={(plan) => {
            setSelectPlan(plan);
            setShowUpcoming(false); // 약속 선택 시 upcoming 닫기
            setShowPlanForm(false); // 다른 거 열릴 땐 폼 닫기
            setIsEditMode(false);
            setEditPlan(null);
          }}
          CustomToolbarProps={{
            onShowUpcomingPlans: () => {
              setSelectPlan(null); // 기존 선택 약속 제거
              setShowUpcoming(true); // upcoming 보여주기
              setShowPlanForm(false); // 다른 거 열릴 땐 폼 닫기
              setIsEditMode(false);
              setEditPlan(null);
            },
            onAddPlan: () => {
              setSelectPlan(null);
              setShowUpcoming(false);
              setShowPlanForm(true); // PlanForm 열기
              setIsEditMode(false);
              setEditPlan(null);
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

        {isEditMode && editPlan ? (
          <>
            <h2 className='mb-4 text-xl font-bold'>약속 수정</h2>
            <div className='m-5'>
              <EditPlanForm
                plan={editPlan}
                onClose={() => {
                  setIsEditMode(false);
                  setEditPlan(null);
                  setSelectPlan(null);
                }}
              />
            </div>
          </>
        ) : selectPlan ? (
          <>
            <h2 className='mb-4 text-xl font-bold'>약속 디테일</h2>
            <div className='p-12'>
              <SelectPlan
                plans={selectPlan}
                onEdit={() => {
                  setIsEditMode(true);
                  setEditPlan(selectPlan[0]); // 첫 번째 plan 기준
                }}
              />
            </div>
          </>
        ) : (
          showUpcoming && user?.id && <UpcomingPlans userId={user.id} />
        )}
      </div>
    </div>
  );
}
