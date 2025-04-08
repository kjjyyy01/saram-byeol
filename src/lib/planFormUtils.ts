import { add } from 'date-fns';
import { PlanFormType } from './schemas/plansSchema';

//날짜에 1시간 씩 추가
export const addTimeHour = (date: Date) => {
  return add(date, { hours: 1 });
};

//종료일에 30분 추가용
export const addTimeMore = (date: Date) => {
  return add(date, { minutes: 30 });
};

//종료일이 없으면 시작일을 종료일에 대입
export const getStartAndEndDate = (from: Date, to?: Date) => {
  const start_date = addTimeHour(from);
  const end_date = to ? addTimeHour(to) : addTimeMore(start_date);
  return { start_date, end_date };
};

//입력 데이터 구조분해 할당
export const mappingFormData = (data: PlanFormType) => {
  const { title, detail, contacts, dateInput } = data;
  const { start_date, end_date } = getStartAndEndDate(dateInput.from, dateInput.to);

  return { title, detail, contacts_id: contacts, start_date, end_date };
};
