'use client';

import ContactList from '@/components/contacts/ContactList';
import PeopleDetailPanel from '@/components/contacts/PeopleDetailPanel';
import { useState } from 'react';

const People = () => {
  const [peopleSelectedId, setPeopleSelectedId] = useState<string | null>(null);

  return (
    <div className='flex h-screen'>
      {/* 왼쪽 연락처 리스트 영역 */}
      <div className='h-full w-[410px] overflow-y-auto rounded-[20px] border border-gray-200'>
        <ContactList />
      </div>

      {/* 오른쪽 연락처 상세 정보 영역 (나중에 추가될 예정) */}
      <div className='flex-1 overflow-y-auto'>
        {/* 여기에 ContactDetail 컴포넌트가 나중에 들어갈 예정 */}
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
