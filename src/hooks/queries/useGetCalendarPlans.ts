import { getMonthlyPlans } from '@/app/api/supabase/service';
import { QUERY_KEY } from '@/constants/queryKey';
import { CalendarEventType, PlansType } from '@/types/plans';
import { User } from '@supabase/supabase-js';
import { useQuery, UseQueryOptions } from '@tanstack/react-query'; // ✨ UseQueryOptions 임포트 추가

export const useGetCalendarPlans = (user: User | null, year: number, monthDate: Date) => {
  const month = monthDate.getMonth() + 1;

  return useQuery<CalendarEventType[], Error, CalendarEventType[], [string, string | undefined, number, number]>({
    queryKey: [QUERY_KEY.PLANS, user?.id, year, month],
    enabled: !!user,
    staleTime: 24 * 60 * 60 * 1000,
    keepPreviousData: true, // 달 이동해도 프리페칭 된 데이터 보여줌
    queryFn: async () => {
      if (!user) {
        throw new Error('로그인된 사용자가 없습니다.');
      }

      const plans: PlansType[] = await getMonthlyPlans(user, year, month);

      const events: CalendarEventType[] = plans.map((plan) => ({
        id: plan.plan_id,
        title: plan.title,
        start: new Date(plan.start_date),
        end: new Date(plan.end_date),
        colors: plan.colors,
      }));

      return events;
    },
  } as UseQueryOptions<CalendarEventType[], Error, CalendarEventType[], [string, string | undefined, number, number]>); // 타입 캐스팅
};
