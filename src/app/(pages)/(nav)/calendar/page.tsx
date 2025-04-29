'use client';
import MainCalendar from '@/components/calendar/MainCalendar';
import SelectPlan from '@/components/calendar/SelectPlan';
import PlanForm from '@/components/plans/PlanForm';
import EditPlanForm from '@/components/contactDetail/editPlanForm/EditPlanForm';
import UpcomingPlans from '@/components/schedule/UpcomingPlans';
import { SIGNIN } from '@/constants/paths';
import { useAuthStore } from '@/store/zustand/store';
import { CalendarEventType, EditPlanType, Holidays, SelectPlanType } from '@/types/plans';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { usePlanFormStore } from '@/store/zustand/usePlanFormStore';
import { planFormDefaultValues } from '@/lib/schemas/plansSchema';
import { useGetHolidays } from '@/hooks/queries/useGetHolidays';
import { useGetCalendarPlans } from '@/hooks/queries/useGetCalendarPlans';
import { toast } from 'react-toastify';
import { useGetSelectPlan } from '@/hooks/queries/useGetSelectPlan';
import { format } from 'date-fns';
import { useDemoStore } from '@/store/zustand/useDemoStore';
import Loading from '@/components/Loading';
import { useGetDemoPlans } from '@/hooks/queries/useGetDemoPlans';
import { useUpdateEventMutate } from '@/hooks/mutations/useUpadateEventMutate';
import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants/queryKey';
import { fetchCalendarPlans } from '@/lib/utils/fetchCalendarPlans';
import { NavigateAction } from 'react-big-calendar';

interface UpdatedEventType {
  id: string;
  title?: string;
  start: Date;
  end: Date;
  colors?: string;
}

// 드래그 이벤트 타입
export interface DragEventType {
  event: CalendarEventType;
  start: string | Date;
  end: string | Date;
}

