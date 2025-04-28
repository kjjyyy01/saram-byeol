'use client';

import React from 'react';
import { PlansType } from '@/types/plans';
import { formatDateShort, calculateDday } from '@/lib/utils/dateUtils';

interface UpcomingPlanCardProps {
  plan: PlansType;
}

const UpcomingPlanCard = ({ plan }: UpcomingPlanCardProps) => {
  
  return (
    <div className="relative flex h-36 w-96 rounded-lg border shadow-sm transition-all hover:shadow-md overflow-hidden">
      {/* 왼쪽 색상 막대 추가 */}
      <div 
        className="w-1 h-full flex-shrink-0" 
        style={{ backgroundColor: plan.colors }}
      />
      
      <div className={'flex-1 p-4'}>
        {/* 상단에 날짜 표시 */}
        <div className='text-md mb-2 font-medium text-grey-500'>
          {formatDateShort(plan.start_date)}
        </div>

        {/* D-day와 제목 표시 */}
        <div className='mb-2 flex items-center'>
          <span className='text-md mr-2 rounded px-2 py-1 font-bold flex-shrink-0'>
            {calculateDday(plan.start_date)}
          </span>
          <h3 className='text-lg font-semibold truncate'>{plan.title}</h3>
        </div>
      </div>
    </div>
  );
};

export default UpcomingPlanCard;