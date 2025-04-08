import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants/queryKey';
import { getContacts } from '@/app/api/supabase/service';
import { UserType } from '@/types/contacts';

const useGetContactsByUserID = (userId: UserType['user_id']) => {
  return useQuery({
    queryKey: [QUERY_KEY.CONTACTS, userId],
    queryFn: () => getContacts(userId),
    staleTime: 60 * 1000, // 1분
  });
};

export default useGetContactsByUserID;
