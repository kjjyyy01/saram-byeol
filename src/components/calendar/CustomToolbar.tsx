import { CalendarEventType } from '@/types/plans';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { ToolbarProps } from 'react-big-calendar';
import AddPlans from '@/components/calendar/AddPlans';
import UpcomingPlans from '@/components/calendar/UpcomingPlans';

//캘린더와 타입 맞춤(id 유실로 인한 오류)
const CustomToolbar = ({ date, onNavigate }: ToolbarProps<CalendarEventType>) => {
  const customLabel = format(date, 'yyyy MMMM', { locale: ko });
  return (
    <div>
      <section>
        <button onClick={() => onNavigate('PREV')}>⬅️</button>
        <button onClick={() => onNavigate('NEXT')}>➡️</button>
        <button onClick={() => onNavigate('TODAY')}>오늘</button>
      </section>
      <span>{customLabel}</span>
      <section>
        {/* 검색창 추가 */}
        <UpcomingPlans />
        <AddPlans />
      </section>
    </div>
  );
};

export default CustomToolbar;
