import { ContactItemType, ContactWithPlansDetailType } from '@/types/contacts';
import { supabase } from '@/app/api/supabase/client';
import { PlansType } from '@/types/plans';

// contacts 데이터 가져오기
export const getContacts = async (userId: string): Promise<ContactItemType[]> => {
  try {
    const { data, error } = await supabase
      .from('contacts')
      .select('contacts_id, name, relationship_level, contacts_profile_img')
      .eq('user_id', userId)
      .order('name', { ascending: true });

    if (error) {
      console.error('Supabase에서 Contact 테이블 데이터를 가져오는 중 오류가 발생했습니다:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('연락처를 불러오는 중 오류가 발생했습니다:', error);
    throw error;
  }
};

// contacts, plans 데이터 함께 가져오기
export const getContactsWithPlans = async (userId: string, contactsId: string): Promise<ContactWithPlansDetailType> => {
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

// plans 데이터 가져오기 - calendar 사용
export const getPlans = async (): Promise<PlansType[]> => {
  const { data: plans, error } = await supabase
    .from('plans')
    .select('plan_id, user_id, contacts_id, title, detail, priority, start_date, end_date');
  if (error) {
    throw new Error(error.message);
  }
  return plans;
};
