import { mutateDeleteContacts } from "@/app/api/supabase/service";
import { QUERY_KEY } from "@/constants/queryKey";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useMutateDeleteContacts = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation(    {
      mutationFn: ({userId, contactsId}: { userId: string; contactsId: string; } ) => mutateDeleteContacts(userId, contactsId),
      onSuccess: () => {
        
        // 고정된 연락처 목록 갱신
        queryClient.invalidateQueries({queryKey: [QUERY_KEY.CONTACT_LIST.PINNED_CONTACTS, userId]})
        // 일반 연락처(infinite) 목록 갱신
        queryClient.invalidateQueries({queryKey: [QUERY_KEY.CONTACT_LIST.REGULAR_CONTACTS,userId]})
      },
    }
  );
}