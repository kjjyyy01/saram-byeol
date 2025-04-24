import { CalendarEventType } from '@/types/plans';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { ToolbarProps } from 'react-big-calendar';
import UpcomingPlanButton from './UpcomingPlanButton';
import AddPlanButton from '@/components/calendar/AddPlanButton';
import MoveMonthButton from './MoveMonthButton';

export interface CustomToolbarProps extends ToolbarProps<CalendarEventType> {
  onShowUpcomingPlans: () => void;
  onAddPlan: () => void;
  activeTab: string;
}

//캘린더와 타입 맞춤(id 유실로 인한 오류)
const CustomToolbar = ({ date, onNavigate, onShowUpcomingPlans, onAddPlan, activeTab }: CustomToolbarProps) => {
  const customLabel = format(date, 'yyyy MMMM', { locale: ko });
  return (
    <div className='mt-[18px] flex'>
      <MoveMonthButton onNavigate={onNavigate} />
      <span className='ml-6 text-[28px] font-bold'>{customLabel}</span>
      <section className='mb-[12.5px] ml-auto mr-2 flex'>
        <UpcomingPlanButton onClick={onShowUpcomingPlans} activeTab={activeTab} />
        <AddPlanButton onClick={onAddPlan} activeTab={activeTab} />
      </section>
    </div>
  );
};

export default CustomToolbar;
