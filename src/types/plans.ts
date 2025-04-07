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
