import { mutateInsertContacts } from '@/app/api/supabase/service';
import { TEST_USER_ID } from '@/components/contacts/ContactList';
import { contactFormSchema, ContactFormValues, defaultContactFormValues } from '@/lib/schemas/contactFormSchema';
import { ContactDetailType } from '@/types/contacts';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export const useContactForm = () => {
  const [imageSource, setImageSource] = useState<string | null>(null);
  const [relationshipType, setRelationshipType] = useState('친구');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();

  // 폼 초기화
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: defaultContactFormValues,
    mode: 'all', // 모든 이벤트(onChange, onBlur, onSubmit)에서 유효성 검사를 실행
  });

  // 폼 제출 함수
    const onSubmit = async (data: ContactFormValues) => {
      try {
        setIsSubmitting(true);
        
        // 연락처 데이터 준비
        const contactData: Omit<ContactDetailType, 'contacts_id'> = {
          user_id: TEST_USER_ID,
          name: data.name,
          relationship_level: data.relationshipType || '친구',
          notes: data.bio || '',
          phone: data.phone || '',
          email: data.email || '',
          birth: data.birthday || '',
          contacts_profile_img: data.profileImage || ''
        };
  
        // 연락처 저장
        await mutateInsertContacts(contactData);
  
        // 연락처 목록 쿼리 무효화
        queryClient.invalidateQueries({ queryKey: ['contacts', TEST_USER_ID] });
        
        // 성공 토스트 메시지
        toast.success(`${data.name} 연락처가 성공적으로 추가되었습니다.`);
        
        // 폼 리셋
        form.reset();
        setImageSource(null);
           
      } catch (error) {
        console.error('연락처 추가 중 오류 발생:', error);
        
        // 오류 토스트 메시지
        toast.error("연락처를 추가하는 중 오류가 발생했습니다.");
      } finally {
        setIsSubmitting(false);
      }
    };

  return {
    form,
    onSubmit,
    imageSource,
    setImageSource,
    relationshipType,
    setRelationshipType,
    isSubmitting,
  };
};