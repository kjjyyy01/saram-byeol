import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { ContactType } from '@/types/contacts';
import type { PlansType, SelectPlanType } from '@/types/plans';
import { toast } from 'react-toastify';
import { demoContacts, demoPlans, demoUser } from '@/constants/demoData';
import { User } from '@supabase/supabase-js';

interface DemoState {
  isDemoUser: boolean;
  demoContacts: ContactType[];
  demoPlans: PlansType[];
  demoUser: User;

  setDemoUser: () => void;
  addContact: (person: ContactType) => void;
  updateContact: (person: ContactType) => void;
  togglePinContact: (id: string, isPinned: boolean) => void;
  deleteContact: (id: string) => void;
  getContactsWithPlans: (id: string) => {
    contact: ContactType;
    plans: PlansType[];
  };
  getPlan: (id: string) => { data: SelectPlanType[]; error: null };
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
    (set, get) => ({
      ...initialState,

      setDemoUser: () =>
        set(() => {
          localStorage.clear();
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
      getContactsWithPlans: (id) => {
        const contact = get().demoContacts.find((c) => c.contacts_id === id)!;
        const plans = get().demoPlans.filter((p) => p.contacts_id === id);

        return { contact, plans };
      },

      updateContact: (person) =>
        set((state) => ({
          demoContacts: state.demoContacts.map((p) => (p.id === person.id ? person : p)),
        })),
      togglePinContact: (id, isPinned) => {
        let updatedContacts: ContactType[] = [];

        set((state) => {
          updatedContacts = state.demoContacts.map((p) => (p.id === id ? { ...p, is_pinned: isPinned } : p));

          return {
            demoContacts: updatedContacts,
          };
        });

        return { updatedContacts };
      },
      deleteContact: (id) =>
        set((state) => ({
          demoContacts: state.demoContacts.filter((p) => p.id !== id),
          demoPlans: state.demoPlans.filter((a) => a.plan_id !== id),
        })),

      getPlan: (id) => {
        const plans = get().demoPlans.filter((p) => p.plan_id === id);

        const enrichedPlans = plans.map((plan) => {
          const contact = get().demoContacts.find((c) => c.contacts_id === plan.contacts_id);
          return {
            ...plan,
            contacts: {
              name: contact?.name ?? '',
            },
          };
        });

        return {
          data: enrichedPlans,
          error: null,
        };
      },
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
          demoPlans: state.demoPlans.map((p) => (p.plan_id === plan.plan_id ? { ...p, plan } : p)),
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
