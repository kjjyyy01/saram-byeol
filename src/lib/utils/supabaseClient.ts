import ENV from '@/constants/env.constant';
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(ENV.SUPABASE_URL, ENV.SUPABASE_ANON_KEY);
