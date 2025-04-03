import { ContactList, ContactWithPlansDetail } from '@/types/contacts';
import { supabase } from './client';

// contacts 데이터 가져오기
export const fetchContacts = async (userId: string): Promise<ContactList[]> => {
  try {
    const { data, error } = await supabase
      .from('contacts')
      .select('contacts_id, name, relationship_level, contacts_profile_img')
      .eq('user_id', userId)
      .order('name');
      
    if (error) {
      console.error('연락처를 가져오는 중 오류가 발생했습니다:', error);
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error('연락처를 불러오는 중 오류가 발생했습니다:', error);
    throw error;
  }
}

// contacts, plans 데이터 함께 가져오기
export const fetchContactsWithPlans = async (userId: string, contactsId: string): Promise<ContactWithPlansDetail> => {
  const { data, error } = await supabase
    .from('contacts')
    .select(
      `
      contacts_id, user_id, name, email, relationship_level, notes, phone, birth, contacts_profile_img,
      plans:plans(plan_id, title, start_date, end_date, priority, detail)
    `
    )
    .eq('contacts_id', contactsId)
    .eq('user_id', userId)
    .single();

  if (error) {
    console.error('연락처 정보를 가져오는 중 오류가 발생했습니다:', error);
    throw error;
  }

  return { contact: data, plans: data.plans || [] };
};
