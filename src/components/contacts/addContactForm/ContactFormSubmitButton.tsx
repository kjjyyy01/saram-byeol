import { Button } from '@/components/ui/button';
import React from 'react';

interface ContactFormSubmitButtonProps {
  isSubmitting: boolean;
}

const ContactFormSubmitButton = ({ isSubmitting }: ContactFormSubmitButtonProps) => {
  return (
    <Button
      type='submit'
      disabled={isSubmitting}
      className='min-h-12 flex-1 bg-primary-500 px-10 py-4 text-center font-bold text-grey-0 transition hover:bg-primary-600 active:bg-primary-700'
      variant='default'
    >
      {isSubmitting ? '저장 중...' : '저장'}
    </Button>
  );
};

export default ContactFormSubmitButton;
