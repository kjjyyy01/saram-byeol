import { mutateDeletePlan } from '@/app/api/supabase/service';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useMutateDeletePlan = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (planId: string) => mutateDeletePlan(planId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contactWithPlans'] });
    },
  });

  return mutation;
};
