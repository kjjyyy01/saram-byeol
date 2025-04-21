import { updateEventInSupabase } from '@/app/api/supabase/service';
import { QUERY_KEY } from '@/constants/queryKey';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface Props {
  id: string;
  start: string;
  end: string;
}

// 약속 업데이트 커스텀 훅
export const useUpadateEventMutate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, start, end }: Props) => updateEventInSupabase(id, { start, end }), //supabase 업데이트
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.PLANS] }); //무효화(리페칭)
    },
    onError: (error) => {
      console.error('약속 업데이트에 실패했습니다.', error);
    },
  });
};
