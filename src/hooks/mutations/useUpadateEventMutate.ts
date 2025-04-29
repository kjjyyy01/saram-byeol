import { updateEventInSupabase } from '@/app/api/supabase/service';
import { QUERY_KEY } from '@/constants/queryKey';
import { PlansType } from '@/types/plans';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

interface Props {
  id: string;
  start: string;
  end: string;
}

interface Context {
  prevPlans: PlansType[]; // 원래 플랜 목록 백업
}

// 약속 업데이트 커스텀 훅
export const useUpdateEventMutate = () => {
  const queryClient = useQueryClient();

  return useMutation<unknown, Error, Props, Context>({
    mutationFn: async ({ id, start, end }: Props) => {
      await updateEventInSupabase(id, { start, end });
    },
    onMutate: async (updatedEvent: Props) => {
      const key = [QUERY_KEY.PLANS];
      await queryClient.cancelQueries({ queryKey: key });

      const prevPlans = queryClient.getQueryData<PlansType[]>(key) ?? [];

      queryClient.setQueryData<PlansType[]>(
        key,
        (oldPlans) =>
          oldPlans?.map((plan) =>
            plan.plan_id === updatedEvent.id
              ? { ...plan, start_date: updatedEvent.start, end_date: updatedEvent.end }
              : plan
          ) ?? []
      );

      return { prevPlans };
    },
    onError: (error: Error, _updatedEvent: Props, context: Context | undefined) => {
      if (context?.prevPlans) {
        queryClient.setQueryData<PlansType[]>([QUERY_KEY.PLANS], context.prevPlans);
      }
      toast.error('약속 수정에 실패했습니다.');
      console.error('업데이트 에러:', error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.PLANS] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.CONTACT_WITH_PLANS] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.UPCOMING_COUNT] });
    },
  });
};
