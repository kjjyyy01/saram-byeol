'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getUserPlans } from '@/app/api/supabase/service';
import UpcomingPlanCard from '@/components/schedule/UpcomingPlanCard';
import { QUERY_KEY } from '@/constants/queryKey';
import { SelectPlanType } from '@/types/plans';
import { useDemoStore } from '@/store/zustand/useDemoStore';
import Loading from '@/components/Loading';

interface UpcomingPlansProps {
  userId: string;
  onSelectPlan: (plan: SelectPlanType) => void;
}

const UpcomingPlans = ({ userId, onSelectPlan }: UpcomingPlansProps) => {
  const { isDemoUser, getPlanInMonth } = useDemoStore();
  
  // Tanstack Query 사용해서 데이터 페칭
  const {
    data = [],
    isPending,
    error,
  } = useQuery({
    queryKey: [QUERY_KEY.PLANS, userId],
    queryFn: () => getUserPlans(userId),
    staleTime: 1000 * 60 * 60 * 24, // 하루 동안 신선한 상태 유지
    refetchOnWindowFocus: false, // 창 포커스시 자동 리패치 비활성화
    enabled: !!userId && !isDemoUser,
  });
  
  //데모 약속 불러오기 처리 
  const { filterdData } = getPlanInMonth();
  const sortedFiteredData = filterdData.sort(
    (a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime()
  );
  const plans = isDemoUser ? sortedFiteredData : data;

  if (isPending && !isDemoUser)
    return (
      <div className='p-4 text-center'>
        <Loading />
      </div>
    );
  if (error) return <div className='p-4 text-red-500'>계획을 불러오는 중 오류가 발생했습니다.</div>;
  if (!plans || plans.length === 0)
    return <div className='p-4 text-center'>향후 30일 내에 예정된 일정이 없습니다.</div>;

  return (
    <div className='max-h-[calc(100vh-2rem)] space-y-4 overflow-visible'>
      <h2 className='mb-4 text-xl font-bold'>다가오는 약속</h2>
      <div className='space-y-3'>
        {plans.map((plan) => (
          <div key={plan.plan_id} onClick={() => onSelectPlan(plan)} className='cursor-pointer'>
            <UpcomingPlanCard plan={plan} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingPlans;
