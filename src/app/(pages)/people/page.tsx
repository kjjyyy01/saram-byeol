'use client';

import ContactList from '@/components/contacts/ContactList';

const People = () => {
  return (
    <div className='flex h-screen'>
      {/* 왼쪽 연락처 리스트 영역 */}
      <div className='min-h-[996px] w-[410px] overflow-hidden rounded-[20px] border border-gray-200'>
        <ContactList />
      </div>

      {/* 오른쪽 연락처 상세 정보 영역 (나중에 추가될 예정) */}
      <div className='flex-1'>{/* 여기에 ContactDetail 컴포넌트가 나중에 들어갈 예정 */}</div>
    </div>
  );
};

export default People;
