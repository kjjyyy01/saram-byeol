import { getHolidays } from '@/app/api/holiday/service';
import { QUERY_KEY } from '@/constants/queryKey';
import { Holidays, Item } from '@/types/plans';
import { useQuery } from '@tanstack/react-query';

export const useGetHolidays = (calendarYear: string) => {
  // 공휴일 데이터 전체 가져오기
  const fetchHolidays = async () => {
    const res = await getHolidays(calendarYear);
    const items = res.response?.body?.items?.item || [];

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
      };
    });
    return formattedHolidays;
  };

  return useQuery({
    queryKey: [QUERY_KEY.HOLIDAYS],
    queryFn: fetchHolidays,
  });
};
