import React, { useCallback, useEffect, useRef, useState } from 'react';
import ContactItem from '@/components/contacts/ContactItem';
import { UserPlus } from '@phosphor-icons/react';
import AddContactForm from '@/components/contacts/addContactForm/AddContactForm';
import SideSheet from '@/components/contacts/SideSheet';
import { useAuthStore } from '@/store/zustand/store';
import { useTogglePinContact } from '@/hooks/mutations/useMutateTogglePinContact';
import { usePinnedContacts, useRegularContactsInfinite } from '@/hooks/queries/useGetContactsForInfinite';

interface ContactListProps {
  onSelectedContact: (id: string) => void;
}

const ContactList = ({ onSelectedContact }: ContactListProps) => {
  const [isAddContactOpen, setIsAddContactOpen] = useState(false);
  const handleClose = () => setIsAddContactOpen(false);

  // 무한 스크롤을 위한 observer 설정
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // useAuthStore에서 사용자 정보 가져오기
  const userId = useAuthStore(state => state.user?.id);
  
  // 로그인 되지 않은 경우를 위한 처리
  const isAuthenticated = !!userId;

  // 고정된 연락처(pinned) 조회
  const { 
    data: pinnedContacts = [], 
    isLoading: isPinnedLoading, 
    error: pinnedError 
  } = usePinnedContacts(userId as string);

  // 일반 연락처(regular) 무한 스크롤 조회
  const {
    data: regularContactsData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isRegularLoading,
    error: regularError
  } = useRegularContactsInfinite(userId as string);

  // 모든 일반 연락처 페이지 데이터 병합
  const regularContacts = regularContactsData?.pages.flatMap(page => page.contacts) || [];

  // Pin 업데이트 뮤테이션
  const pinMutation = useTogglePinContact(userId);

  // 핀 토글 핸들러
  const handleTogglePin = (contactId: string, isPinned: boolean) => {
    pinMutation.mutate({ contactId, isPinned });
  };

  // 무한 스크롤 설정
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  );

  // 옵저버 설정 및 해제
  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      rootMargin: '0px 0px 200px 0px',
      threshold: 0.1,
    });
    
    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }
    
    observerRef.current = observer;
    
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [handleObserver]);

  // 에러 처리
  if (pinnedError || regularError) {
    console.error('연락처 로딩 실패', { pinnedError, regularError });
  }

  // 비로그인 상태 처리
  if (!isAuthenticated) {
    return (
      <div className='flex h-full flex-col items-center justify-center'>
        <p className='text-lg text-gray-600'>로그인이 필요한 서비스입니다.</p>
      </div>
    );
  }

  const isLoading = isPinnedLoading || isRegularLoading;


  return (
    <div className='flex h-full flex-col overflow-x-hidden'>
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
      <div className='mt-12 flex-1 overflow-y-auto'>
        {isLoading ? (
          <div className='py-8 text-center'>연락처를 불러오는 중...</div>
        ) : (
          <div>
            {/* 핀 고정 영역 */}
            {pinnedContacts.length > 0 && (
              <div className='mb-6'>
                <div className='flex items-center bg-gray-50 px-6 py-3'>
                  <h2 className='text-sm font-semibold text-gray-700'>고정됨</h2>
                </div>
                <ul className='flex flex-col'>
                  {pinnedContacts.map((contact) => (
                    <li key={`pinned-${contact.contacts_id}`}>
                      <div onClick={() => onSelectedContact(contact.contacts_id)}>
                        <ContactItem contact={contact} onTogglePin={handleTogglePin} />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 일반 연락처 영역 - 무한 스크롤 적용 */}
            <div>
              {pinnedContacts.length > 0 && (
                <div className='flex items-center bg-gray-50 px-6 py-3'>
                  <h2 className='text-sm font-semibold text-gray-700'>리스트</h2>
                </div>
              )}
              <ul className='flex flex-col'>
                {regularContacts.map((contact) => (
                  <li key={contact.contacts_id}>
                    <div onClick={() => onSelectedContact(contact.contacts_id)} className='w-full'>
                      <ContactItem contact={contact} onTogglePin={handleTogglePin} />
                    </div>
                  </li>
                ))}
              </ul>
              
              {/* 무한 스크롤 감지 영역 */}
              <div 
                ref={loadMoreRef} 
                className='py-4 flex justify-center'
              >
                {isFetchingNextPage && (
                  <div className='text-sm text-gray-500'>연락처를 더 불러오는 중...</div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 사이드 시트 */}
      <SideSheet isOpen={isAddContactOpen} onClose={handleClose}>
        <AddContactForm onClose={handleClose} />
      </SideSheet>
    </div>
  );
};

export default ContactList;
