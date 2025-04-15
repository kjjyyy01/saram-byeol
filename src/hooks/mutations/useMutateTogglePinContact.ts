import { mutateUpdateContactPin } from "@/app/api/supabase/service";
import { QUERY_KEY } from "@/constants/queryKey";
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useTogglePinContact = (userId?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ contactId, isPinned }: { contactId: string; isPinned: boolean }) => 
      mutateUpdateContactPin(contactId, isPinned),
    onSuccess: () => {
      // 성공 시 연락처 목록 갱신
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.CONTACTS, userId] });
    }
  });
}