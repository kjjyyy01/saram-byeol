import { mutateInsertContacts } from '@/app/api/supabase/service';
import { QUERY_KEY } from '@/constants/queryKey';
import { contactFormSchema, ContactFormValues, defaultContactFormValues } from '@/lib/schemas/contactFormSchema';
import { useAuthStore } from '@/store/zustand/store';
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

  const { user } = useAuthStore();
  const userId = user?.id;

  // 폼 초기화 - 실시간 유효성 검사 제거
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: defaultContactFormValues,
    mode: 'onBlur', // 입력 필드에서 포커스가 떠날 때만 유효성 검사 실행
    reValidateMode: 'onBlur', // 재검증도 포커스가 떠날 때만
  });

  // 폼 제출 함수
  const onSubmit = async (data: ContactFormValues) => {
    try {
      setIsSubmitting(true);
      
      // 연락처 데이터 준비
      const contactData: Omit<ContactDetailType, 'contacts_id'> = {
        user_id: userId as string,
        name: data.name.trim(), // 이름 앞뒤 공백 제거
        relationship_level: data.relationshipType || '친구',
        notes: data.bio.trim() || '',
        phone: data.phone || '',
        email: data.email || '',
        birth: data.birthday ? data.birthday : null, // 선택적 필드
        contacts_profile_img: data.profileImage || ''
      };

      // 연락처 저장
      await mutateInsertContacts(contactData);

      // 연락처 목록 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.CONTACTS, userId] });
      
      // 성공 토스트 메시지
      toast.success(`${data.name} 연락처가 성공적으로 추가되었습니다.`);
      
      // 폼 리셋
      form.reset();
      setImageSource(null);
         
    } catch (error) {
      console.error('연락처 추가 중 오류 발생:', error);
      
      // 오류 토스트 메시지
      toast.error("이름과 한줄소개를 모두 입력 해주세요.");
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