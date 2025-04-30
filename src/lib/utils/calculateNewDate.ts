// 날짜 계산 함수 (공통)
export const calculateNewDate = (moment: Date, action: 'NEXT' | 'PREV' | 'TODAY' | 'DATE') => {
  let newDate = new Date(moment);
  if (action === 'NEXT') {
    newDate.setMonth(newDate.getMonth() + 1);
  } else if (action === 'PREV') {
    newDate.setMonth(newDate.getMonth() - 1);
  } else if (action === 'TODAY') {
    newDate = new Date(); // 오늘
  }
  return newDate;
};
