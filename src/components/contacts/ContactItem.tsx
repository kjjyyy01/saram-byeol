
import { ContactItemType } from '@/types/contacts';
import Image from 'next/image';
import React from 'react';

interface ContactItemProps {
  contact: ContactItemType;
}

const ContactItem: React.FC<ContactItemProps> = ({ contact }) => {
  return (
    <li className='rounded-lg border p-4'>
      <div className='flex items-center gap-4'>
        <div className='h-12 w-12 flex-shrink-0 overflow-hidden rounded-full bg-gray-200'>
          {contact.contacts_profile_img ? (
            <Image
              src={contact.contacts_profile_img}
              alt={contact.name}
              width={48}
              height={48}
              className='h-full w-full object-cover'
            />
          ) : (
            <div className='flex h-full w-full items-center justify-center text-lg font-bold text-gray-500'>
              {contact.name.charAt(0)}
            </div>
          )}
        </div>

        <div>
          <h3 className='font-semibold'>{contact.name}</h3>
          <span className='rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-800'>{contact.relationship_level}</span>
        </div>
      </div>
    </li>
  );
};

export default ContactItem;
