import { ContactItemType, ContactWithPlansDetailType } from '@/types/contacts';
import { supabase } from '@/app/api/supabase/client';
import { InsertNewPlansType, PlansType } from '@/types/plans';
import { SignUpFormType } from '@/app/(pages)/signUp/page';
import { SignInFormType } from '@/app/(pages)/signIn/page';
import { CONTACTS, PLANS } from '@/constants/supabaseTable';

// contacts 데이터 가져오기
export const getContacts = async (userId: string): Promise<ContactItemType[]> => {
  try {
    const { data, error } = await supabase
      .from(CONTACTS)
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
    .from(CONTACTS)
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

// 회원가입
export const mutateSignUp = async (value: SignUpFormType) => {
  const { email, password, nickname } = value;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { nickname } },
  });

  if (error) {
    console.error('회원가입에 실패했습니다. 다시 시도해주세요.', error);
    throw error;
  }

  return data.user;
};

// 로그인
export const mutateSignIn = async (value: SignInFormType) => {
  const { email, password } = value;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    console.error('로그인에 실패했습니다. 다시 시도해주세요.', error);
    throw error;
  }

  return data.user;
};

// 로그아웃
export const mutateSignOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('로그아웃에 실패했습니다. 다시 시도해주세요.', error);
    throw error;
  }
};

// plans 데이터 가져오기 - calendar 사용
export const getPlans = async (): Promise<PlansType[]> => {
  const { data: plans, error } = await supabase
    .from(PLANS)
    .select('plan_id, user_id, contacts_id, title, detail, priority, start_date, end_date');
  if (error) {
    throw new Error(error.message);
  }
  return plans;
};

// plans 데이터 업데이트 (캘린더 DnD)
export const updateEventInSupabase = async (id: string, { start, end }: { start: Date; end: Date }) => {
  const { error } = await supabase
    .from(PLANS)
    .update({
      start_date: start.toISOString(),
      end_date: end.toISOString(),
    })
    .eq('plan_id', id);

  if (error) {
    console.error('약속 업데이트에 실패했습니다.', error.message);
  }
};

// plans - 약속추가
export const mutateInsertNewPlan = async (formdata: InsertNewPlansType) => {
  try {
    const { data: plan, error } = await supabase.from(PLANS).insert(formdata).select();
    if (error) throw new Error(`약속 추가 중 오류가 발생했습니다 : ${error.message}`);

    return plan;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
