import MainCalendar from '@/components/calendar/MainCalendar';
import UpcomingPlans from '@/components/calendar/UpcomingPlans';
import { Metadata } from 'next';
import 'react-big-calendar/lib/css/react-big-calendar.css';

export const metadata: Metadata = {
  title: '사람 별 캘린더',
  description: '약속을 모아볼 수 있는 캘린더 페이지입니다.',
};

export default function Home() {
  const TEST_USER_ID = 'a27fc897-4216-4863-9e7b-f8868a8369ff';
  return (
    <div className="flex flex-col md:flex-row gap-4 p-4">
      <div className="md:flex-grow">
        <MainCalendar />
      </div>
      <div className="md:w-auto flex-shrink-0">
        <UpcomingPlans userId={TEST_USER_ID} />
      </div>
    </div>
  );
}