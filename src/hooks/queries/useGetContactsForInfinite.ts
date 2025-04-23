import { fetchPinnedContacts } from '@/app/api/supabase/service';
import { QUERY_KEY } from '@/constants/queryKey';
import { fetchRegularContactsInfinite } from '@/lib/services/contactsService';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

// 고정된 연락처 한 번만 조회
export const usePinnedContacts = (userId: string) =>
  useQuery({
    queryKey: [QUERY_KEY.CONTACTS, 'pinned', userId] as const,
    queryFn: () => fetchPinnedContacts(userId),
  })

// 일반 연락처 무한 스크롤
export const useRegularContactsInfinite = (userId: string) =>
  useInfiniteQuery({
    queryKey: [QUERY_KEY.CONTACTS_INFINITE, 'regular', userId] as const,
    queryFn: ({ pageParam = 0 }) =>
      fetchRegularContactsInfinite(userId, pageParam),
    getNextPageParam: lastPage => lastPage.nextPage,
    initialPageParam: 0,
  })