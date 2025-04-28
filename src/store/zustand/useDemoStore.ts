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
  // 데모 플랜을 업데이트하는 함수 추가
  updateDemoPlan: (planId: string, start: string, end: string) => void;
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

        const filterdData = get().demoPlans.filter((plan) => {
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

      updateDemoPlan: (planId, start, end) =>
        set((state) => {
          const updatedPlans = state.demoPlans.map((plan) =>
            plan.plan_id === planId ? { ...plan, start_date: start, end_date: end } : plan
          );
          return { demoPlans: updatedPlans };
        }),
    }),
    {
      name: 'demo-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
