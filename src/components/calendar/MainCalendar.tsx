'use client';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { ko } from 'date-fns/locale/ko';
import { useGetCalendarPlans } from '@/hooks/queries/useGetCalendarPlans';
import CustomToolbar from '@/components/calendar/CustomToolbar';
import { useState } from 'react';
import type { CalendarEventType, Holidays } from '@/types/plans';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import { useUpadateEventMutate } from '@/hooks/mutations/useUpadateEventMutate';
import { CustomDateHeader } from '@/components/calendar/CustomDateHeader';
import { useGetHolidays } from '@/hooks/queries/useGetHolidays';
import { holidayStyle } from '@/lib/utils/calendarStyle';
import CalendarPopOver from '@/components/calendar/CalendarPopOver';

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
  const [moment, setMoment] = useState(new Date()); //해당 달
  const [selectedDate, setSelectedDate] = useState<Date | null>(null); //선택한 셀 날짜
  const [isPopOverOpen, setIsPopOverOpen] = useState(false); //팝오버 오픈 여부
  const calendarYear = moment.getFullYear(); // 해당 달의 년도
  const { mutate: updateEvent } = useUpadateEventMutate();
  const { data: holidays } = useGetHolidays(String(calendarYear));
  const { data: events, isPending, isError, error } = useGetCalendarPlans(calendarYear, moment);

  // 약속 + 공휴일
  const combinedEvents: CalendarEventType[] = [
    ...(events || []),
    ...(holidays || []).map((holiday: Holidays, idx: number) => ({
      id: `holiday-${idx}`,
      title: holiday.title,
      start: holiday.date,
      end: holiday.date, // 단일 일정
      isHoliday: true, // 스타일 구분용
    })),
  ];

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
        selectable
        localizer={localizer}
        events={combinedEvents}
        date={moment} // 현재 달 state
        onNavigate={(newDate) => {
          setMoment(newDate); // 달 변동
        }}
        startAccessor='start'
        endAccessor='end'
        onEventDrop={moveEventsHandler} // 드래그 종료
        defaultView='month'
        views={['month']}
        components={{
          toolbar: CustomToolbar, // 상단 툴바(달 이동)
          month: {
            dateHeader: CustomDateHeader, // 날짜 셀의 숫자
          },
        }}
        eventPropGetter={holidayStyle}
        onSelectSlot={(slotInfo) => {
          setSelectedDate(slotInfo.start); // 클릭한 날짜(시작일)
          setIsPopOverOpen(true); // 모달 열기
        }}
        style={{ height: '100vh' }}
      />
      {/* 팝오버 */}
      {isPopOverOpen && selectedDate && (
        <CalendarPopOver open={isPopOverOpen} onOpenChange={setIsPopOverOpen} date={selectedDate} />
      )}
    </div>
  );
};

export default MainCalendar;
