import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { ContactType } from '@/types/contacts';
import type { PlansType } from '@/types/plans';
import { toast } from 'react-toastify';

interface DemoState {
  isDemoUser: boolean;
  contacts: ContactType[];
  plans: PlansType[];

  setDemoUser: () => void;
  addContact: (person: ContactType) => void;
  updateContact: (person: ContactType) => void;
  togglePinContact: (id: string) => void;
  deleteContact: (id: string) => void;

  addPlan: (plan: PlansType) => void;
  updatePlan: (plan: PlansType) => void;
  deletePlan: (id: string) => void;

  clearAll: () => void;
}

const initialState = {
  isDemoUser: false,
  contacts: [],
  plans: [],
};
const demoUser = {
  user: {
    app_metadata: { provider: 'email' },
    id: '297e8f39-2421-4fff-866a-d3887dd6effe',
    user_metadata: {
      email: 'demo-user@mail.com',
      nickname: '김데모',
      profile_img:
        'https://sogssbvoxwlfglnmwmge.supabase.co/storage/v1/object/sign/demo-storage/user-profile/sung-wang-g4DgCF90EM4-unsplash.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZW1vLXN0b3JhZ2UvdXNlci1wcm9maWxlL3N1bmctd2FuZy1nNERnQ0Y5MEVNNC11bnNwbGFzaC5qcGciLCJpYXQiOjE3NDUyMTQ2MjEsImV4cCI6MTc0NzgwNjYyMX0.zGaHcIc7PHPkjDoNs_NT8YFyBa2RFBMwA07iDbKqhH0',
    },
  },
};
//내사람 추가, 수정, 삭제
//약속 추가, 삭제
//제한된 기능 제공
export const useDemoStore = create<DemoState>()(
  persist(
    (set) => ({
      ...initialState,

      setDemoUser: () =>
        set(() => {
          localStorage.setItem('user-storage', JSON.stringify(demoUser));
          return { isDemoUser: true };
        }),
      addContact: (person) =>
        set((state) => {
          if (state.contacts.length >= 3) {
            toast.warning('데모모드에서는 최대 3명까지 등록할 수 있습니다.');
            return state;
          }
          return { contacts: [...state.contacts, person] };
        }),

      updateContact: (person) =>
        set((state) => ({
          contacts: state.contacts.map((p) => (p.id === person.id ? person : p)),
        })),
      togglePinContact: (id) =>
        set((state) => ({
          contacts: state.contacts.map((p) => (p.id === id ? { ...p, is_pinned: !p.is_pinned } : p)),
        })),
      deleteContact: (id) =>
        set((state) => ({
          contacts: state.contacts.filter((p) => p.id !== id),
          plans: state.plans.filter((a) => a.plan_id !== id),
        })),

      addPlan: (plan) =>
        set((state) => {
          if (state.plans.length >= 5) {
            toast.warning('데모 모드에서는 최대 5개의 약속만 등록할 수 있습니다.');
            return state;
          }
          return { plans: [...state.plans, plan] };
        }),
      updatePlan: (plan) =>
        set((state) => ({
          plans: state.plans.map((p) => (p.plan_id === plan.plan_id ? plan : p)),
        })),
      deletePlan: (id) =>
        set((state) => ({
          plans: state.plans.filter((a) => a.plan_id !== id),
        })),

      clearAll: () =>
        set(() => {
          localStorage.removeItem('user-storage');
          return initialState;
        }),
    }),
    {
      name: 'demo-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
