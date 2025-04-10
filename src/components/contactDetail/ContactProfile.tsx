import { ContactDetailType } from '@/types/contacts';
import Image from 'next/image';
import { Plus } from 'lucide-react';

interface Props {
  contact: ContactDetailType;
}

const ContactProfile: React.FC<Props> = ({ contact }) => {
  return (
    <div className='space-y-8'>
      {/* 상단 프로필 + 기본 정보 */}
      <div className='flex items-start justify-between'>
        {/* 좌측 - 프로필 이미지 */}
        <div className='relative flex items-center space-x-[-10px]'>
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
              <div className='flex h-full w-full items-center justify-center text-lg font-bold text-white'>
                <Plus className='absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2' />
              </div>
            )}
          </div>
        </div>

        {/* 중앙 - 이름 및 이메일 */}
        <div className='flex flex-1 flex-col'>
          <h1 className='text-xl font-bold'>{contact.name}</h1>
          <div className="w-[53px] h-[24px] rounded-[20px] bg-gray-100 flex items-center justify-center mt-[2px]">
            <span className="text-[12px] font-bold text-gray-800">{contact.relationship_level}</span>
          </div>
          <p className='text-sm text-gray-600'>{contact.email}</p>
        </div>

        {/* 우측 버튼 */}
        <div className='space-x-2'>
          <button className='rounded-full border border-gray-300 px-4 py-1 text-sm'>약속추가</button>
          <button className='rounded-full border border-gray-300 px-4 py-1 text-sm'>정보수정</button>
        </div>
      </div>

      {/* 임시 D-day 카드 2개 */}
      <div className='flex space-x-4'>
        <div className='w-40 rounded-lg border p-4 text-center'>
          <p className='text-lg font-bold'>D-14</p>
          <p className='mt-1 text-sm'>트닛노트 출시파티</p>
          <p className='text-xs text-gray-500'>@강남 트닛파티룸</p>
        </div>
        <div className='w-40 rounded-lg border p-4 text-center'>
          <p className='text-lg font-bold'>D-50</p>
          <p className='mt-1 text-sm'>김로탄 결혼식</p>
          <p className='text-xs text-gray-500'>@역삼 트닛예식장</p>
        </div>
      </div>

      {/* 연락처 정보 */}
      <div className='space-y-1'>
        <h2 className='text-lg font-bold'>연락처</h2>
        <p>
          <strong>휴대폰</strong> {contact.phone}
        </p>
        <p>
          <strong>이메일 주소</strong> {contact.email}
        </p>
        <p>
          <strong>생년월일</strong> {contact.birth}
        </p>
        <p>
          <strong>메모</strong> {contact.notes}
        </p>
      </div>
    </div>
  );
};

export default ContactProfile;
