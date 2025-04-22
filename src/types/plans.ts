export interface PlansType {
  plan_id: string;
  user_id: string;
  contacts_id: string;
  title: string;
  detail: string;
  priority: string;
  start_date: string;
  end_date: string;
  location?: Partial<KakaoPlaceType> | null;
  colors: string;
}

export interface CalendarEventType {
  id: string;
  title: string | null;
  start: Date;
  end: Date;
  colors?: string;
}

// 공휴일 타입
export interface Item {
  dateKind: string;
  dateName: string;
  isHoliday: string;
  locdate: number;
  seq: number;
}

// 가공한 공휴일 타입
export interface Holidays {
  date: number;
  name: string;
  title?: string;
}

//약속 추가용 데이터 타입 //
export interface InsertNewPlansType {
  user_id: string | null;
  contacts_id?: string | null;
  location?: Partial<KakaoPlaceType> | null;
  title?: string | null;
  detail?: string | null;
  start_date?: string | null;
  end_date?: string | null;
  priority?: string;
  colors?: string;
}

// 약속 장소검색 api관련 타입
export interface KakaoSearchResultType {
  documents: KakaoPlaceType[];
  meta: KaKaoMetaType;
}

export interface KakaoPlaceType {
  id: string;
  place_name: string;
  category_name: string;
  category_group_code: string;
  category_group_name: string;
  phone: string;
  address_name: string;
  road_address_name: string;
  x: string; // longitude
  y: string; // latitude
  place_url: string;
  distance: string;
}
export interface KaKaoSameNameType {
  region: string[];
  keyword: string;
  selected_region: string;
}

export interface KaKaoMetaType {
  is_end: boolean;
  pageable_count: number;
  total_count: number;
  same_name?: KaKaoSameNameType;
}

export interface EditPlanType {
  plan_id: string;
  user_id: string;
  contacts_id: string;
  title: string;
  detail: string;
  priority: string;
  start_date: string;
  end_date: string;
  location?: Partial<KakaoPlaceType> | null;
  colors: string;
}

export interface SelectPlanType extends PlansType {
  contacts?: {
    name: string;
  } | null;
}
