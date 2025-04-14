'use client';

import { getUserPlans } from '@/app/api/supabase/service';
import { PlansType } from '@/types/plans';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

interface UpcomingPlansProps {
  userId: string;
}

const UpcomingPlans = ({ userId }: UpcomingPlansProps) => {
  // Tanstack Query 사용해서 데이터 페칭
  const {
    data: plans = [],
    isPending,
    error,
  } = useQuery({
    queryKey: ['plans', userId],
    queryFn: () => getUserPlans(userId),
    staleTime: 1000 * 60 * 5, // 5분 동안 신선한 상태 유지
    refetchOnWindowFocus: false, // 창 포커스시 자동 리패치 비활성화
  });

  React.useEffect(() => {
    if (plans.length > 0) {
      console.log('getUserPlans로 가져온 데이터:', plans);
      // 각 계획의 날짜 형식도 확인
      plans.forEach((plan, index) => {
        console.log(`Plan ${index + 1} - ID: ${plan.plan_id}, 날짜: ${plan.start_date}, 제목: ${plan.title}`);
      });
    }
  }, [plans]);

  // 간단한 날짜 포맷팅 함수 (n월 m일)
  const formatDateShort = (dateString: string): string => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}월 ${date.getDate()}일`;
  };

  // 날짜 포맷팅 함수
  const formatDateFull = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }).format(date);
  };

  // 오늘 날짜인지 확인하는 함수
  const isToday = (dateString: string): boolean => {
    const today = new Date();
    const planDate = new Date(dateString);
    return (
      planDate.getDate() === today.getDate() &&
      planDate.getMonth() === today.getMonth() &&
      planDate.getFullYear() === today.getFullYear()
    );
  };

  // D-day 계산 함수
const calculateDday = (dateString: string): string => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // 오늘 날짜의 시작점 (자정)

  const planDate = new Date(dateString);
  // 계획 날짜의 시작점 (시간 정보 무시하고 날짜만 비교)
  const planDateOnly = new Date(planDate.getFullYear(), planDate.getMonth(), planDate.getDate());
  planDateOnly.setHours(0, 0, 0, 0);

  const diffTime = planDateOnly.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return 'D-Day';
  } else if (diffDays > 0) {
    return `D-${diffDays}`;
  } else {
    return `D+${Math.abs(diffDays)}`; // 지난 날짜의 경우
  }
};

  if (isPending) return <div className='p-4 text-center'>불러오는 중...</div>;
  if (error) return <div className='p-4 text-red-500'>계획을 불러오는 중 오류가 발생했습니다.</div>;
  if (!plans || plans.length === 0)
    return <div className='p-4 text-center'>향후 30일 내에 예정된 일정이 없습니다.</div>;

  return (
    <div className='max-h-[calc(100vh-2rem)] space-y-4 overflow-auto'>
    <h2 className='mb-4 text-xl font-bold'>다가오는 일정</h2>
    <div className='space-y-3'>
      {plans.map((plan) => {
        const todayPlan = isToday(plan.start_date);
        
        return (
          <div
            key={plan.plan_id}
            className={`h-36 w-96 rounded-lg border p-4 shadow-sm transition-all hover:shadow-md ${
              todayPlan ? 'border-yellow-400 bg-[#FFF4C7]' : 'border-gray-200'
            }`}
          >
            {/* 상단에 날짜 표시 */}
            <div className='text-md mb-2 font-medium text-gray-500'>{formatDateShort(plan.start_date)}</div>

            {/* D-day와 제목 표시 */}
            <div className='mb-2 flex items-center'>
              <span className='text-md mr-2 rounded px-2 py-1 font-bold'>
                {calculateDday(plan.start_date)}
              </span>
              <h3 className='text-lg font-semibold'>{plan.title}</h3>
            </div>
          </div>
        );
      })}
    </div>
  </div>
  );
};

export default UpcomingPlans;
