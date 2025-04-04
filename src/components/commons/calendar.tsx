'use client';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { enUS } from 'date-fns/locale/en-US';
import { ko } from 'date-fns/locale/ko';
import { getPlans } from '@/lib/utils/supabaseApi';
import { useEffect, useState } from 'react';
import { CalendarEventType } from '@/types/plans';

// 로케일(지역화) 설정
const locales = {
  'en-US': enUS, //미국-영어 : 미국식 날짜
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
  const [events, setEvents] = useState<CalendarEventType[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const plans = await getPlans();

        const formatted = plans.map(
          (plan): CalendarEventType => ({
            id: plan.plan_id,
            title: plan.title,
            start: new Date(plan.start_date),
            end: new Date(plan.end_date),
          })
        );
        setEvents(formatted);
      } catch (error) {
        console.error('일정 목록 가져오기 에러', error);
      }
    };
    fetchEvents();
  }, []);

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
