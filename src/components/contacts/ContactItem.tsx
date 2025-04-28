import { ContactItemType } from '@/types/contacts';
import { MapPinSimple, Trash } from '@phosphor-icons/react';
import Image from 'next/image';
import React, { useState } from 'react';

interface ContactItemProps {
  contact: ContactItemType;
  onTogglePin: (contactId: string, isPinned: boolean) => void;
  isSelected?: boolean;
  isEditMode?: boolean;
  onDeleteContact?: (e: React.MouseEvent) => void;
}

const ContactItem = ({
  contact,
  onTogglePin,
  isSelected = false,
  isEditMode = false,
  onDeleteContact,
}: ContactItemProps) => {
  const [isPinHovering, setIsPinHovering] = useState(false);
  const [isDeleteHovering, setIsDeleteHovering] = useState(false);

  const handlePinClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onTogglePin(contact.contacts_id, !contact.is_pinned);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onDeleteContact) {
      onDeleteContact(e);
    }
  };

  return (
    <div
      className={`flex h-24 w-full cursor-pointer items-center justify-between border-b border-grey-50 ${
        isSelected ? 'bg-grey-50' : 'hover:bg-grey-50'
      }`}
    >
      {/* 내부 상자 - 프로필 및 이름 영역 */}
      <div className='ml-5 flex h-[50px] w-[330px] items-center'>
        {/* 프로필 이미지 */}
        <div className='h-10 w-10 flex-shrink-0 overflow-hidden rounded-full bg-grey-100'>
          {contact.contacts_profile_img ? (
            <Image
              src={contact.contacts_profile_img}
              alt={contact.name}
              width={40}
              height={40}
              className='h-full w-full object-cover'
            />
          ) : (
            <div className='flex h-full w-full items-center justify-center text-lg font-bold text-grey-500'>
              {contact.name.charAt(0)}
            </div>
          )}
        </div>

        {/* 연락처 정보 */}
        <div className='ml-5 flex flex-col items-start'>
          {/* 뱃지 */}
          <div className='mb-1 flex h-8 w-[75px] items-center justify-center rounded-2xl bg-secondary-500'>
            <span className='text-xs font-medium text-gray-800'>{contact.relationship_level}</span>
          </div>

          {/* 이름 */}
          <h3 className='text-center text-lg font-bold leading-tight'>{contact.name}</h3>
        </div>
      </div>

      <div className='mr-5 flex items-center space-x-2'>
        {/* Pin 버튼 */}
        <button
          onClick={handlePinClick}
          onMouseEnter={() => setIsPinHovering(true)}
          onMouseLeave={() => setIsPinHovering(false)}
          className={`transition-opacity duration-200 ${
            contact.is_pinned ? 'text-grey-800' : isPinHovering ? 'opacity-70' : 'opacity-20'
          }`}
          aria-label={contact.is_pinned ? '즐겨찾기 해제' : '즐겨찾기 추가'}
        >
          <MapPinSimple size={24} weight={contact.is_pinned ? 'fill' : 'regular'} />
        </button>

        {/* 편집 모드일 때만 삭제 버튼 표시 */}
        {isEditMode && onDeleteContact && (
          <button
            onClick={handleDeleteClick}
            onMouseEnter={() => setIsDeleteHovering(true)}
            onMouseLeave={() => setIsDeleteHovering(false)}
            className={`text-grey-800 transition-opacity duration-200 ${
              isDeleteHovering ? 'opacity-100' : 'opacity-70'
            }`}
            aria-label='삭제'
          >
            <Trash size={24} weight='regular' />
          </button>
        )}
      </div>
    </div>
  );
};

export default ContactItem;
