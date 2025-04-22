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
import { useUpadateEventMutate } from '@/hooks/mutations/useUpadateEventMutate';
import { useGetSelectPlan } from '@/hooks/queries/useGetSelectPlan';
import { format } from 'date-fns';

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
  const router = useRouter();
  const user = useAuthStore((state) => state.user); //현재 로그인 한 유저
  const isSignIn = useAuthStore((state) => state.isSignIn); //로그인 상태

  const [moment, setMoment] = useState(new Date()); //해당 달
  const calendarYear = moment.getFullYear(); //해당 달의 년도

  const { data: holidays } = useGetHolidays(String(calendarYear)); //공휴일
  const { data: events, isPending, isError, error } = useGetCalendarPlans(user, calendarYear, moment); //약속(readonly)

  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const { data: selectedPlanData, refetch: refetchSelectedPlan } = useGetSelectPlan(selectedPlanId ?? '');

  const [localEvents, setLocalEvents] = useState<CalendarEventType[]>([]); //직접 조작하는 약속(edit)

  const [hasMounted, setHasMounted] = useState(false); //마운트 상태
  const [selectPlan, setSelectPlan] = useState<SelectPlanType[] | null>(null); //약속 상세
  const [showUpcoming, setShowUpcoming] = useState(true); //다가오는 약속

  const [editPlan, setEditPlan] = useState<SelectPlanType | null>(null); //수정하는 약속
  const [isEditMode, setIsEditMode] = useState(false); //수정 모드 여부

  //옵션 더보기
  const { initialFormData, setInitialFormData } = usePlanFormStore();
  // showPlanForm 상태와 setShowPlanForm 함수 가져오기
  const { showPlanForm, setShowPlanForm } = usePlanFormStore();
  const { mutate: updateEvent } = useUpadateEventMutate();

  //캘린더 페이지 마운트 후, 로그인 여부 판단
  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (hasMounted && !isSignIn) {
      router.replace(SIGNIN);
    }
  }, [hasMounted, isSignIn, router]);

  // planId가 바뀔 때마다 refetch
  useEffect(() => {
    if (selectedPlanId) {
      refetchSelectedPlan();
    }
  }, [selectedPlanId, refetchSelectedPlan]);

  // 가져온 데이터로 selectPlan 세팅
  useEffect(() => {
    if (selectedPlanData?.data?.length) {
      // 클릭한 약속 바
      const clickPlan = selectedPlanData.data[0];

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
    }
  }, [selectedPlanData]);

  //처음 받아오는 readonly 약속을 조작 가능하도록 복사
  useEffect(() => {
    if (events) {
      setLocalEvents((prev) => (prev.length === 0 || events.length !== prev.length ? events : prev));
    }
  }, [events]);

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

  if (!hasMounted || !isSignIn) return null;

  if (isPending) {
    return <div>로딩 중입니다...</div>;
  }

  if (isError) {
    return <div>캘린더 에러 발생 : {error.message}</div>;
  }

  return (
    <div className='flex flex-col gap-4 md:flex-row'>
      <div className='md:flex-grow'>
        <MainCalendar
          // user={user}
          moment={moment}
          setMoment={setMoment}
          events={combinedEvents}
          onEventDrop={moveEventsHandler}
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
              setSelectPlan(null);
              setShowUpcoming(true);
              setShowPlanForm(false);
              setIsEditMode(false);
              setEditPlan(null);
            },
            onAddPlan: () => {
              setSelectPlan(null);
              setShowUpcoming(false);
              setShowPlanForm(true);
              setIsEditMode(false);
              setEditPlan(null);
              setInitialFormData(planFormDefaultValues);
            },
          }}
        />
      </div>

      <div className='flex-shrink-0 md:w-auto'>
        {showPlanForm ? (
          <>
            <h2 className='mb-4 text-xl font-bold'>약속 추가</h2>
            <div className='m-6'>
              <PlanForm
                initialValues={initialFormData ?? undefined}
                handleCancel={(show) => {
                  setShowPlanForm(show);
                  setShowUpcoming(true);
                }}
                mode='calendar'
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
        ) : (
          showUpcoming && user?.id && <UpcomingPlans userId={user.id} onSelectPlan={(plan) => setSelectPlan([plan])} />
        )}
      </div>
    </div>
  );
}
