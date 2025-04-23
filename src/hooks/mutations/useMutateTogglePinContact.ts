import { mutateUpdateContactPin } from "@/app/api/supabase/service";
import { QUERY_KEY } from "@/constants/queryKey";
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useTogglePinContact = (userId?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ contactId, isPinned }: { contactId: string; isPinned: boolean }) => 
      mutateUpdateContactPin(contactId, isPinned),
    onSuccess: () => {
      if (userId) {
        // 고정된 연락처 쿼리 무효화
        queryClient.invalidateQueries({ 
          queryKey: [QUERY_KEY.CONTACTS, 'pinned', userId] 
        });
        
        // 일반 연락처 무한 스크롤 쿼리 무효화
        queryClient.invalidateQueries({ 
          queryKey: [QUERY_KEY.CONTACTS_INFINITE, 'regular', userId] 
        });
        
        // 기존 쿼리 키도 무효화 (호환성 유지)
        queryClient.invalidateQueries({ 
          queryKey: [QUERY_KEY.CONTACTS, userId] 
        });
      }
    }
  });
}