export default function Calendar() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const user = useAuthStore((state) => state.user); //현재 로그인 한 유저
  const isSignIn = useAuthStore((state) => state.isSignIn); //로그인 상태
  const [moment, setMoment] = useState(new Date()); //해당 달
  const calendarYear = moment.getFullYear(); //해당 달의 년도

  const { data: holidays, error: holidaysError } = useGetHolidays(String(calendarYear)); //공휴일
  const { data: events, isPending, error: plansError } = useGetCalendarPlans(user, calendarYear, moment); //약속(readonly)

  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const { data, error: selectPlanError, refetch: refetchSelectedPlan } = useGetSelectPlan(selectedPlanId ?? '');

  const [localEvents, setLocalEvents] = useState<CalendarEventType[]>([]); //직접 조작하는 약속(edit)

  const [hasMounted, setHasMounted] = useState(false); //마운트 상태
  const [selectPlan, setSelectPlan] = useState<SelectPlanType[] | null>(null); //약속 상세
  const [showUpcoming, setShowUpcoming] = useState(true); //다가오는 약속

  const [editPlan, setEditPlan] = useState<SelectPlanType | null>(null); //수정하는 약속
  const [isEditMode, setIsEditMode] = useState(false); //수정 모드 여부

  //demoStates
  const { isDemoUser, demoUser } = useDemoStore();
  const getPlan = useDemoStore((state) => state.getPlan);
  const isAccessGranted = isSignIn || isDemoUser; //로그인하거나, 데모유저일 때 접근가능하도록 함
  const demoData = getPlan(selectedPlanId ?? '');
  const selectedPlanData = isDemoUser ? demoData : data;
  const demoEvents = useGetDemoPlans();

  const userId = isDemoUser ? demoUser.id : user?.id;

  //옵션 더보기
  const { setInitialFormData } = usePlanFormStore();
  // showPlanForm 상태와 setShowPlanForm 함수 가져오기
  const { showPlanForm, setShowPlanForm } = usePlanFormStore();
  const { mutate: updateEvent, error: updatePlanError } = useUpdateEventMutate();

  // 툴바 버튼 동적
  const [activeTab, setActiveTab] = useState<'upcoming' | 'add'>('upcoming');

  //캘린더 페이지 마운트 후, 로그인 여부 판단
  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (hasMounted && !isAccessGranted) {
      router.replace(SIGNIN);
    }
  }, [hasMounted, isAccessGranted, router]);

  // 약속바 클릭마다 약속 상세 refetch
  useEffect(() => {
    if (isDemoUser) {
      return;
    }
    if (selectedPlanId) {
      refetchSelectedPlan();
    }
  }, [selectedPlanId, refetchSelectedPlan]);

  // 가져온 데이터로 selectPlan 세팅
  useEffect(() => {
    if (!selectedPlanData?.data?.length) return;

    // 클릭한 약속 바
    const clickPlan = selectedPlanData.data[0];
    if (isDemoUser) {
      // 이미 같은 ID를 가진 plan이 selectPlan에 있다면 무시
      if (selectPlan?.[0]?.plan_id === clickPlan.plan_id) return;
    }
    const formattedPlan = {
      ...clickPlan,
      contacts: Array.isArray(clickPlan.contacts)
        ? (clickPlan.contacts[0] ?? { name: '' }) // 배열이면 첫 번째 꺼내고
        : (clickPlan.contacts ?? { name: '' }), // 객체거나 null이면 그대로
    };
    setSelectPlan([formattedPlan]);
    setShowUpcoming(false);
    setShowPlanForm(false);
    setIsEditMode(false);
    setEditPlan(null);
  }, [selectedPlanData]);

  //처음 받아오는 readonly 약속을 조작 가능하도록 복사
  useEffect(() => {
    if (isDemoUser) {
      setLocalEvents(demoEvents);
    }
    if (events) {
      setLocalEvents((prev) => (prev.length === 0 || events.length !== prev.length ? events : prev));
    }
  }, [events, isDemoUser]);

  const updateLocalEvent = (updatedEvent: UpdatedEventType) => {
    setLocalEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === updatedEvent.id
          ? {
              ...event,
              title: updatedEvent.title ?? event.title, // 없으면 기존 title 유지
              start: new Date(updatedEvent.start),
              end: new Date(updatedEvent.end),
              colors: updatedEvent.colors ?? event.colors,
            }
          : event
      )
    );
  };

  const handleEditClose = async (updatedPlan: EditPlanType | null) => {
    if (!updatedPlan) {
      setIsEditMode(false);
      setEditPlan(null);
      return;
    } // 수정 취소한 경우

    updateLocalEvent({
      id: updatedPlan.plan_id,
      title: updatedPlan.title,
      start: new Date(updatedPlan.start_date),
      end: new Date(updatedPlan.end_date),
      colors: updatedPlan.colors,
    });

    setSelectPlan([
      {
        plan_id: updatedPlan.plan_id,
        user_id: updatedPlan.user_id,
        contacts_id: updatedPlan.contacts_id,
        title: updatedPlan.title,
        detail: updatedPlan.detail,
        start_date: updatedPlan.start_date,
        end_date: updatedPlan.end_date,
        colors: updatedPlan.colors,
        priority: updatedPlan.priority,
      },
    ]);
    setIsEditMode(false); // 수정 모드 종료
    setEditPlan(null);

    // 최신 데이터를 다시 가져옴
    await refetchSelectedPlan();

    toast.success('약속이 수정되었습니다.');
  };

  const moveEventsHandler = ({ event, start, end }: DragEventType) => {
    if (isDemoUser) {
      toast.info('데모체험중에는 제한된 기능입니다.');
      return;
    }
    // 캘린더에서는 Date 객체를 유지
    updateLocalEvent({
      id: event.id,
      start: new Date(start),
      end: new Date(end),
    });

    // DB에는 string 포맷으로 변환해서 저장
    const formattedStart = format(start, 'yyyy-MM-dd HH:mm:ss');
    const formattedEnd = format(end, 'yyyy-MM-dd HH:mm:ss');

    updateEvent(
      { id: event.id, start: formattedStart, end: formattedEnd },
      {
        onError: () => {
          toast.error('시간 변경에 실패했습니다.');
          updateLocalEvent({ id: event.id, start: event.start, end: event.end }); // 롤백
        },
      }
    );

    toast.success('약속 시간이 변경되었습니다.');
  };

  // 약속 + 공휴일
  const combinedEvents: CalendarEventType[] = [
    ...(localEvents || []),
    ...(holidays || []).map((holiday: Holidays, idx: number) => ({
      id: `holiday-${idx}`,
      title: holiday.title,
      start: holiday.date,
      end: holiday.date, // 단일 일정
      isHoliday: true, // 스타일 구분용
      colors: '#2F80ED', // 기본 색상
    })),
  ];

  // 날짜 계산 함수 (공통)
  const calculateNewDate = (moment: Date, action: 'NEXT' | 'PREV' | 'TODAY' | 'DATE') => {
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

  // 프리페칭 함수 (hover 시 호출)
  const prefetchCalendarPlans = async (action: 'NEXT' | 'PREV' | 'TODAY' | 'DATE') => {
    if (action === 'DATE') return; // DATE 액션은 prefetch 안 함

    const newDate = calculateNewDate(moment, action);
    const newYear = newDate.getFullYear();
    const newMonth = newDate.getMonth() + 1;

    await queryClient.prefetchQuery({
      queryKey: [QUERY_KEY.PLANS, user?.id, newYear, newMonth],
      queryFn: () => fetchCalendarPlans({ user, year: newYear, date: newDate }),
      staleTime: 5 * 60 * 1000, // 5분 동안은 fresh
    });
  };

  // 네비게이션 핸들러 (click 시 호출)
  const handleNavigate = (action: NavigateAction) => {
    if (action === 'NEXT' || action === 'PREV' || action === 'TODAY') {
      const newDate = calculateNewDate(moment, action);
      setMoment(newDate);
    }
  };

  if (!hasMounted || !isAccessGranted) return null;

  if (isPending && !isDemoUser) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  if (holidaysError || plansError || selectPlanError || updatePlanError) {
    const error = new Error('캘린더 데이터를 불러오는 중 문제가 발생했습니다.') as Error & {
      originalError?: Error | null;
    };
    error.originalError = holidaysError ?? plansError ?? selectPlanError ?? updatePlanError;
    throw error;
  }

  return (
    <div className='flex flex-col gap-4 md:flex-row'>
      <div className='md:flex-grow'>
        <MainCalendar
          moment={moment}
          setMoment={setMoment}
          events={combinedEvents}
          onEventDrop={moveEventsHandler}
          activeTab={activeTab}
          holidays={holidays}
          onSelectPlan={(planId) => setSelectedPlanId(planId)}
          setSelectPlan={(plan) => {
            setSelectPlan(plan);
            setShowUpcoming(false);
            setShowPlanForm(false);
            setIsEditMode(false);
            setEditPlan(null);
          }}
          CustomToolbarProps={{
            onShowUpcomingPlans: () => {
              if (isDemoUser) {
                setShowUpcoming(true);
                setShowPlanForm(false);
                setIsEditMode(false);
                setEditPlan(null);
                setActiveTab('upcoming');
                return;
              }
              setSelectPlan(null);
              setShowUpcoming(true);
              setShowPlanForm(false);
              setIsEditMode(false);
              setEditPlan(null);
              setActiveTab('upcoming');
            },
            onAddPlan: () => {
              if (isDemoUser) {
                setShowUpcoming(false);
                setShowPlanForm(true);
                setIsEditMode(false);
                setEditPlan(null);
                setInitialFormData(planFormDefaultValues);
                setActiveTab('add');
                return;
              }
              setSelectPlan(null);
              setShowUpcoming(false);
              setShowPlanForm(true);
              setIsEditMode(false);
              setEditPlan(null);
              setInitialFormData(planFormDefaultValues);
              setActiveTab('add');
            },
            onPrefetch: prefetchCalendarPlans,
            onNavigate: handleNavigate,
          }}
        />
      </div>

      <div className='flex-shrink-0 md:w-auto'>
        {showPlanForm ? (
          <>
            <h2 className='mb-4 text-xl font-bold'>약속 추가</h2>
            <div className='m-6'>
              <PlanForm
                onClose={() => {
                  setShowPlanForm(false);
                  setShowUpcoming(true);
                }}
              />
            </div>
          </>
        ) : isEditMode && editPlan ? (
          <>
            <h2 className='mb-4 text-xl font-bold'>약속 수정</h2>
            <div className='m-7'>
              <EditPlanForm plan={editPlan} onClose={handleEditClose} />
            </div>
          </>
        ) : showUpcoming && isAccessGranted && userId ? (
          <UpcomingPlans userId={userId} onSelectPlan={(plan) => setSelectPlan([plan])} />
        ) : selectPlan ? (
          <>
            <h2 className='mb-4 text-xl font-bold'>약속 상세</h2>
            <div className='p-11'>
              <SelectPlan
                plans={selectPlan}
                onEdit={() => {
                  setIsEditMode(true);
                  setEditPlan(selectPlan[0]);
                }}
                onDeleteSuccess={() => {
                  setSelectPlan(null); // selectPlan 비우고
                  setShowUpcoming(true); // UpcomingPlans 보이게
                }}
              />
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
