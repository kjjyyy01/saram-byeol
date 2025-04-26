import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants/queryKey';
import { getSelectPlan } from '@/app/api/supabase/service';
import { useDemoStore } from '@/store/zustand/useDemoStore';

export const useGetSelectPlan = (planId: string) => {
  const { isDemoUser } = useDemoStore();
  return useQuery({
    queryKey: [QUERY_KEY.SELECT_PLAN, planId],
    queryFn: () => getSelectPlan(planId),
    enabled: isDemoUser ? false : !!planId, // 데모 사용자인 경우 항상 비활성화, 그렇지 않으면 planId가 있을 때만 활성화
    staleTime: 1000 * 60 * 5, // 5분
    select: (res) => res, // 응답 그대로 넘기기
  });
};
