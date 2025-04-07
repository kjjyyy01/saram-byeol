'use client';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { enUS } from 'date-fns/locale/en-US';
import { ko } from 'date-fns/locale/ko';
import { useGetCalendarPlans } from '@/hooks/useGetCalendarPlans';

// 로케일(지역화) 설정
const locales = {
  'en-US': enUS, //미국-영어 : 미국식 날짜
  'ko-KR': ko, //한국-한글 : 한국식 날짜
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }), // 월요일 시작
  getDay,
  locales,
});

const MainCalendar = () => {
  const { data: events, isPending, isError, error } = useGetCalendarPlans();

  if (isPending) {
    return <div>로딩 중입니다...</div>;
  }

  if (isError) {
    return <div>캘린더 에러 발생 : {error.message}</div>;
  }

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events} // 여기에 이벤트 추가 가능
        startAccessor='start'
        endAccessor='end'
        style={{ height: 500 }}
      />
    </div>
  );
};

export default MainCalendar;
