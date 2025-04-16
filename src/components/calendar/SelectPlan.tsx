import { SelectPlanType } from '@/types/plans';
import { CalendarBlank, MapPin, Star, TextAa, TextAlignLeft, User } from '@phosphor-icons/react';
import React from 'react';

interface SelectPlanProps {
  plans: SelectPlanType[];
}

const SelectPlan = ({ plans }: SelectPlanProps) => {
  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toISOString().split('T')[0]; // 'YYYY-MM-DD' 형식으로 반환
  };
  return (
    <div>
      <div className='max-h-[calc(100vh-2rem)] space-y-4 overflow-auto'>
        <div className='space-y-3'>
          {plans.map((plan) => (
            <div key={plan.plan_id} className='space-y-9'>
              <section className='flex items-center gap-8'>
                <div className='relative flex w-14 flex-shrink-0 flex-grow-0 flex-col items-center justify-center gap-1'>
                  <TextAa size={24} className='h-6 w-6 flex-shrink-0 flex-grow-0' />
                  <p className='text-center text-sm'>제목</p>
                </div>
                <p>{plan.title}</p>
              </section>
              <section className='flex items-center gap-8'>
                <div className='relative flex w-14 flex-shrink-0 flex-grow-0 flex-col items-center justify-center gap-1'>
                  <CalendarBlank className='h-6 w-6 flex-shrink-0 flex-grow-0' />
                  <p className='text-center text-sm'>약속</p>
                </div>
                <p>
                  {formatDate(plan.start_date)} ~ {formatDate(plan.end_date)}
                </p>
              </section>
              <section className='flex items-center gap-8'>
                <div className='relative flex w-14 flex-shrink-0 flex-grow-0 flex-col items-center justify-center gap-1'>
                  <User size={24} className='h-6 w-6 flex-shrink-0 flex-grow-0' />{' '}
                  <p className='text-center text-sm'>이름</p>
                </div>
                <p>{plan.contacts?.name}</p>
              </section>
              <section className='flex items-center gap-8'>
                <div className='relative flex w-14 flex-shrink-0 flex-grow-0 flex-col items-center justify-center gap-1'>
                  <MapPin size={24} className='h-6 w-6 flex-shrink-0 flex-grow-0' />
                  <p className='text-center text-sm'>장소</p>
                </div>
                <p>{plan.location?.place_name ?? '없음'}</p>
              </section>
              <section className='flex items-center gap-8'>
                <div className='relative flex w-14 flex-shrink-0 flex-grow-0 flex-col items-center justify-center gap-1'>
                  <Star size={24} className='h-6 w-6 flex-shrink-0 flex-grow-0' />
                  <p className='text-center text-sm'>중요도</p>
                </div>
                <p>{plan.priority}</p>
              </section>
              <section className='flex gap-8'>
                <div className='relative flex w-14 flex-shrink-0 flex-grow-0 flex-col items-center gap-1'>
                  <TextAlignLeft size={24} className='h-6 w-6 flex-shrink-0 flex-grow-0' />
                  <p className='text-center text-sm'>내용</p>
                </div>
                <p className='w-[200px]'>{plan.detail}</p>
              </section>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectPlan;
