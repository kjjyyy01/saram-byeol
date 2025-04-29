import { mutateDeletePlan } from '@/app/api/supabase/service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants/queryKey';

export const useMutateDeletePlan = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (planId: string) => mutateDeletePlan(planId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.CONTACT_WITH_PLANS] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.PLANS] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.UPCOMING_COUNT] });
    },
    onError: (error) => {
      console.error('약속 삭제 실패:', error.message);
    },
  });

  return mutation;
};
