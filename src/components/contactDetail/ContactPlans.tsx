import { PlanDetailType } from '@/types/contacts';
import ContactPlansCard from './ContactPlansCard';

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
        <ul className='grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3'>
          {plans.map((plan) => (
            <li key={plan.plan_id}>
              <ContactPlansCard
                title={plan.title}
                startDate={plan.start_date}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ContactPlans;
