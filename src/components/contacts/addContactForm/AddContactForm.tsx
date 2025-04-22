import React from 'react';
import { Form } from '@/components/ui/form';
import { useContactForm } from '@/hooks/useContactForm';
import ContactFormSubmitButton from './ContactFormSubmitButton';
import ContactTextField from './ContactTextField';
import RelationshipSelector from './RelationshipSelector';
import ProfileImageUpload from './ProfileImageUpload';
import { ContactFormValues } from '@/lib/schemas/contactFormSchema';
import { User, Phone, EnvelopeSimple, Cake, TextAlignLeft } from '@phosphor-icons/react';

interface AddContactFormProps {
  onClose: () => void;
}

const AddContactForm = ({ onClose }: AddContactFormProps) => {
  const { form, onSubmit, imageSource, setImageSource, relationshipType, setRelationshipType, isSubmitting } =
    useContactForm();

  const handleSubmit = async (data: ContactFormValues) => {
    await onSubmit(data);
    onClose(); // 제출 후 사이드 시트 닫기
  };

  return (
    <div className='space-y-8 pl-12 pr-12'>
      {/* 이미지 업로드 컴포넌트 */}
      <ProfileImageUpload imageSource={imageSource} setImageSource={setImageSource} setValue={form.setValue} />

      {/* 관계 선택 컴포넌트 */}
      <RelationshipSelector
        relationshipType={relationshipType}
        setRelationshipType={setRelationshipType}
        setValue={form.setValue}
      />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-10'>
          {/* 이름 필드 */}
          <ContactTextField
            control={form.control}
            name='name'
            label='이름'
            placeholder='이름을 입력해주세요.'
            debounceTime={500}
            required
            icon={<User size={20} />}
          />

          {/* 전화번호 필드 */}
          <ContactTextField
            control={form.control}
            name='phone'
            label='전화번호'
            placeholder='전화번호를 입력해주세요.'
            type='tel'
            maxLength={11} // 최대 11자리로 제한
            debounceTime={500}
            icon={<Phone size={20} />}
          />

          {/* 이메일 필드 */}
          <ContactTextField
            control={form.control}
            name='email'
            label='이메일'
            placeholder='이메일을 입력해주세요.'
            type='email'
            debounceTime={500}
            icon={<EnvelopeSimple size={20} />}
          />

          {/* 생일 필드 */}
          <ContactTextField control={form.control} name='birthday' label='생일' placeholder='' type='date' icon={<Cake size={20} />} />

          {/* 소개 필드 */}
          <ContactTextField
            control={form.control}
            name='bio'
            label='메모'
            placeholder='최대 5줄까지 표시됩니다. 5줄 초과시 말줄임표가 표시됩니다.'
            debounceTime={500}
            icon={<TextAlignLeft size={20} />}
          />

          {/* 제출 버튼 */}
          <ContactFormSubmitButton isSubmitting={isSubmitting} />
        </form>
      </Form>
    </div>
  );
};

export default AddContactForm;
