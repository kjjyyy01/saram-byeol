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

//시작일과 종료일 시간 추가 처리
export const getStartAndEndDate = (from: Date, to?: Date) => {
  const start_date = addTimeHour(from);
  const end_date = to ? addTimeMore(addTimeHour(to)) : addTimeMore(start_date);
  return { start_date, end_date };
};

//입력 데이터 구조분해 할당
export const mappingFormData = (data: PlanFormType) => {
  const { title, detail, contacts, dateInput, location } = data;
  const { start_date, end_date } = getStartAndEndDate(dateInput.from, dateInput.to);
  return { title, detail, contacts_id: contacts, start_date, end_date, location };
};

//검색없이 인풋값만 있을 때 데이터 처리 
export const inputToPlace = (input: string) => {
  const place = {
    place_name: input,
    road_address_name: '',
    place_url: '',
    id: '',
    phone: '',
    x: '',
    y: '',
  };
  return place;
};
// 나중에 시간정보가 추가되면, 시간정보가 있을 때는 날짜에서 시간을 빼고 저장하고..
//시간 값은 별도 테이블에 담기...
