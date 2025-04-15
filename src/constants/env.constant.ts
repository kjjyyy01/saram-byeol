const ENV = {
  SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
  HOLIDAY_KEY: process.env.HOLIDAY_KEY || '',
  HOLIDAY_URL: process.env.HOLIDAY_BASE_URL || '',

  //카카오 로컬 api호출용
  KAKAO_KEY: process.env.KAKAO_REST_API_KEY || '',
  KAKAO_URL: process.env.KAKAO_BASE_URL || '',
};

export default ENV;
