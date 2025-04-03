// 사용자 타입
export interface User {
  id: string;
  user_id: string;
  email: string;
  nickname: string;
  profile_img?: string;
  created_at: string;
  updated_at: string;
}

// 연락처 타입
export interface Contact {
  id: string;
  contacts_id: string;
  user_id: string;
  name: string;
  relationship_level: string;
  email?: string;
  notes?: string;
  phone?: string;
  birth?: string;
  contact_profile_img?: string;
}

// 약속 타입
export interface Plan {
  plan_id: string;
  user_id: string;
  contacts_id: string;
  start_date:string;
  end_date: string;
  title: string;
  detail?: string;
  priority: 'low' | 'medium' | 'high';
}

// 리스트용 연락처 타입
export type ContactList = Pick<Contact, 'contacts_id' | 'name' | 'relationship_level' | 'contact_profile_img'>;