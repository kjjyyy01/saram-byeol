import { useDemoStore } from '@/store/zustand/useDemoStore';

export const useGetDemoPlans = () => {
  const { demoPlans } = useDemoStore();

  return demoPlans.map((plan) => ({
    id: plan.plan_id,
    title: plan.title,
    start: new Date(plan.start_date),
    end: new Date(plan.end_date),
    colors: plan.colors,
  }));
};
