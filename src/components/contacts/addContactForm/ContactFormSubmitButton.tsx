import { Button } from '@/components/ui/button';
import React from 'react';

interface ContactFormSubmitButtonProps {
  isSubmitting: boolean;
}

const ContactFormSubmitButton = ({ isSubmitting }: ContactFormSubmitButtonProps) => {
  return (
    <div className='flex justify-end pt-10'>
      <Button type='submit' disabled={isSubmitting}>
        {isSubmitting ? '추가 중...' : '추가'}
      </Button>
    </div>
  );
};

export default ContactFormSubmitButton;
