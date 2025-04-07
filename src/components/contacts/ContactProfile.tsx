import { ContactDetailType } from '@/types/contacts';
import Image from 'next/image';

interface Props {
  contact: ContactDetailType;
}

const ContactProfile: React.FC<Props> = ({ contact }) => {
  return (
    <div className='mb-8'>
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
      
      <h1 className='mb-4 text-2xl font-bold'>{contact.name}</h1>
      <ul className='space-y-1'>
        <li>
          <strong>이메일 주소:</strong> {contact.email}
        </li>
        <li>
          <strong>휴대폰:</strong> {contact.phone}
        </li>
        <li>
          <strong>관계:</strong> {contact.relationship_level}
        </li>
        <li>
          <strong>생년월일:</strong> {contact.birth}
        </li>
        <li>
          <strong>메모:</strong> {contact.notes}
        </li>
      </ul>
    </div>
  );
};

export default ContactProfile;
