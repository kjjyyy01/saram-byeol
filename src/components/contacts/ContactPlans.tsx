import { PlanDetailType } from '@/types/contacts';

interface Props {
  plans: PlanDetailType[];
}

const ContactPlans: React.FC<Props> = ({ plans }) => {
  return (
    <div>
      <h2 className='mb-2 text-xl font-semibold'>약속 목록</h2>
      {plans.length === 0 ? (
        <p>등록된 약속이 없습니다.</p>
      ) : (
        <ul className='space-y-4'>
          {plans.map((plan) => (
            <li key={plan.plan_id} className='rounded-lg border p-4'>
              <h3 className='text-lg font-semibold'>{plan.title}</h3>
              <p className='text-sm'>{plan.detail}</p>
              <p className='text-sm'>
                <strong>우선순위:</strong> {plan.priority}
              </p>
              <p className='text-sm'>
                <strong>기간:</strong> {plan.start_date} ~ {plan.end_date}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ContactPlans;
