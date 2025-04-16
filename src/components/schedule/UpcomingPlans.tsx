'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getUserPlans } from '@/app/api/supabase/service';
import UpcomingPlanCard from '@/components/schedule/UpcomingPlanCard';
import { QUERY_KEY } from '@/constants/queryKey';

interface UpcomingPlansProps {
  userId: string;
}

const UpcomingPlans: React.FC<UpcomingPlansProps> = ({ userId }) => {
  // Tanstack Query 사용해서 데이터 페칭
  const {
    data: plans = [],
    isPending,
    error,
  } = useQuery({
    queryKey: [QUERY_KEY.PLANS, userId],
    queryFn: () => getUserPlans(userId),
    staleTime: 1000 * 60 * 60 * 24, // 하루 동안 신선한 상태 유지
    refetchOnWindowFocus: false, // 창 포커스시 자동 리패치 비활성화
  });

  if (isPending) return <div className='p-4 text-center'>불러오는 중...</div>;
  if (error) return <div className='p-4 text-red-500'>계획을 불러오는 중 오류가 발생했습니다.</div>;
  if (!plans || plans.length === 0)
    return <div className='p-4 text-center'>향후 30일 내에 예정된 일정이 없습니다.</div>;

  return (
    <div className='max-h-[calc(100vh-2rem)] space-y-4 overflow-auto'>
      <h2 className='mb-4 text-xl font-bold'>다가오는 일정</h2>
      <div className='space-y-3'>
        {plans.map((plan) => (
          <UpcomingPlanCard key={plan.plan_id} plan={plan} />
        ))}
      </div>
    </div>
  );
};

export default UpcomingPlans;
