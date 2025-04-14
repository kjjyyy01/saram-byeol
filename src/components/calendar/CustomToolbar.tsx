import { CalendarEventType } from '@/types/plans';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { ToolbarProps } from 'react-big-calendar';
import UpcomingPlanButton from './UpcomingPlanButton';
import AddPlanButton from '@/components/calendar/AddPlanButton';
import MoveMonthButton from './MoveMonthButton';

//캘린더와 타입 맞춤(id 유실로 인한 오류)
const CustomToolbar = ({ date, onNavigate }: ToolbarProps<CalendarEventType>) => {
  const customLabel = format(date, 'yyyy MMMM', { locale: ko });
  return (
    <div className='mt-[18px] flex'>
      <MoveMonthButton onNavigate={onNavigate} />
      <span className='ml-[24px] text-[28px] font-bold'>{customLabel}</span>
      <section className='mb-[12.5px] ml-auto mr-[9px] flex'>
        <UpcomingPlanButton />
        <AddPlanButton />
      </section>
    </div>
  );
};

export default CustomToolbar;
