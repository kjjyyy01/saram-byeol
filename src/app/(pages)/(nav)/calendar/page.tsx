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

  //처음 받아오는 readonly 약속을 조작 가능하도록 복사
  useEffect(() => {
    if (events) {
      setLocalEvents((prevEvents) => {
        // 이미 수정된 localEvents가 있으면 덮어쓰지 않는다.
        if (prevEvents.length === 0) {
          return events;
        }
        return prevEvents;
      });
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

  const handleEditClose = (updatedPlan: EditPlanType) => {
    if (!updatedPlan) return; // 수정 취소한 경우

    updateLocalEvent({
      id: updatedPlan.plan_id,
      title: updatedPlan.title,
      start: new Date(updatedPlan.start_date),
      end: new Date(updatedPlan.end_date),
      colors: updatedPlan.colors,
    });
    // 수정 끝났으니, 모드 끄고 selectPlan을 수정한 걸로 새로 세팅
    setIsEditMode(false);
    setEditPlan(null);

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
    toast.success('약속이 수정되었습니다.');
  };

  const moveEventsHandler = ({ event, start, end }: DragEventType) => {
    updateEvent({ id: event.id, start: new Date(start), end: new Date(end) });

    updateLocalEvent({
      id: event.id,
      start: new Date(start),
      end: new Date(end),
    });

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
            <div className='m-5'>
              <PlanForm initialValues={initialFormData ?? undefined} handleCancel={setShowPlanForm}/>
            </div>
          </>
        ) : isEditMode && editPlan ? (
          <>
            <h2 className='mb-4 text-xl font-bold'>약속 수정</h2>
            <div className='m-5'>
              <EditPlanForm plan={editPlan} onClose={handleEditClose} />
            </div>
          </>
        ) : selectPlan ? (
          <>
            <h2 className='mb-4 text-xl font-bold'>약속 상세</h2>
            <div className='p-12'>
              <SelectPlan
                plans={selectPlan}
                onEdit={() => {
                  setIsEditMode(true);
                  setEditPlan(selectPlan[0]);
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
