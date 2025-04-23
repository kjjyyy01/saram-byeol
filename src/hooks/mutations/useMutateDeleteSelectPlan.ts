import { mutateDeletePlan } from '@/app/api/supabase/service';
import { QUERY_KEY } from '@/constants/queryKey';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useMutateDeleteSelectPlan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: mutateDeletePlan,
    onSuccess: (deletedPlanId) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.PLANS] }); // 전체 계획 목록이 있다면
      queryClient.removeQueries({ queryKey: [QUERY_KEY.SELECT_PLAN, deletedPlanId] }); // 메모리 삭제
      queryClient.refetchQueries({ queryKey: [QUERY_KEY.PLANS] });
    },
    onError: (error) => {
      console.error('약속 삭제 실패:', error.message);
    },
  });
};
