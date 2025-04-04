import { fetchContacts } from '@/app/api/supabase/service';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import React from 'react'

const TEST_USER_ID = 'a27fc897-4216-4863-9e7b-f8868a8369ff';

const ContactList = () => {

  const { data: contacts = [], isLoading, error} = useQuery({
    queryKey: ['contacts', TEST_USER_ID],
    queryFn: () => fetchContacts(TEST_USER_ID),
  });

  if (error) {
    console.error('연락처 로딩 실패', error);
  }

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

export default ContactList