import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { ContactType } from '@/types/contacts';
import type { PlansType, SelectPlanType } from '@/types/plans';
import { demoContacts, demoPlans, demoUser } from '@/constants/demoData';
import { User } from '@supabase/supabase-js';

interface DemoState {
  isDemoUser: boolean;
  demoContacts: ContactType[];
  demoPlans: PlansType[];
  demoUser: User;

  setDemoUser: () => void;

  getContactsWithPlans: (id: string) => {
    contact: ContactType;
    plans: PlansType[];
  };
  getPlan: (id: string) => { data: SelectPlanType[]; error: null };
  getPlanInMonth: () => { filterdData: PlansType[] };
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
      getContactsWithPlans: (id) => {
        const contact = get().demoContacts.find((c) => c.contacts_id === id)!;
        const plans = get().demoPlans.filter((p) => p.contacts_id === id);

        return { contact, plans };
      },
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
      getPlanInMonth: () => {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const monthLater = new Date();
        monthLater.setDate(currentDate.getDate() + 30);
        monthLater.setHours(23, 59, 59, 999);

        const filterdData = demoPlans.filter((plan) => {
          const planStartDate = new Date(plan.start_date);
          return planStartDate >= currentDate && planStartDate <= monthLater;
        });

        return { filterdData };
      },
      clearAll: () =>
        set(() => {
          localStorage.clear();
          return initialState;
        }),
    }),
    {
      name: 'demo-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
