import { fetchContacts } from '@/app/api/supabase/service';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import ContactItem from './ContactItem';
import { ContactItemType } from '@/types/contacts';

const TEST_USER_ID = 'a27fc897-4216-4863-9e7b-f8868a8369ff';

const ContactList = () => {
  const {
    data: contacts = [],
    isPending,
    error,
  } = useQuery<ContactItemType[]>({
    queryKey: ['contacts', TEST_USER_ID],
    queryFn: () => fetchContacts(TEST_USER_ID),
  });

  if (error) {
    console.error('연락처 로딩 실패', error);
  }

  return (
    <div className='container mx-auto p-4'>
      <h1 className='mb-6 text-2xl font-bold'>내 연락처</h1>

      {isPending ? (
        <div className='py-8 text-center'>로딩 중...</div>
      ) : (
        <ul className='grid grid-cols-1 gap-4'>
          {contacts.map((contact) => (
            <ContactItem key={contact.contacts_id} contact={contact} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default ContactList;
