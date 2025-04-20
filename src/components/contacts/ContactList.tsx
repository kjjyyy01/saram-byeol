import React, { useMemo, useState } from 'react';
import ContactItem from '@/components/contacts/ContactItem';
import { UserPlus } from '@phosphor-icons/react';
import AddContactForm from '@/components/contacts/addContactForm/Index';
import SideSheet from '@/components/contacts/SideSheet';
import { useDemoStore } from '@/store/zustand/useDemoStore';

interface ContactListProps {
  onSelectedContact: (id: string) => void;
}

const ContactList = ({ onSelectedContact }: ContactListProps) => {
  const [isAddContactOpen, setIsAddContactOpen] = useState(false);
  //스토리지에서 연락처 불러오기
  const contacts = useDemoStore((state) => state.contacts);
  //스토어에서 pin유무 토글 불러오기
  const handleTogglePin = useDemoStore((state) => state.togglePinContact);

  // 핀된 연락처와 일반 연락처 분리
  const { pinnedContacts, regularContacts } = useMemo(() => {
    const pinned = contacts.filter((contact) => contact.is_pinned);
    const regular = contacts.filter((contact) => !contact.is_pinned);
    return { pinnedContacts: pinned, regularContacts: regular };
  }, [contacts]);

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
      <div className='mt-12 flex-1 flex flex-row h-screen items-center justify-center'>
        <div className='flex h-full flex-col items-center justify-center'>
          {contacts.length === 0 && (
              <div className='text-lg text-grey-600'>데모모드에서는 최대 3명까지 등록할 수 있습니다.</div>
          )}
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

          {/* 일반 연락처 영역 */}
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
          </div>
        </div>
      </div>

      {/* 사이드 시트 */}
      <SideSheet isOpen={isAddContactOpen} onClose={() => setIsAddContactOpen(false)}>
        <AddContactForm />
      </SideSheet>
    </div>
  );
};

export default ContactList;
