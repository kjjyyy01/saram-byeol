import { PlanDetailType } from '@/types/contacts';
import ContactPlansCard from '@/components/contactDetail/ContactPlansCard';
import { useState } from 'react';
import SideSheet from '@/components/contacts/SideSheet';

interface Props {
  plans: PlanDetailType[];
}

const ContactPlans: React.FC<Props> = ({ plans }) => {
  const [isEditPlanOpen, setIsEditPlanOpen] = useState(false);

  return (
    <div>
      <h2 className='mb-2 text-xl font-semibold'>약속 전체보기</h2>
      <button onClick={() => setIsEditPlanOpen(true)} className='rounded px-3 py-1 text-sm'>약속 수정</button>
      {plans.length === 0 ? (
        <p>등록된 약속이 없습니다.</p>
      ) : (
        <ul className='grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3'>
          {plans.map((plan) => (
            <li key={plan.plan_id}>
              <ContactPlansCard title={plan.title} startDate={plan.start_date} />
            </li>
          ))}
        </ul>
      )}

      {/* 사이드 시트 - 약속 수정 */}
      <SideSheet isOpen={isEditPlanOpen} onClose={() => setIsEditPlanOpen(false)} title='약속 수정'>
        <p className='text-gray-600'>여기에 약속 수정 폼이 들어갈 예정입니다.</p>
      </SideSheet>
    </div>
  );
};

export default ContactPlans;
