import { ContactItemType } from '@/types/contacts';
import Image from 'next/image';
import React from 'react';

interface ContactItemProps {
  contact: ContactItemType;
}

const ContactItem: React.FC<ContactItemProps> = ({ contact }) => {
  return (
    <li className="w-[410px] h-[90px] flex items-center justify-center border-b border-gray-200 hover:bg-gray-50 cursor-pointer">
      {/* 내부 상자 - 위아래 좌우 20px 줄어든 크기 */}
      <div className="w-[370px] h-[50px] flex items-center">
        {/* 프로필 이미지 */}
        <div className="h-[40px] w-[40px] flex-shrink-0 overflow-hidden rounded-full bg-gray-200">
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

        {/* 연락처 정보 - 좌우 정렬 맞춤 */}
        <div className="ml-[20px] flex flex-col">
          <h3 className="text-[18px] font-bold leading-tight text-center">{contact.name}</h3>
          <div className="w-[53px] h-[24px] rounded-[20px] bg-gray-100 flex items-center justify-center mt-[2px]">
            <span className="text-[12px] font-bold text-gray-800">{contact.relationship_level}</span>
          </div>
        </div>
      </div>
    </li>
  );
};

export default ContactItem;