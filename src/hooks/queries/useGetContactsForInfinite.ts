import { fetchPinnedContacts, fetchRegularContactsInfinite } from '@/app/api/supabase/service';
import { QUERY_KEY } from '@/constants/queryKey';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

// 고정된 연락처 한 번만 조회
export const usePinnedContacts = (userId: string) =>
  useQuery({
    queryKey: [QUERY_KEY.CONTACT_LIST.PINNED_CONTACTS, userId],
    queryFn: () => fetchPinnedContacts(userId),
  })

// 일반 연락처 무한 스크롤
export const useRegularContactsInfinite = (userId: string) =>
  useInfiniteQuery({
    queryKey: [QUERY_KEY.CONTACT_LIST.REGULAR_CONTACTS, userId],
    queryFn: ({ pageParam = 0 }) =>
      fetchRegularContactsInfinite(userId, pageParam),
    getNextPageParam: lastPage => lastPage.nextPage,
    initialPageParam: 0,
  })