import ENV from '@/constants/env.constant';

// 공공데이터 공휴일 API
export const getHolidays = async (year: string) => {
  const BASE_URL = 'http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService';
  const res = await fetch(
    //현재 년도 값만
    `${BASE_URL}/getRestDeInfo?ServiceKey=${ENV.HOLIDAY_KEY}&solYear=${year}&_type=json&numOfRows=100`
  );
  const data = await res.json();

  return data;
};
