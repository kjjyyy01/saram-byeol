import { CalendarEventType } from '@/types/plans';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { ToolbarProps } from 'react-big-calendar';
import AddPlans from '@/components/calendar/AddPlans';
import UpcomingPlans from '@/components/calendar/UpcomingPlans';
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react';

//캘린더와 타입 맞춤(id 유실로 인한 오류)
const CustomToolbar = ({ date, onNavigate }: ToolbarProps<CalendarEventType>) => {
  const customLabel = format(date, 'yyyy MMMM', { locale: ko });
  return (
    <div className='flex'>
      <section className='flex h-[40px] w-[137px] place-content-center items-center rounded-[8px] border border-gray-300'>
        <button
          onClick={() => onNavigate('PREV')}
          className='flex h-full flex-1 items-center justify-center border-r border-gray-300'
        >
          <ArrowLeft size={20} />
        </button>
        <button
          onClick={() => onNavigate('NEXT')}
          className='flex h-full flex-1 items-center justify-center border-r border-gray-300'
        >
          <ArrowRight size={20} />
        </button>
        <button onClick={() => onNavigate('TODAY')} className='flex flex-1 items-center justify-center'>
          오늘
        </button>
      </section>
      <span className='ml-[24px] text-[28px] font-bold'>{customLabel}</span>
      <section className='flex'>
        <UpcomingPlans />
        <AddPlans />
      </section>
    </div>
  );
};

export default CustomToolbar;
