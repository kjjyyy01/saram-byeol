import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { ContactType } from '@/types/contacts';
import type { PlansType } from '@/types/plans';

// 약속 타입
// export interface PlansType {
//   plan_id: string;
//   user_id: string;
//   contacts_id: string;
//   title: string;
//   detail: string;
//   priority: string;
//   start_date: string;
//   end_date: string;
//   location?: Partial<KakaoPlaceType> | null;
//   colors: string;
// }
// 사용자 타입
// export interface UserType {
//     id: string;
//     user_id: string;
//     email: string;
//     nickname: string;
//     profile_img?: string;
//     created_at: string;
//     updated_at: string;
//   }

//   // 연락처 타입
//   export interface ContactType {
//     id: string;
//     contacts_id: string;
//     user_id: string;
//     name: string;
//     relationship_level: string;
//     email: string;
//     notes: string;
//     phone: string;
//     birth: string;
//     contacts_profile_img?: string;
//     is_pinned?: boolean;
//   }

interface DemoState {
  isDemoUser: boolean;
  contacts: ContactType[];
  plans: PlansType[];

  setDemoUser: () => void;
  addContact: (person: ContactType) => void;
  updateContact: (person: ContactType) => void;
  deleteContact: (id: string) => void;

  addPlan: (plan: PlansType) => void;
  deletePlan: (id: string) => void;

  clearAll: () => void;
}

const initialState = {
  isDemoUser: false,
  contacts: [],
  plans: [],
};
//내사람 추가, 수정, 삭제
//약속 추가, 삭제
//제한된 기능 제공
export const useDemoStore = create<DemoState>()(
  persist(
    (set) => ({
      ...initialState,

      setDemoUser: () => set({ isDemoUser: true }),

      addContact: (person) => set((state) => ({ contacts: [...state.contacts, person] })),

      updateContact: (person) =>
        set((state) => ({
          contacts: state.contacts.map((p) => (p.id === person.id ? person : p)),
        })),

      deleteContact: (id) =>
        set((state) => ({
          contacts: state.contacts.filter((p) => p.id !== id),
          plans: state.plans.filter((a) => a.plan_id !== id),
        })),

      addPlan: (plan) =>
        set((state) => ({
          plans: [...state.plans, plan],
        })),

      deletePlan: (id) =>
        set((state) => ({
          plans: state.plans.filter((a) => a.plan_id !== id),
        })),

      clearAll: () => set(initialState),
    }),
    {
      name: 'demo-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
