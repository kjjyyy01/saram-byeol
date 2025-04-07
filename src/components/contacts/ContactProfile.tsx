import { ContactDetailType } from '@/types/contacts';

interface Props {
  contact: ContactDetailType;
}

const ContactProfile: React.FC<Props> = ({ contact }) => {
  return (
    <div className='mb-8'>
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
