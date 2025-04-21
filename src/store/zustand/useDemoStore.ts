import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { ContactType } from '@/types/contacts';
import type { PlansType } from '@/types/plans';
import { toast } from 'react-toastify';
import { demoUser } from '@/constants/demoData';
// import { User } from '@supabase/supabase-js';
interface DemoUser {
  user: {
    app_metadata: { provider: string };
    id: string;
    user_metadata: {
      email: string;
      nickname: string;
      name: string;
      profile_img: string;
    };
  };
}

interface DemoState {
  isDemoUser: boolean;
  contacts: ContactType[];
  plans: PlansType[];
  demoUser: DemoUser;

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
  demoUser,
};

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
