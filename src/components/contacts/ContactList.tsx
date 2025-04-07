import { getContacts } from '@/app/api/supabase/service';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import ContactItem from './ContactItem';
import { ContactItemType } from '@/types/contacts';
import { UserPlus, X } from '@phosphor-icons/react';

const TEST_USER_ID = 'a27fc897-4216-4863-9e7b-f8868a8369ff';

const SideSheet = ({ isOpen, onClose, children }) => {
  return (
    <div>
      {/* 사이드 시트 */}
      <div
        className={`fixed right-0 top-0 z-50 h-screen w-full transform bg-white shadow-lg transition-transform duration-300 ease-in-out border-l border-gray-200 md:w-[474px] ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ maxHeight: '1080px' }}
      >
        <div className='flex h-full flex-col p-4'>
          <div className='flex items-center justify-between border-b pb-4'>
            <h2 className='text-xl font-medium'>내 사람 추가</h2>
            <button onClick={onClose} className='rounded-full p-1 hover:bg-gray-100'>
              <X size={24} />
            </button>
          </div>

          <div className='flex-1 py-4'>{children}</div>
        </div>
      </div>
    </div>
  );
};

const ContactList = () => {
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
      <h1 className='pl-[24px] pt-[24px] text-2xl font-bold'>내 사람 목록</h1>

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

      {/* 연락처 리스트 - 스크롤 제거 */}
      <div className='mt-[50px] flex-1'>
        {isPending ? (
          <div className='py-8 text-center'>로딩 중...</div>
        ) : (
          <ul className='flex flex-col'>
            {contacts.map((contact) => (
              <ContactItem key={contact.contacts_id} contact={contact} />
            ))}
          </ul>
        )}
      </div>

      {/* 사이드 시트 */}
      <SideSheet isOpen={isAddContactOpen} onClose={() => setIsAddContactOpen(false)} />
    </div>
  );
};

export default ContactList;