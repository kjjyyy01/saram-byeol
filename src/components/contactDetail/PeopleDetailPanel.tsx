import { useQuery } from '@tanstack/react-query';
import { getContactsWithPlans } from '@/app/api/supabase/service';
import ContactProfile from '@/components/contactDetail/ContactProfile';
import ContactPlans from '@/components/contactDetail/ContactPlans';
import Tabs from '@/components/ui/Tabs';

const TEST_USER_ID = 'a27fc897-4216-4863-9e7b-f8868a8369ff';

interface Props {
  contactsId: string;
}

const PeopleDetailPanel = ({ contactsId }: Props) => {
  const { data, isPending, error } = useQuery({
    queryKey: ['contactWithPlans', contactsId],
    queryFn: () => getContactsWithPlans(TEST_USER_ID, contactsId),
    enabled: !!contactsId,
  });

  if (isPending) return <div className='p-8 text-center'>로딩 중...</div>;
  if (error) return <div className='p-8 text-center'>내 사람 데이터를 불러오던 중 오류가 발생했습니다</div>;

  const { contact, plans } = data;

  return (
    <div className='container mx-auto px-4 pt-8'>
      <Tabs tabs={['내사람정보', '약속']}>
        {[<ContactProfile key='profile' contact={contact} />, <ContactPlans key='plans' plans={plans} />]}
      </Tabs>
    </div>
  );
};

export default PeopleDetailPanel;
