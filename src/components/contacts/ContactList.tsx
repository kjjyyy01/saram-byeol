import { getContacts } from '@/app/api/supabase/service';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import ContactItem from './ContactItem';
import { ContactItemType } from '@/types/contacts';
import {UserPlus} from '@phosphor-icons/react'

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
    <div className="flex flex-col h-full">
      {/* 헤더 - 내 사람 목록 텍스트 */}
      <h1 className="text-2xl font-bold pt-[24px] pl-[24px]">내 사람 목록</h1>
      
      {/* 내 사람 추가 버튼 */}
      <div className="flex justify-center mt-12">
      <button 
        className="w-full max-w-sm h-12 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center font-medium"
      >
        <UserPlus size={20} className="mr-2" />
        <span>내 사람 추가</span>
      </button>
    </div>
      
      {/* 연락처 리스트 */}
      <div className="mt-[50px] flex-1 overflow-y-auto">
        {isPending ? (
          <div className="py-8 text-center">로딩 중...</div>
        ) : (
          <ul className="flex flex-col">
            {contacts.map((contact) => (
              <ContactItem key={contact.contacts_id} contact={contact} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ContactList;