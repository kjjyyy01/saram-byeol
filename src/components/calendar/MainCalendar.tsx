import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import CustomToolbar from '@/components/calendar/CustomToolbar';
import { useState } from 'react';
import type { CalendarEventType, PlansType } from '@/types/plans';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import { CustomDateHeader } from '@/components/calendar/CustomDateHeader';
import { holidayStyle } from '@/lib/utils/calendarStyle';
import CalendarPopOver from '@/components/calendar/popOver/CalendarPopOver';
import { DragEventType } from '@/app/(pages)/(nav)/calendar/page';

interface MainCalendarProps {
  events: CalendarEventType[];
  moment: Date;
  setMoment: (date: Date) => void;
  onSelectPlan: (planId: string) => void;
  setSelectPlan: React.Dispatch<React.SetStateAction<PlansType[] | null>>;
  onEventDrop: (data: DragEventType) => void;
  CustomToolbarProps: {
    onShowUpcomingPlans: () => void;
    onAddPlan: () => void;
  };
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales: {},
});

const MainCalendar = ({
  onSelectPlan,
  CustomToolbarProps,
  events,
  moment,
  setMoment,
  onEventDrop,
}: MainCalendarProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null); //선택한 셀 날짜
  const [isPopOverOpen, setIsPopOverOpen] = useState(false); //팝오버 오픈 여부
  const DnDCalendar = withDragAndDrop<CalendarEventType>(Calendar); //DnD 사용 캘린더

  return (
    <div>
      <DnDCalendar
        selectable
        localizer={localizer}
        events={events}
        date={moment} // 현재 달 state
        onNavigate={(newDate) => {
          setMoment(newDate); // 달 변동
        }}
        startAccessor='start'
        endAccessor='end'
        onEventDrop={onEventDrop} // 드래그 종료
        defaultView='month'
        views={['month']}
        components={{
          toolbar: (props) => <CustomToolbar {...props} {...CustomToolbarProps} />, // 상단 툴바(달 이동)
          month: {
            dateHeader: CustomDateHeader, // 날짜 셀의 숫자
          },
        }}
        eventPropGetter={holidayStyle}
        onSelectSlot={(slotInfo) => {
          setSelectedDate(slotInfo.start); // 클릭한 날짜(시작일)
          setIsPopOverOpen(true); // 모달 열기
        }}
        onSelectEvent={(event) => onSelectPlan(event.id)}
        style={{ height: '100vh' }}
      />
      {isPopOverOpen && selectedDate && (
        <CalendarPopOver open={isPopOverOpen} onOpenChange={setIsPopOverOpen} date={selectedDate} />
      )}
    </div>
  );
};

export default MainCalendar;
