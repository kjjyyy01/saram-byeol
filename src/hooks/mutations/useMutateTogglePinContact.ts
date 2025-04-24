import { mutateUpdateContactPin } from "@/app/api/supabase/service";
import { QUERY_KEY } from "@/constants/queryKey";
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useMutateTogglePinContact = (userId?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ contactId, isPinned }: { contactId: string; isPinned: boolean }) => 
      mutateUpdateContactPin(contactId, isPinned),
    onSuccess: () => {
      console.log('✅ Pin mutation succeeded, now invalidating/ resetting regular list')
      if (!userId) return

      // 고정된 연락처 무효화
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.CONTACTS, 'pinned', userId],
      })

       // 일반 연락처(infinite) 모든 페이지 강제 리패치
       queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.CONTACTS_INFINITE, 'regular', userId],
        refetchType: 'all',
      })
    }
  });
}