import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants/queryKey';
import { getSelectPlan } from '@/app/api/supabase/service';
import { useDemoStore } from '@/store/zustand/useDemoStore';

export const useGetSelectPlan = (planId: string) => {
  const { isDemoUser } = useDemoStore();
  return useQuery({
    queryKey: [QUERY_KEY.SELECT_PLAN, planId],
    queryFn: () => getSelectPlan(planId),
    enabled: !!planId || !isDemoUser, // planId가 있거나 데모상태가 아닐때만 실행 
    staleTime: 1000 * 60 * 5, // 5분
    select: (res) => res, // 응답 그대로 넘기기
  });
};
