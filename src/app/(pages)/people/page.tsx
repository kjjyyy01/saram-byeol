'use client'
import { fetchContacts } from '@/app/api/supabase/service';
import { ContactList } from '@/types/contacts';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

const TEST_USER_ID = 'a27fc897-4216-4863-9e7b-f8868a8369ff';

const People = () => {
  const [contacts, setContacts] = useState<ContactList[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // 연락처 목록 가져오기
  useEffect(() => {
    const loadContacts = async () => {
      try {
        const data = await fetchContacts(TEST_USER_ID);
        setContacts(data);
      } catch (error) {
        console.error('연락처 로딩 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadContacts();
  }, []);
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">내 연락처</h1>
      
      {isLoading ? (
        <div className="text-center py-8">로딩 중...</div>
      ) : (
        <ul className="grid grid-cols-1 gap-4">
          {contacts.map((contact) => (
            <li key={contact.contacts_id} className="border rounded-lg p-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                  {contact.contact_profile_img ? (
                    <Image 
                      src={contact.contact_profile_img} 
                      alt={contact.name} 
                      width={48} 
                      height={48} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500 text-lg font-bold">
                      {contact.name.charAt(0)}
                    </div>
                  )}
                </div>
                
                <div>
                  <h3 className="font-semibold">{contact.name}</h3>
                  <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-800">
                    {contact.relationship_level}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default People