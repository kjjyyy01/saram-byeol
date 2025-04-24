import { Form } from '@/components/ui/form';
import { ContactFormValues } from '@/lib/schemas/contactFormSchema';
import { UseFormReturn } from 'react-hook-form';
import RelationshipSelector from '@/components/contacts/addContactForm/RelationshipSelector';
import ContactTextField from '@/components/contacts/addContactForm/ContactTextField';
import ProfileImageUpload from '@/components/contacts/addContactForm/ProfileImageUpload';
import { Cake, EnvelopeSimple, Phone, User } from '@phosphor-icons/react';
import { ContactMemoField } from '@/components/contacts/addContactForm/ContactMemoField';
import ContactFormCancelButton from '@/components/contacts/addContactForm/ContactFormCancelButton';
import ContactFormSubmitButton from '@/components/contacts/addContactForm/ContactFormSubmitButton';

interface ContactFormProps {
  form: UseFormReturn<ContactFormValues>;
  onSubmit: (data: ContactFormValues) => Promise<void>;
  isSubmitting: boolean;
  imageSource: string | null;
  setImageSource: (val: string | null) => void;
  relationshipType: string;
  setRelationshipType: (val: string) => void;
  onClose: () => void;
}

const ContactForm = ({
  form,
  onSubmit,
  isSubmitting,
  imageSource,
  setImageSource,
  relationshipType,
  setRelationshipType,
  onClose,
}: ContactFormProps) => {
  const handleSubmit = async (data: ContactFormValues) => {
    await onSubmit(data);
    onClose();
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
            icon={<User size={24} />}
            maxLength={13}
          />

          {/* 전화번호 필드 */}
          <ContactTextField
            control={form.control}
            name='phone'
            label='전화번호'
            placeholder='전화번호 입력'
            type='tel'
            maxLength={11}
            debounceTime={500}
            icon={<Phone size={24} />}
          />

          {/* 이메일 필드 */}
          <ContactTextField
            control={form.control}
            name='email'
            label='이메일'
            placeholder='이메일 입력'
            type='email'
            debounceTime={500}
            icon={<EnvelopeSimple size={24} />}
          />

          {/* 생일 필드 */}
          <ContactTextField
            control={form.control}
            name='birthday'
            label='생일'
            placeholder=''
            type='date'
            icon={<Cake size={24} />}
          />

          {/* 메모 필드 */}
          <ContactMemoField control={form.control} />

          {/* 버튼 그룹 */}
          <div className='flex w-full space-x-8'>
            <ContactFormCancelButton onClose={onClose} />
            <ContactFormSubmitButton isSubmitting={isSubmitting} />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ContactForm;
