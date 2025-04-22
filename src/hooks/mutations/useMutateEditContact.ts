import { mutateUpdateContacts } from '@/app/api/supabase/service';
import { contactFormSchema, ContactFormValues } from '@/lib/schemas/contactFormSchema';
import { ContactDetailType } from '@/types/contacts';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export const useMutateEditContact = (contactData: ContactDetailType, onClose: () => void) => {
  const [imageSource, setImageSource] = useState<string | null>(contactData.contacts_profile_img || null);
  const [relationshipType, setRelationshipType] = useState(contactData.relationship_level || '친구');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();

  // 폼 초기화
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: contactData.name,
      memo: contactData.notes,
      phone: contactData.phone,
      email: contactData.email,
      birthday: contactData.birth || '',
      profileImage: contactData.contacts_profile_img ?? '',
      relationshipType: contactData.relationship_level,
    },
    mode: 'all', // 모든 이벤트(onChange, onBlur, onSubmit)에서 유효성 검사를 실행
  });

  // 폼 제출 함수
  const onSubmit = async (data: ContactFormValues) => {
    try {
      setIsSubmitting(true);

      // 연락처 수정
      await mutateUpdateContacts(contactData.contacts_id, {
        user_id: contactData.user_id,
        name: data.name,
        relationship_level: data.relationshipType || '친구',
        notes: data.memo || '',
        phone: data.phone || '',
        email: data.email || '',
        birth: data.birthday || '',
        contacts_profile_img: data.profileImage || '',
      });

      // 성공 토스트 메시지
      toast.success(`${data.name} 연락처가 성공적으로 수정되었습니다.`);

      // 데이터 리프레시
      await queryClient.invalidateQueries({ queryKey: ['contacts'] });
      await queryClient.invalidateQueries({ queryKey: ['contactWithPlans', contactData.contacts_id] });

      onClose(); // 모달 닫기
    } catch (error) {
      console.error('연락처 수정 중 오류 발생:', error);

      // 오류 토스트 메시지
      toast.error('연락처를 수정하는 중 오류가 발생했습니다.');
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
