// 간단한 날짜 포맷팅 함수 (n월 m일)
export const formatDateShort = (dateString: string): string => {
  const date = new Date(dateString);
  return `${date.getMonth() + 1}월 ${date.getDate()}일`;
};

// 오늘 날짜인지 확인하는 함수
export const isToday = (dateString: string): boolean => {
  const today = new Date();
  const planDate = new Date(dateString);
  return (
    planDate.getDate() === today.getDate() &&
    planDate.getMonth() === today.getMonth() &&
    planDate.getFullYear() === today.getFullYear()
  );
};

// D-day 계산 함수
export const calculateDday = (dateString: string): string => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // 오늘 날짜의 시작점 (자정)

  const planDate = new Date(dateString);
  // 계획 날짜의 시작점 (시간 정보 무시하고 날짜만 비교)
  const planDateOnly = new Date(planDate.getFullYear(), planDate.getMonth(), planDate.getDate());
  planDateOnly.setHours(0, 0, 0, 0);

  const diffTime = planDateOnly.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return 'D-Day';
  } else if (diffDays > 0) {
    return `D-${diffDays}`;
  } else {
    return `D+${Math.abs(diffDays)}`; // 지난 날짜의 경우
  }
};