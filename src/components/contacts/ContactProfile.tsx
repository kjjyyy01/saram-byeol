import { ContactDetailType } from '@/types/contacts';
import Image from 'next/image';
import { Plus } from 'lucide-react';
interface Props {
  contact: ContactDetailType;
}

const ContactProfile: React.FC<Props> = ({ contact }) => {
  return (
    <div className='mb-8'>
      <div className='relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full bg-gray-200'>
        {contact.contacts_profile_img ? (
          <Image
            src={contact.contacts_profile_img}
            alt={contact.name}
            width={48}
            height={48}
            className='h-full w-full object-cover'
          />
        ) : (
          <Plus className='absolute top-1/2 left-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2' />
        )}
      </div>

      <span className='rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-800'>{contact.relationship_level}</span>
      <h1 className='text-2xl font-bold'>{contact.name}</h1>
      <p className='mb-4 font-bold'>{contact.email}</p>

      <ul className='space-y-1'>
        <h2 className='text-2xl font-bold'>연락처</h2>
        <li>
          <strong>휴대폰</strong> {contact.phone}
        </li>
        <li>
            <strong>이메일 주소</strong> {contact.email}
        </li>
        <li>
          <strong>생년월일</strong> {contact.birth}
        </li>
        <li>
          <strong>메모</strong> {contact.notes}
        </li>
      </ul>
    </div>
  );
};

export default ContactProfile;
