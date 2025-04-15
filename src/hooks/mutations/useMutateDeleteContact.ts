import { mutateDeleteContacts } from '@/app/api/supabase/service';
import { useMutation } from '@tanstack/react-query';

export const useMutateDeleteContact = () => {
  const mutation = useMutation({
    mutationFn: (contactsId: string) => mutateDeleteContacts(contactsId),
  });

  return mutation;
};
