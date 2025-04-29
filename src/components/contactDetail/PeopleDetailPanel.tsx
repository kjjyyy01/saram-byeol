import { useQuery } from '@tanstack/react-query';
import { getContactsWithPlans } from '@/app/api/supabase/service';
import ContactProfile from '@/components/contactDetail/ContactProfile';
import ContactPlans from '@/components/contactDetail/ContactPlans';
import Tabs from '@/components/ui/Tabs';
import { useAuthStore } from '@/store/zustand/store';
import { useDemoStore } from '@/store/zustand/useDemoStore';

interface Props {
  contactsId: string;
  onDeleteSuccess: () => void;
}

const PeopleDetailPanel = ({ contactsId, onDeleteSuccess }: Props) => {
  const user = useAuthStore((state) => state.user);
  const { isDemoUser, getContactsWithPlans: getData } = useDemoStore();
  const userId = user?.id;

  const demoData = getData(contactsId);
  const { data, isPending, error } = useQuery({
    queryKey: ['contactWithPlans', contactsId],
    queryFn: () => getContactsWithPlans(userId!, contactsId),
    enabled: !isDemoUser && !!userId && !!contactsId, //데모모드이면 통신하지 않도록 처리
  });

  if (!userId) {
    return <div className='flex h-full items-center justify-center p-8 text-xl text-gray-500'>사용자 정보가 없습니다.</div>;
  }

  const { contact, plans } = data || demoData;

  if (isPending && !isDemoUser)
    return <div className='flex h-full items-center justify-center p-8 text-xl text-gray-500'>로딩 중...</div>;
  if (error)
    return (
      <div className='flex h-full items-center justify-center p-8 text-xl text-gray-500'>
        내 사람 데이터를 불러오던 중 오류가 발생했습니다
      </div>
    );

  return (
    <div className='container mx-auto px-4 pt-8'>
      <Tabs tabs={['내사람정보', '약속']}>
        {[<ContactProfile key='profile' userId={userId} contact={contact} plans={plans} onDeleteSuccess={onDeleteSuccess} />, <ContactPlans key='plans' plans={plans} contactId={contact.contacts_id} />]}
      </Tabs>
    </div>
  );
};

export default PeopleDetailPanel;
