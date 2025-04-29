import { getUserPlans } from '@/app/api/supabase/service';
import { QUERY_KEY } from '@/constants/queryKey';
import { useAuthStore } from '@/store/zustand/store';
import { useDemoStore } from '@/store/zustand/useDemoStore';
import { useQuery } from '@tanstack/react-query';

export const useSetUpcomingCount = () => {
  const user = useAuthStore((s) => s.user);
  const { isDemoUser, getPlanInMonth } = useDemoStore();

  const setUpcomingCount = async () => {
    if (isDemoUser) {
      return getPlanInMonth().filterdData.length;
    }
    if (!user?.id) return 0;
    const plans = await getUserPlans(user.id);
    return plans.length;
  };

  return useQuery({
    queryKey: [QUERY_KEY.UPCOMING_COUNT, isDemoUser ? QUERY_KEY.DEMO : user?.id],
    queryFn: setUpcomingCount,
    enabled: Boolean(isDemoUser || user?.id),
    staleTime: 1000 * 60 * 5, //5분
    refetchOnWindowFocus: false,
  });
};
