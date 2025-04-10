import { getContacts, mutateUpdateContactPin } from '@/app/api/supabase/service';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useMemo, useState } from 'react';
import ContactItem from '@/components/contacts/ContactItem';
import { ContactItemType } from '@/types/contacts';
import { UserPlus } from '@phosphor-icons/react';
import AddContactForm from '@/components/contacts/addContactForm/Index';
import SideSheet from '@/components/contacts/SideSheet';

export const TEST_USER_ID = 'a27fc897-4216-4863-9e7b-f8868a8369ff';

interface ContactListProps {
  onSelectedContact: (id: string) => void;
}

const ContactList: React.FC<ContactListProps> = ({ onSelectedContact }) => {
  const [isAddContactOpen, setIsAddContactOpen] = useState(false);
  const queryClient = useQueryClient();

  const {
    data: contacts = [],
    isPending,
    error,
  } = useQuery<ContactItemType[]>({
    queryKey: ['contacts', TEST_USER_ID],
    queryFn: () => getContacts(TEST_USER_ID),
  });

    // Pin 업데이트 뮤테이션
    const pinMutation = useMutation({
      mutationFn: ({ contactId, isPinned }: { contactId: string; isPinned: boolean }) => 
        mutateUpdateContactPin(contactId, isPinned),
      onSuccess: () => {
        // 성공 시 연락처 목록 갱신
        queryClient.invalidateQueries({ queryKey: ['contacts', TEST_USER_ID] });
      }
    });
  
    // 핀된 연락처와 일반 연락처 분리
    const { pinnedContacts, regularContacts } = useMemo(() => {
      const pinned = contacts.filter(contact => contact.is_pinned);
      const regular = contacts.filter(contact => !contact.is_pinned);
      return { pinnedContacts: pinned, regularContacts: regular };
    }, [contacts]);
  
    // 핀 토글 핸들러
    const handleTogglePin = (contactId: string, isPinned: boolean) => {
      pinMutation.mutate({ contactId, isPinned });
    };

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
          <div>
            {/* 핀 고정 영역 */}
            {pinnedContacts.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center px-6 py-3 bg-gray-50">
                  <h2 className="text-sm font-semibold text-gray-700">고정됨</h2>
                </div>
                <ul className="flex flex-col">
                  {pinnedContacts.map((contact) => (
                    <li key={`pinned-${contact.contacts_id}`}>
                      <Link href={`/people/${contact.contacts_id}`}>
                        <ContactItem 
                          contact={contact} 
                          onTogglePin={handleTogglePin} 
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* 일반 연락처 영역 */}
            <div>
              {pinnedContacts.length > 0 && (
                <div className="flex items-center px-6 py-3 bg-gray-50">
                  <h2 className="text-sm font-semibold text-gray-700">연락처</h2>
                </div>
              )}
              <ul className="flex flex-col">
                {regularContacts.map((contact) => (
                  <li key={contact.contacts_id}>
                    <button onClick={() => onSelectedContact(contact.contacts_id)} className='w-full'>
                      <ContactItem 
                        contact={contact} 
                        onTogglePin={handleTogglePin} 
                      />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
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
