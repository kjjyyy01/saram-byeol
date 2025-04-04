export interface PlansType {
  plan_id: string;
  created_at: number;
  user_id: string;
  contacts_id: string;
  start_date: string;
  end_date: string;
  title: string | null;
  detail: string | null;
  priority: string | null;
}

export interface CalendarEventType {
  id: string;
  title: string | null;
  start: Date;
  end: Date;
}
