import { PlansType } from '@/types/plans';
import { supabase } from './supabaseClient';

export const getPlans = async (): Promise<PlansType[]> => {
  const { data: plans, error } = await supabase.from('plans').select('*');
  if (error) {
    throw new Error(error.message);
  }
  return plans;
};
