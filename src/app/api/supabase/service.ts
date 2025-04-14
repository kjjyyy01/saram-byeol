import { ContactDetailType, ContactItemType, ContactWithPlansDetailType } from '@/types/contacts';
import { supabase } from '@/app/api/supabase/client';
import { InsertNewPlansType, PlansType } from '@/types/plans';
import { SignUpFormType } from '@/app/(pages)/signup/page';
import { SignInFormType } from '@/app/(pages)/signin/page';
import { CONTACTS, PLANS } from '@/constants/supabaseTable';

export const getContacts = async (userId: string): Promise<ContactItemType[]> => {
  try {
    const { data, error } = await supabase
      .from(CONTACTS)
      .select('contacts_id, name, relationship_level, contacts_profile_img, is_pinned')
      .eq('user_id', userId);

    if (error) {
      console.error('Supabase에서 Contact 테이블 데이터를 가져오는 중 오류가 발생했습니다:', error);
      throw error;
    }

    // 한국어 로케일을 사용한 정렬
    const sortedData = [...(data || [])].sort((a, b) => a.name.localeCompare(b.name, 'ko-KR'));

    return sortedData;
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

  return { data, error };
};

// 로그인
export const mutateSignIn = async (value: SignInFormType) => {
  const { email, password } = value;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return { data, error };
};

// 로그아웃
export const mutateSignOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('로그아웃에 실패했습니다. 다시 시도해주세요.', error);
    throw error;
  }
};

// 입력한 닉네임과 일치하는 사용자 조회
export const NicknameDuplicateTest = async (nickname: string) => {
  const { data } = await supabase.from('users').select('nickname').eq('nickname', nickname).single();
  return data;
};

// 입력한 이메일과 일치하는 사용자 조회
export const emailDuplicateTest = async (email: string) => {
  const { data } = await supabase.from('users').select('email').eq('email', email).single();
  return data;
};

// 매 달의 plans 데이터 가져오기
export const getMonthlyPlans = async (year: number, month: number): Promise<PlansType[]> => {
  const startOfMonth = new Date(year, month - 1, 1); //첫 날
  const endOfMonth = new Date(year, month, 0); //마지막 날 (4/30 00:00:00)
  // 현재 start_date가 4/30 01:00 이기 때문에 연속 일정의 첫 날도 함께 포함시키기 위함
  endOfMonth.setHours(23, 59, 59, 999);

  const { data: plans, error } = await supabase
    .from(PLANS)
    .select('plan_id, user_id, contacts_id, title, detail, priority, start_date, end_date')
    //해당 달의 데이터만 가져오기(넘어가는 연속 일정 포함)
    .lte('start_date', endOfMonth.toISOString()) // 일정이 달의 마지막 날과 같거나 이전에 시작
    .gte('end_date', startOfMonth.toISOString()); // 일정이 달의 첫 날보다 같거나 이후에 끝
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
    const { data: plan, error } = await supabase.from('plans').insert(formdata).select();
    if (error) throw new Error(`약속 추가 중 오류가 발생했습니다 : ${error.message}`);

    return plan;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// contacts 데이터 저장하기
export const mutateInsertContacts = async (
  contactData: Omit<ContactDetailType, 'contacts_id'>
): Promise<ContactDetailType> => {
  try {
    const { data, error } = await supabase.from('contacts').insert(contactData).select();

    if (error) {
      console.error('연락처 저장 중 오류가 발생했습니다:', error);
      throw error;
    }

    return data[0];
  } catch (error) {
    console.error('연락처 저장 중 오류가 발생했습니다:', error);
    throw error;
  }
};

// 핀 업데이트 함수
export const mutateUpdateContactPin = async (contactId: string, isPinned: boolean) => {
  try {
    const { data, error } = await supabase
      .from('contacts')
      .update({ is_pinned: isPinned })
      .eq('contacts_id', contactId)
      .select();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('연락처 핀 업데이트 실패:', error);
    throw error;
  }
};

// 특정 사용자의 계획을 가져오는 함수 (30일 이내)
export const getUserPlans = async (userId: string): Promise<PlansType[]> => {
  // 현재 날짜와 30일 후 날짜 계산
  const currentDate = new Date();
  const thirtyDayslater = new Date();
  thirtyDayslater.setDate(currentDate.getDate() + 30);

  //ISO 형식으로 변환
  const currentDateISO = currentDate.toISOString();
  const thirtyDaysLaterISO = thirtyDayslater.toISOString();

  try {
    const { data, error } = await supabase
      .from('plans')
      .select('*')
      .eq('user_id', userId)
      .gte('start_date', currentDateISO)
      .lte('start_date', thirtyDaysLaterISO)
      .order('start_date', { ascending: true });

      if (error) {
        console.log('계획 데이터를 가져오는 중 오류가 발생했습니다.', error);
        return [];
      }

      return data || [];
  } catch (error) {
    console.error('Supabase 쿼리 중 예외가 발생했습니다:', error);
    return [];
  }
};
