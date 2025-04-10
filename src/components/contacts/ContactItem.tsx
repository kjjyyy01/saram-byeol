import { ContactItemType } from '@/types/contacts';
import { MapPinSimple } from '@phosphor-icons/react';
import Image from 'next/image';
import React, { useState } from 'react';

interface ContactItemProps {
  contact: ContactItemType;
  onTogglePin: (contactId: string, isPinned: boolean) => void;
}

const ContactItem: React.FC<ContactItemProps> = ({ contact, onTogglePin }) => {
  const [isPinHovering, setIsPinHovering] = useState(false);

  const handlePinClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onTogglePin(contact.contacts_id, !contact.is_pinned);
  }
  
  return (
    <div className="w-[410px] h-24 flex items-center justify-between border-b border-gray-200 hover:bg-gray-50 cursor-pointer">
      {/* 내부 상자 - 프로필 및 이름 영역 */}
      <div className="w-[330px] h-[50px] flex items-center ml-5">
        {/* 프로필 이미지 */}
        <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-full bg-gray-200">
          {contact.contacts_profile_img ? (
            <Image
              src={contact.contacts_profile_img}
              alt={contact.name}
              width={40}
              height={40}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-lg font-bold text-gray-500">
              {contact.name.charAt(0)}
            </div>
          )}
        </div>

        {/* 연락처 정보 */}
        <div className="ml-5 flex flex-col">
          <h3 className="text-lg font-bold leading-tight text-center">{contact.name}</h3>
          <div className="w-16 h-6 rounded-2xl bg-yellow-300 flex items-center justify-center mt-0.5">
            <span className="text-xs font-bold text-gray-800">{contact.relationship_level}</span>
          </div>
        </div>
      </div>

      {/* Pin 버튼 */}
      <button 
        onClick={handlePinClick}
        onMouseEnter={() => setIsPinHovering(true)}
        onMouseLeave={() => setIsPinHovering(false)}
        className={`mr-5 transition-opacity duration-200 ${contact.is_pinned ? 'text-gray-800' : isPinHovering ? 'opacity-70' : 'opacity-20'}`}
        aria-label={contact.is_pinned ? "즐겨찾기 해제" : "즐겨찾기 추가"}
      >
        <MapPinSimple size={24} weight={contact.is_pinned ? "fill" : "regular"} />
      </button>
    </div>
  );
};

export default ContactItem;