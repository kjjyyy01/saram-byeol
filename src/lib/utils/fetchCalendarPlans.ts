import { getMonthlyPlans } from '@/app/api/supabase/service';
import { CalendarEventType, PlansType } from '@/types/plans';
import { User } from '@supabase/supabase-js';

export const fetchCalendarPlans = async ({
  user,
  year,
  date,
}: {
  user: User | null;
  year: number;
  date: Date;
}): Promise<CalendarEventType[]> => {
  const month = date.getMonth() + 1; // Date 객체에서 month 추출

  const plans: PlansType[] = await getMonthlyPlans(user, year, month);

  const events: CalendarEventType[] = plans.map((plan) => ({
    id: plan.plan_id,
    title: plan.title,
    start: new Date(plan.start_date),
    end: new Date(plan.end_date),
    colors: plan.colors,
  }));

  return events;
};
