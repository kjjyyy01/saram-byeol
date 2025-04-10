import type { CalendarEventType } from '@/types/plans';

interface Props extends CalendarEventType {
  isHoliday?: boolean;
}

export const holidayStyle = (event: Props) => {
  if (event.isHoliday) {
    return {
      className: 'rbc-event-holiday',
    };
  }

  return {}; // 기본 스타일
};
