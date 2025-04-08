export interface PlansType {
  plan_id: string;
  user_id: string;
  contacts_id: string;
  title: string;
  detail: string;
  priority: string;
  start_date: string;
  end_date: string;
}

export interface CalendarEventType {
  id: string;
  title: string | null;
  start: Date;
  end: Date;
}
