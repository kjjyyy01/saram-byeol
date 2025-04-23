import { ContactItemType } from '@/types/contacts';
import { MapPinSimple } from '@phosphor-icons/react';
import Image from 'next/image';
import React, { useState } from 'react';

interface ContactItemProps {
  contact: ContactItemType;
  onTogglePin: (contactId: string, isPinned: boolean) => void;
}

const ContactItem = ({ contact, onTogglePin }: ContactItemProps) => {
  const [isPinHovering, setIsPinHovering] = useState(false);
  const handlePinClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onTogglePin(contact.contacts_id, !contact.is_pinned);
  };

  return (
    <div className='flex h-24 w-[410px] cursor-pointer items-center justify-between border-b border-gray-200 hover:bg-gray-50'>
      {/* 내부 상자 - 프로필 및 이름 영역 */}
      <div className='ml-5 flex h-[50px] w-[330px] items-center'>
        {/* 프로필 이미지 */}
        <div className='h-10 w-10 flex-shrink-0 overflow-hidden rounded-full bg-gray-200'>
          {contact.contacts_profile_img ? (
            <Image
              src={contact.contacts_profile_img}
              alt={contact.name}
              width={40}
              height={40}
              className='h-full w-full object-cover'
            />
          ) : (
            <div className='flex h-full w-full items-center justify-center text-lg font-bold text-gray-500'>
              {contact.name.charAt(0)}
            </div>
          )}
        </div>

        {/* 연락처 정보 */}
        <div className='ml-5 flex flex-col items-start'>
          {/* 뱃지 */}
          <div className='mb-1 flex h-8 w-[75px] items-center justify-center rounded-2xl bg-yellow-300'>
            <span className='text-xs font-medium text-gray-800'>{contact.relationship_level}</span>
          </div>

          {/* 이름 */}
          <h3 className='text-center text-lg font-bold leading-tight'>{contact.name}</h3>
        </div>
      </div>

      {/* Pin 버튼 */}
      <button
        onClick={handlePinClick}
        onMouseEnter={() => setIsPinHovering(true)}
        onMouseLeave={() => setIsPinHovering(false)}
        className={`mr-5 transition-opacity duration-200 ${contact.is_pinned ? 'text-gray-800' : isPinHovering ? 'opacity-70' : 'opacity-20'}`}
        aria-label={contact.is_pinned ? '즐겨찾기 해제' : '즐겨찾기 추가'}
      >
        <MapPinSimple size={24} weight={contact.is_pinned ? 'fill' : 'regular'} />
      </button>
    </div>
  );
};

export default ContactItem;
