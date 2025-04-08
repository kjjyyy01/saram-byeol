import { getContacts } from '@/app/api/supabase/service';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import ContactItem from './ContactItem';
import { ContactItemType } from '@/types/contacts';
import { UserPlus } from '@phosphor-icons/react';
import AddContactForm from './AddContactForm';
import SideSheet from './SideSheet';

export const TEST_USER_ID = 'a27fc897-4216-4863-9e7b-f8868a8369ff';

const ContactList: React.FC = () => {
  const [isAddContactOpen, setIsAddContactOpen] = useState(false);

  const {
    data: contacts = [],
    isPending,
    error,
  } = useQuery<ContactItemType[]>({
    queryKey: ['contacts', TEST_USER_ID],
    queryFn: () => getContacts(TEST_USER_ID),
  });

  if (error) {
    console.error('연락처 로딩 실패', error);
  }

  return (
    <div className='flex h-full flex-col'>
      {/* 헤더 - 내 사람 목록 텍스트 */}
      <h1 className='pl-6 pt-6 text-2xl font-bold'>내 사람 목록</h1>

      {/* 내 사람 추가 버튼 */}
      <div className='mt-12 flex justify-center'>
        <button
          className='flex h-12 w-full max-w-sm items-center justify-center rounded-lg border border-gray-300 font-medium text-gray-700 transition-colors hover:bg-gray-100'
          onClick={() => {
            setIsAddContactOpen(true);
          }}
        >
          <UserPlus size={20} className='mr-2' />
          <span>내 사람 추가</span>
        </button>
      </div>

      {/* 연락처 리스트 */}
      <div className='mt-12 flex-1'>
        {isPending ? (
          <div className='py-8 text-center'>연락처를 불러오는 중...</div>
        ) : (
          <ul className='flex flex-col'>
            {contacts.map((contact) => (
              <ContactItem key={contact.contacts_id} contact={contact} />
            ))}
          </ul>
        )}
      </div>

      {/* 사이드 시트 */}
      <SideSheet isOpen={isAddContactOpen} onClose={() => setIsAddContactOpen(false)}>
        <AddContactForm />
      </SideSheet>
    </div>
  );
};

export default ContactList;