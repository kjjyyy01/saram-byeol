'use client';

import { PlanDetailType } from '@/types/contacts';
import ContactPlansCard from '@/components/contactDetail/ContactPlansCard';
import { useState } from 'react';
import SideSheet from '@/components/contacts/SideSheet';
import EditPlanForm from '@/components/contactDetail/editPlanForm/EditPlanForm';
import { EditPlanType, PlansType } from '@/types/plans';
import { useMutateDeletePlan } from '@/hooks/mutations/useMutateDeletePlan';
import { toast } from 'react-toastify';
import PlanForm from '@/components/plans/PlanForm';
import { ConfirmToast } from '../toast/ConfirmToast';
import { useDemoStore } from '@/store/zustand/useDemoStore';
import { Plus } from '@phosphor-icons/react';
import { sortPlansByDate } from '@/lib/utils/sortPlansByDate';

interface Props {
  plans: PlanDetailType[] | PlansType[];
}

const ContactPlans = ({ plans }: Props) => {
  const [isAddPlanOpen, setIsAddPlanOpen] = useState(false);
  const [isEditPlanOpen, setIsEditPlanOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PlanDetailType | PlansType | null>(null);
  const { isDemoUser } = useDemoStore();

  const { mutate: deletePlan } = useMutateDeletePlan();

  const editPlanHandler = (plan: PlanDetailType | PlansType) => {
    setSelectedPlan(plan);
    setIsEditPlanOpen(true);
  };

  const deletePlanHandler = (planId: string) => {
    if (isDemoUser) {
      toast.info('데모체험중에는 제한된 기능입니다.');
      return;
    }
    ConfirmToast({
      message: '정말로 해당 약속을 삭제하시겠습니까?',
      onConfirm: () => {
        deletePlan(planId, {
          onSuccess: () => {
            toast.success('성공적으로 삭제되었습니다.');
          },
          onError: () => {
            toast.error('삭제에 실패했습니다.');
          },
        });
      },
    });
  };

  return (
    <div>
      {/* 타이틀 & 추가 버튼 라인 */}
      <div className='mb-4 flex items-center gap-12'>
        <h2 className='text-xl font-semibold'>약속 전체보기</h2>
      </div>

    {/* 약속 카드 목록 */}
    <ul className='grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3'>
      {/* 약속 추가 버튼 */}
      <li>
        <button
          onClick={() => setIsAddPlanOpen(true)}
          className='flex h-full w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-white p-6 text-blue-500 transition hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600'
          style={{ boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' }}
        >
          <Plus size={28} weight='bold' />
          <span className='mt-1 text-sm font-medium'>약속 추가</span>
        </button>
      </li>

      {/* 약속이 있을 경우만 카드 렌더링 */}
      {plans.length === 0 ? (
        <li className="col-span-full text-gray-500">등록된 약속이 없습니다.</li>
      ) : (
        sortPlansByDate(plans).map((plan) => (
          <li key={plan.plan_id}>
            <ContactPlansCard
              title={plan.title}
              startDate={plan.start_date}
              color={plan.colors}
              onEdit={() => editPlanHandler(plan)}
              onDelete={() => deletePlanHandler(plan.plan_id)}
            />
          </li>
        ))
      )}
    </ul>

      {/* 사이드 시트 - 약속 추가 */}
      <SideSheet isOpen={isAddPlanOpen} onClose={() => setIsAddPlanOpen(false)} title='약속 추가'>
        <PlanForm onClose={() => setIsAddPlanOpen(false)} />
      </SideSheet>

      {/* 사이드 시트 - 약속 수정 */}
      <SideSheet isOpen={isEditPlanOpen} onClose={() => setIsEditPlanOpen(false)} title='약속 수정'>
        {selectedPlan ? (
          <EditPlanForm plan={selectedPlan as EditPlanType} onClose={() => setIsEditPlanOpen(false)} />
        ) : (
          <p>수정할 약속을 선택해주세요.</p>
        )}
      </SideSheet>
    </div>
  );
};

export default ContactPlans;
