import { QUERY_KEY } from '@/constants/queryKey';
import { Holidays, Item } from '@/types/plans';
import { useQuery } from '@tanstack/react-query';

export const useGetHolidays = (calendarYear: string) => {
  // 공휴일 데이터 전체 가져오기
  const fetchHolidays = async () => {
    const res = await fetch(`/api/holidays?year=${calendarYear}`); // 년도에 맞는 데이터

    // 명시적 에러 throw
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || '공휴일 데이터를 불러올 수 없습니다');
    }

    const data = await res.json();
    const items = data.response?.body?.items?.item || [];

    // 필요한 값만 추출
    const holidays = items.map((item: Item) => ({
      date: item.locdate, // 20250408 형식
      name: item.dateName,
    }));

    // 캘린더에 적용할 수 있도록 가공
    const formattedHolidays = holidays.map((item: Holidays) => {
      const dateStr = item.date.toString(); // number → string

      return {
        title: item.name,
        date: new Date(
          parseInt(dateStr.slice(0, 4), 10), // year
          parseInt(dateStr.slice(4, 6), 10) - 1, // month (0-indexed)
          parseInt(dateStr.slice(6, 8), 10) // day
        ),
        isHoliday: true,
      };
    });
    return formattedHolidays;
  };

  return useQuery({
    queryKey: [QUERY_KEY.HOLIDAYS, calendarYear], // 년도에 따라 쿼리키 변동
    queryFn: fetchHolidays,
    staleTime: 1000 * 60 * 60 * 24, // 1일
  });
};
