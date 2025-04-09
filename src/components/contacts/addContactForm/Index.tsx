import React from 'react';
import { Form } from '@/components/ui/form';
import { useContactForm } from '@/hooks/useContactForm';
import ContactFormSubmitButton from './ContactFormSubmitButton';
import ContactTextField from './ContactTextField';
import RelationshipSelector from './RelationshipSelector';
import ProfileImageUpload from './ProfileImageUpload';

const AddContactForm: React.FC = () => {
  const { form, onSubmit, imageSource, setImageSource, relationshipType, setRelationshipType, isSubmitting } =
    useContactForm();

  return (
    <div className='space-y-8 pl-12 pr-12'>
      {/* 이미지 업로드 컴포넌트 */}
      <ProfileImageUpload
        imageSource={imageSource} 
        setImageSource={setImageSource} 
        setValue={form.setValue} 
      />

      {/* 관계 선택 컴포넌트 */}
      <RelationshipSelector
        relationshipType={relationshipType} 
        setRelationshipType={setRelationshipType} 
        setValue={form.setValue} 
      />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-10'>
          {/* 이름 필드 */}
          <ContactTextField
            control={form.control}
            name='name'
            label='이름'
            placeholder='이름을 입력해주세요.'
          />

          {/* 한줄소개 필드 */}
          <ContactTextField
            control={form.control}
            name='bio'
            label='한줄소개'
            placeholder='이 사람을 한 마디로 표현한다면? (최소 5자)'
          />

          {/* 전화번호 필드 */}
          <ContactTextField
            control={form.control}
            name='phone'
            label='전화번호'
            placeholder='전화번호를 입력해주세요.'
            type='tel'
          />

          {/* 이메일 필드 */}
          <ContactTextField
            control={form.control}
            name='email'
            label='이메일'
            placeholder='이메일을 입력해주세요.'
            type='email'
          />

          {/* 생일 필드 */}
          <ContactTextField
            control={form.control}
            name='birthday'
            label='생일'
            placeholder=''
            type='date'
          />
          
          {/* 제출 버튼 */}
          <ContactFormSubmitButton isSubmitting={isSubmitting} />
        </form>
      </Form>
    </div>
  );
};

export default AddContactForm;
