import { ContactDetailType, PlanDetailType } from '@/types/contacts';
import Image from 'next/image';
import { useState } from 'react';
import SideSheet from '@/components/contacts/SideSheet';
import EditContactForm from '@/components/contactDetail/editContactForm/EditContactForm';
import { Button } from '@/components/ui/button';
import { useMutateDeleteContacts } from '@/hooks/mutations/useMutateDeleteContacts';
import { toast } from 'react-toastify';
import ContactPlansCard from '@/components/contactDetail/ContactPlansCard';
import { ConfirmToast } from '@/components/toast/ConfirmToast';
import { PencilSimple, Trash } from '@phosphor-icons/react';
import { useDemoStore } from '@/store/zustand/useDemoStore';
import { PlansType } from '@/types/plans';
import { mutateDeletePlan } from '@/app/api/supabase/service';
import { sortPlansByDate } from '@/lib/utils/sortPlansByDate';
import { differenceInCalendarDays } from 'date-fns';

interface Props {
  userId: string;
  contact: ContactDetailType;
  plans: PlanDetailType[] | PlansType[];
  onDeleteSuccess: () => void;
}

const ContactProfile = ({ userId, contact, plans, onDeleteSuccess }: Props) => {
  const [isEditContactOpen, setIsEditContactOpen] = useState(false); // 사이드시트 상태

  const { isDemoUser } = useDemoStore();
  const { mutate: deleteContact } = useMutateDeleteContacts(userId as string);

  const deleteContactHandler = () => {
    if (isDemoUser) {
      toast.info('데모체험중에는 제한된 기능입니다.');
      return;
    }
    ConfirmToast({
      message: '정말로 해당 사람을 삭제하시겠습니까?',
      onConfirm: async () => {
        try {
          await Promise.all(plans.map((plan) => mutateDeletePlan(plan.plan_id)));

          deleteContact(
            {
              userId: userId as string,
              contactsId: contact.contacts_id,
            },
            {
              onSuccess: () => {
                toast.success('성공적으로 삭제되었습니다.');
                onDeleteSuccess();
              },
              onError: (error) => {
                console.error(error);
                toast.error('삭제에 실패했습니다.');
              },
            }
          );
        } catch (error) {
          console.error('내 사람 또는 약속 삭제 중 오류가 발생했습니다:', error);
          toast.error('내 사람 삭제 중 오류가 발생했습니다.');
        }
      },
    });
  };

  const filteredPlans = plans.filter((plan) => {
    const today = new Date();
    const start = new Date(plan.start_date);
    const dDay = differenceInCalendarDays(start, today);
    return dDay >= 0; // D+인 약속 제외, D-Day, D-인 약속만 표시
  });

  return (
    <div className='space-y-8'>
      {/* 상단 프로필 + 기본 정보 */}
      <div className='mt-6 flex items-start justify-between'>
        {/* 좌측 - 프로필 이미지 */}
        <div className='relative flex items-center space-x-[-10px]'>
          <div className='relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-full bg-gray-200'>
            {contact.contacts_profile_img ? (
              <Image
                src={contact.contacts_profile_img}
                alt={contact.name}
                width={124}
                height={124}
                className='h-full w-full object-cover'
              />
            ) : (
              <div className='flex h-full w-full items-center justify-center text-xl font-bold text-gray-500'>
                {contact.name.charAt(0)}
              </div>
            )}
          </div>
        </div>

        {/* 중앙 - 이름 및 이메일 */}
        <div className='ml-5 flex flex-1 flex-col p-4'>
          <div className='mt-0.5 mb-1 flex h-6 w-16 items-center justify-center rounded-2xl bg-yellow-300'>
            <span className='text-xs font-bold text-gray-800'>{contact.relationship_level}</span>
          </div>
          <h1 className='mb-0.5 text-xl font-bold leading-tight'>{contact.name}</h1>
          <p className='mt-0.5 text-sm text-gray-600'>{contact.email}</p>
        </div>

        {/* 우측 버튼 */}
        <div className='flex items-center gap-3 pt-[3.8rem]'>
          {/* 수정 버튼 */}
          <Button
            variant='ghost'
            size='sm'
            className='h-9 rounded-md border border-blue-500 px-4 text-sm font-semibold text-blue-600 transition hover:bg-blue-50 hover:shadow-sm'
            onClick={() => setIsEditContactOpen(true)}
          >
            <PencilSimple size={16} className='mr-2' />내 사람 수정
          </Button>

          {/* 삭제 버튼 */}
          <Button
            variant='ghost'
            size='sm'
            className='h-9 rounded-md border border-gray-300 px-4 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 hover:shadow-sm'
            onClick={deleteContactHandler}
          >
            <Trash size={16} className='mr-2' />내 사람 삭제
          </Button>
        </div>
      </div>

      <div className='border-t border-gray-200' />

      {/* 연락처 + 다가오는 약속 */}
      <div className='flex flex-col gap-8 md:flex-row'>
        {/* 연락처 정보 */}
        <div className='w-full md:w-1/2'>
          <h2 className='mb-4 text-xl font-bold text-gray-800'>연락처</h2>
          <div className='space-y-12 text-sm text-gray-700'>
            <p>
              <span className='inline-block w-20 text-base font-medium text-gray-500'>전화번호</span>
              {contact.phone}
            </p>
            <p>
              <span className='inline-block w-20 text-base font-medium text-gray-500'>이메일</span>
              {contact.email}
            </p>
            <p>
              <span className='inline-block w-20 text-base font-medium text-gray-500'>생년월일</span>
              {contact.birth}
            </p>
            <p>
              <span className='inline-block w-20 text-base font-medium text-gray-500'>메모</span>
              {contact.notes}
            </p>
          </div>
        </div>

        {/* 다가오는 약속 */}
        {filteredPlans.length > 0 && (
          <div className='w-full md:w-1/2'>
            <h2 className='mb-4 text-xl font-bold text-gray-800'>다가오는 약속</h2>
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-2 lg:grid-cols-2'>
              {sortPlansByDate(filteredPlans).map((plan) => (
                <ContactPlansCard
                  key={plan.plan_id}
                  title={plan.title}
                  startDate={plan.start_date}
                  color={plan.colors}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 사이드 시트 - 연락처 수정 */}
      <SideSheet isOpen={isEditContactOpen} onClose={() => setIsEditContactOpen(false)} title='내 사람 수정'>
        <EditContactForm contactData={contact} onClose={() => setIsEditContactOpen(false)} />
      </SideSheet>
    </div>
  );
};

export default ContactProfile;
