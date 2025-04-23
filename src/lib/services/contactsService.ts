import { supabase } from '@/app/api/supabase/client';
import { CONTACTS } from '@/constants/supabaseTable';
import { ContactItemType } from '@/types/contacts';

// fetching 결과 타입
export interface fetchRegularContactsInfiniteRes {
  contacts: ContactItemType[];
  nextPage?: number;
}

export const fetchRegularContactsInfinite = async (
  userId: string,
  pageParam = 0,
  limit = 10
): Promise<fetchRegularContactsInfiniteRes> => {
  const from = pageParam * limit
  const to = from + limit - 1

  const { data, error } = await supabase
    .from(CONTACTS)
    .select('contacts_id, name, relationship_level, contacts_profile_img, is_pinned')
    .eq('user_id', userId)
    .eq('is_pinned', false)
    .order('name', { ascending: true })
    .range(from, to)

  if (error) throw error

  const nextPage = data.length === limit ? pageParam + 1 : undefined
  return { contacts: data, nextPage }
}