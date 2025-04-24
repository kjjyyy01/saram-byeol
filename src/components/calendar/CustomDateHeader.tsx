import { getDay, isSameDay } from 'date-fns';

interface Props {
  label: string;
  date: Date;
  holidays: { date: string; title: string }[];
}

export const CustomDateHeader = ({ label, date, holidays }: Props) => {
  const isSunday = getDay(date) === 0;
  const isHoliday = holidays.some((h) => isSameDay(new Date(h.date), date)); //isSameDay: 같은 날짜인지 확인

  return (
    <div className={`pl-1 text-left ${isSunday || isHoliday ? 'text-red-500' : 'text-grey-800'}`}>
      <span>{label}</span>
    </div>
  );
};
