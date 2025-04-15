'use client';

import React from 'react';
import { PlansType } from '@/types/plans';
import { formatDateShort, isToday, calculateDday } from '@/lib/utils/dateUtils';

interface PlanCardProps {
  plan: PlansType;
}

const PlanCard: React.FC<PlanCardProps> = ({ plan }) => {
  const todayPlan = isToday(plan.start_date);
  
  return (
    <div
      className={`h-36 w-96 rounded-lg border p-4 shadow-sm transition-all hover:shadow-md ${
        todayPlan ? 'border-yellow-400 bg-[#FFF4C7]' : 'border-gray-200'
      }`}
    >
      {/* 상단에 날짜 표시 */}
      <div className='text-md mb-2 font-medium text-gray-500'>
        {formatDateShort(plan.start_date)}
      </div>

      {/* D-day와 제목 표시 */}
      <div className='mb-2 flex items-center'>
        <span className='text-md mr-2 rounded px-2 py-1 font-bold flex-shrink-0'>
          {calculateDday(plan.start_date)}
        </span>
        <h3 className='text-lg font-semibold'>{plan.title}</h3>
      </div>
    </div>
  );
};

export default PlanCard;