import { PlanDetailType } from '@/types/contacts';
import { PlansType } from '@/types/plans';
import { differenceInCalendarDays } from 'date-fns';

export function sortPlansByDate(plans: (PlansType | PlanDetailType)[]): (PlansType | PlanDetailType)[] {
  const today = new Date();

  const getSortValue = (dDay: number) => {
    if (dDay < 0) return 1000 + dDay; // D+
    if (dDay === 0) return 1500; // D-Day
    return 2000 + dDay; // D-
  };

  return plans.slice().sort((a, b) => {
    const dDayA = differenceInCalendarDays(new Date(a.start_date), today);
    const dDayB = differenceInCalendarDays(new Date(b.start_date), today);

    return getSortValue(dDayA) - getSortValue(dDayB);
  });
}
