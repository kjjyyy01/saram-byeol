'use client';

import ContactList from '@/components/contacts/ContactList';
import PeopleDetailPanel from '@/components/contactDetail/PeopleDetailPanel';
import { useState } from 'react';

const People = () => {
  const [peopleSelectedId, setPeopleSelectedId] = useState<string | null>(null);

  return (
    <div className='flex h-screen'>
      {/* 왼쪽 연락처 리스트 영역 */}
      <div className='h-full w-[410px] overflow-y-auto rounded-[20px] border border-gray-200'>
        <ContactList onSelectedContact={setPeopleSelectedId} />
      </div>

      {/* 오른쪽 상세 정보 영역 */}
      <div className='flex-1 overflow-y-auto'>
        {peopleSelectedId ? (
          <PeopleDetailPanel contactsId={peopleSelectedId} />
        ) : (
          <div className='p-8 text-center text-gray-500'>사람을 선택해주세요.</div>
        )}
      </div>
    </div>
  );
};

export default People;
