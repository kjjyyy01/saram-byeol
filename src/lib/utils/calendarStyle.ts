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

  const color = event.colors;
  if (!color) return {};

  return {
    style: {
      backgroundColor: color,
      color: ['#F2C94C', '#56CCF2'].includes(color) ? 'black' : 'white',
    },
  };
};
