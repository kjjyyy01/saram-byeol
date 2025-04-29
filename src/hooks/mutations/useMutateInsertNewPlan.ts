import { useMutation, useQueryClient } from '@tanstack/react-query';
import { mutateInsertNewPlan } from '@/app/api/supabase/service';
import { QUERY_KEY } from '@/constants/queryKey';
import { useAuthStore } from '@/store/zustand/store';
import { InsertNewPlansType, PlansType } from '@/types/plans';

interface Context {
  prevPlans: PlansType[] | undefined;
}

const useMutateInsertNewPlan = () => {
  const user = useAuthStore((s) => s.user);
  const queryClient = useQueryClient();

  return useMutation<PlansType, Error, InsertNewPlansType, Context>({
    mutationFn: (newPlan) => mutateInsertNewPlan(newPlan), // mutateInsertNewPlan 반환값이 PlansType으로 수정됨
    onMutate: async (newPlan) => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEY.PLANS] });

      const prevPlans = queryClient.getQueryData<PlansType[]>([QUERY_KEY.PLANS]);

      if (prevPlans) {
        queryClient.setQueryData<PlansType[]>(
          [QUERY_KEY.PLANS],
          [
            {
              ...newPlan,
              plan_id: `optimistic-${Date.now()}`, // 임시 ID 부여
              user_id: user!.id,
              contacts_id: newPlan.contacts_id ?? '',
              title: newPlan.title ?? '',
              detail: newPlan.detail ?? '',
              priority: newPlan.priority ?? '',
              start_date: newPlan.start_date ?? new Date().toISOString(),
              end_date: newPlan.end_date ?? new Date().toISOString(),
              colors: newPlan.colors ?? '',
            },
            ...prevPlans,
          ]
        );
      }

      return { prevPlans };
    },
    onError: (_error, _newPlan, context) => {
      if (context?.prevPlans) {
        queryClient.setQueryData<PlansType[]>([QUERY_KEY.PLANS], context.prevPlans);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.PLANS] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.CONTACT_WITH_PLANS] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.UPCOMING_COUNT] });
    },
  });
};

export default useMutateInsertNewPlan;
