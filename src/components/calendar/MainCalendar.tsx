'use client';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { enUS } from 'date-fns/locale/en-US';
import { ko } from 'date-fns/locale/ko';
import { useGetCalendarPlans } from '@/hooks/useGetCalendarPlans';
import CustomToolbar from '@/components/calendar/CustomToolbar';
import { useState } from 'react';
import type { CalendarEventType } from '@/types/plans';

// 로케일(지역화) 설정
const locales = {
  'en-US': enUS, //미국-영어 : 미국식 날짜
  'ko-KR': ko, //한국-한글 : 한국식 날짜
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }), // 1: 월요일
  getDay,
  locales,
});

const MainCalendar = () => {
  const { data: events, isPending, isError, error } = useGetCalendarPlans();
  const [month, setMonth] = useState(new Date());

  if (isPending) {
    return <div>로딩 중입니다...</div>;
  }

  if (isError) {
    return <div>캘린더 에러 발생 : {error.message}</div>;
  }

  return (
    <div>
      <Calendar<CalendarEventType>
        culture='ko-KR' // 한국 기본 설정
        localizer={localizer}
        events={events}
        date={month} // 현재 날짜(달)
        onNavigate={(newDate) => {
          setMonth(newDate); // 날짜(달) 변동
        }}
        startAccessor='start'
        endAccessor='end'
        defaultView='month'
        views={['month']}
        components={{
          toolbar: CustomToolbar, // 상단 툴바 분리
        }}
        style={{ height: '100vh' }}
      />
    </div>
  );
};

export default MainCalendar;
