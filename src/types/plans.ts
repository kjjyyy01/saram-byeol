export interface PlansType {
  plan_id: string;
  user_id: string;
  contacts_id: string;
  title: string | null;
  detail: string | null;
  priority: string | null;
  start_date: string;
  end_date: string;
}

export interface CalendarEventType {
  id: string;
  title: string | null;
  start: Date;
  end: Date;
}

//약속 추가용 데이터 타입 //
export interface InsertNewPlansType {
  user_id: string;
  contacts_id?: string | null;
  title?: string | null;
  detail?: string | null;
  start_date?: Date | null;
  end_date?: Date | null;
  priority?: string | null;
}
