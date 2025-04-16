import { mutateDeleteContacts } from '@/app/api/supabase/service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants/queryKey';

export const useMutateDeleteContact = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (contactsId: string) => mutateDeleteContacts(contactsId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.CONTACTS] });
    },
  });

  return mutation;
};
