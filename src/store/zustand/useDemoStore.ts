import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { ContactType } from '@/types/contacts';
import type { PlansType } from '@/types/plans';
import { toast } from 'react-toastify';
import { demoContacts, demoPlans, demoUser } from '@/constants/demoData';
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
  demoContacts: ContactType[];
  demoPlans: PlansType[];
  demoUser: DemoUser;

  setDemoUser: () => void;
  addContact: (person: ContactType) => void;
  updateContact: (person: ContactType) => void;
  togglePinContact: (id: string, isPinned: boolean) => void;
  deleteContact: (id: string) => void;

  addPlan: (plan: PlansType) => void;
  updatePlan: (plan: PlansType) => void;
  deletePlan: (id: string) => void;

  clearAll: () => void;
}

const initialState = {
  isDemoUser: false,
  demoContacts,
  demoPlans,
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
          if (state.demoContacts.length >= 3) {
            toast.warning('데모모드에서는 최대 3명까지 등록할 수 있습니다.');
            return state;
          }
          return { demoContacts: [...state.demoContacts, person] };
        }),

      updateContact: (person) =>
        set((state) => ({
          demoContacts: state.demoContacts.map((p) => (p.id === person.id ? person : p)),
        })),
      togglePinContact: (id, isPinned) =>
        set((state) => ({
          demoContacts: state.demoContacts.map((p) => (p.id === id ? { ...p, is_pinned: isPinned } : p)),
        })),
      deleteContact: (id) =>
        set((state) => ({
          demoContacts: state.demoContacts.filter((p) => p.id !== id),
          demoPlans: state.demoPlans.filter((a) => a.plan_id !== id),
        })),

      addPlan: (plan) =>
        set((state) => {
          if (state.demoPlans.length >= 5) {
            toast.warning('데모 모드에서는 최대 5개의 약속만 등록할 수 있습니다.');
            return state;
          }
          return { demoPlans: [...state.demoPlans, plan] };
        }),
      updatePlan: (plan) =>
        set((state) => ({
          demoPlans: state.demoPlans.map((p) => (p.plan_id === plan.plan_id ? plan : p)),
        })),
      deletePlan: (id) =>
        set((state) => ({
          demoPlans: state.demoPlans.filter((a) => a.plan_id !== id),
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
