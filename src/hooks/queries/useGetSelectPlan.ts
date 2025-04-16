import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants/queryKey';
import { getSelectPlan } from '@/app/api/supabase/service';

export const useGetSelectPlan = (planId: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.SELECT_PLAN, planId],
    queryFn: () => getSelectPlan(planId),
    enabled: !!planId, // planId가 있을 때만 실행
    staleTime: 1000 * 60 * 5, // 5분
    select: (res) => res, // 응답 그대로 넘기기
  });
};
