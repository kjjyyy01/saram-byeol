import MainCalendar from '@/components/calendar/MainCalendar';
import { Metadata } from 'next';
import 'react-big-calendar/lib/css/react-big-calendar.css';

export const metadata: Metadata = {
  title: '사람 별 캘린더',
  description: '약속을 모아볼 수 있는 캘린더 페이지입니다.',
};

export default function Home() {
  return (
    <div>
      <MainCalendar />
    </div>
  );
}
