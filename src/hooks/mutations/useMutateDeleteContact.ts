import { mutateDeleteContacts } from '@/app/api/supabase/service';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useMutateDeleteContact = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (contactsId: string) => mutateDeleteContacts(contactsId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
    },
  });

  return mutation;
};
