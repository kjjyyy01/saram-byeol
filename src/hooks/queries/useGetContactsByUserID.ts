import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants/queryKey';
import { getContacts } from '@/app/api/supabase/service';
import { ContactItemType, UserType } from '@/types/contacts';

const useGetContactsByUserID = (userId: UserType['user_id'], enabled: boolean) => {
  
  return useQuery<ContactItemType[]>({
    queryKey: [QUERY_KEY.CONTACTS, userId],
    queryFn: () => getContacts(userId),
    staleTime: 60 * 1000, // 1분
    enabled, // 사용자 ID가 없으면 쿼리를 실행하지 않게 함
  });
};

export default useGetContactsByUserID;
