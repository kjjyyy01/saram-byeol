'use client';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { ko } from 'date-fns/locale/ko';
import { useGetCalendarPlans } from '@/hooks/queries/useGetCalendarPlans';
import CustomToolbar from '@/components/calendar/CustomToolbar';
import { useState } from 'react';
import type { CalendarEventType } from '@/types/plans';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import { useUpadateEventMutate } from '@/hooks/mutations/useUpadateEventMutate';
import { CustomDateHeader } from './CustomDateHeader';

// 드래그 이벤트 타입
interface Props {
  event: CalendarEventType;
  start: string | Date;
  end: string | Date;
}

// 로케일(지역화) 설정
const locales = {
  'ko-KR': ko, //한국-한글 : 한국식 날짜
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const MainCalendar = () => {
  const { data: events, isPending, isError, error } = useGetCalendarPlans();
  const { mutate: updateEvent } = useUpadateEventMutate();
  const [month, setMonth] = useState(new Date());

  const DnDCalendar = withDragAndDrop<CalendarEventType>(Calendar); //DnD 사용 캘린더

  // 드래그 종료 함수(mutate 실행 핸들러)
  const moveEventsHandler = ({ event, start, end }: Props) => {
    // mutation의 Date 타입과 일치
    updateEvent({ id: event.id, start: new Date(start), end: new Date(end) });
  };

  if (isPending) {
    return <div>로딩 중입니다...</div>;
  }

  if (isError) {
    return <div>캘린더 에러 발생 : {error.message}</div>;
  }

  return (
    <div>
      <DnDCalendar
        localizer={localizer}
        events={events}
        date={month} // 현재 달 state
        onNavigate={(newDate) => {
          setMonth(newDate); // 달 변동
        }}
        startAccessor='start'
        endAccessor='end'
        onEventDrop={moveEventsHandler} // 드래그 종료
        defaultView='month'
        views={['month']}
        components={{
          toolbar: CustomToolbar, // 상단 툴바 분리
          month: {
            dateHeader: CustomDateHeader,
          },
        }}
        style={{ height: '100vh' }}
      />
    </div>
  );
};

export default MainCalendar;
