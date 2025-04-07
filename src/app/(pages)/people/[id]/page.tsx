'use client';

import { getContactsWithPlans } from '@/app/api/supabase/service';
import ContactPlans from '@/components/contacts/ContactPlans';
import ContactProfile from '@/components/contacts/ContactProfile';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

const TEST_USER_ID = 'a27fc897-4216-4863-9e7b-f8868a8369ff';

const PeopleDetail = () => {
  const params = useParams(); //contacts_id
  const contactsId = typeof params.id === 'string' ? params.id : undefined;

  const { data, isPending, error } = useQuery({
    queryKey: ['contactWithPlans', contactsId],
    queryFn: () => {
      if (!contactsId) throw new Error('Invalid contact ID');
      return getContactsWithPlans(TEST_USER_ID, contactsId);
    },
    enabled: !!contactsId,
  });

  if (isPending) return <div className='p-8 text-center'>로딩 중...</div>;
  if (error) return <div className='p-8 text-center'>데이터를 불러오던 중 오류가 발생했습니다</div>;

  const { contact, plans } = data;

  return (
    <div className='container mx-auto p-6'>
      <ContactProfile contact={contact} />
      <ContactPlans plans={plans} />
    </div>
  );
};

export default PeopleDetail;
