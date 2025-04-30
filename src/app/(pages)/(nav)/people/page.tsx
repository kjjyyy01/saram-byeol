'use client';

import ContactList from '@/components/contacts/ContactList';
import PeopleDetailPanel from '@/components/contactDetail/PeopleDetailPanel';
import { useAuthStore } from '@/store/zustand/store';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { SIGNIN } from '@/constants/paths';
import { useDemoStore } from '@/store/zustand/useDemoStore';

const People = () => {
  const [peopleSelectedId, setPeopleSelectedId] = useState<string | null>(null);
  const [hasMounted, setHasMounted] = useState(false);
  const isSignIn = useAuthStore((state) => state.isSignIn);
  const isDemoUser = useDemoStore((state) => state.isDemoUser);
  const router = useRouter();
  const isAccessGranted = isSignIn || isDemoUser;

  // 마운트 이후에만 렌더링
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // 마운트 전, 로그아웃 상태 감지 막기
  useEffect(() => {
    if (hasMounted && !isAccessGranted) {
      router.replace(SIGNIN);
    }
  }, [hasMounted, router, isAccessGranted]);

  if (!hasMounted || !isAccessGranted) return null;

  return (
    <div className='flex h-screen'>
      {/* 왼쪽 연락처 리스트 영역 */}
      <div className='mx-5 mt-12 h-full w-96 overflow-y-auto rounded-2xl border border-grey-100'>
        <ContactList peopleSelectedId={peopleSelectedId} onSelectedContact={setPeopleSelectedId} />
      </div>

      {/* 오른쪽 상세 정보 영역 */}
      <div className='flex-1 overflow-y-visible'>
        {peopleSelectedId ? (
          <PeopleDetailPanel contactsId={peopleSelectedId} onDeleteSuccess={() => setPeopleSelectedId(null)} />
        ) : (
          <div className='flex h-full items-center justify-center p-8 text-xl text-grey-500'>사람을 선택해주세요.</div>
        )}
      </div>
    </div>
  );
};

export default People;
