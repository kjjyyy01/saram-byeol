import { getContacts } from '@/app/api/supabase/service';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import ContactItem from './ContactItem';
import { ContactItemType } from '@/types/contacts';
import { UserPlus } from '@phosphor-icons/react';
import Link from 'next/link';

const TEST_USER_ID = 'a27fc897-4216-4863-9e7b-f8868a8369ff';

const ContactList = () => {
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
        <button className='flex h-12 w-full max-w-sm items-center justify-center rounded-lg border border-gray-300 font-medium text-gray-700 transition-colors hover:bg-gray-100'>
          <UserPlus size={20} className='mr-2' />
          <span>내 사람 추가</span>
        </button>
      </div>

      {/* 연락처 리스트 */}
      <div className='mt-[50px] flex-1 overflow-y-auto'>
        {isPending ? (
          <div className='py-8 text-center'>로딩 중...</div>
        ) : (
          <ul className='grid grid-cols-1 gap-4'>
            {contacts.map((contact) => (
              <li key={contact.contacts_id}>
                <Link href={`/people/${contact.contacts_id}`}>
                  <ContactItem contact={contact} />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ContactList;
