import { Button } from '@/components/ui/button';
import React from 'react';

interface ContactFormCancelButtonProps {
  onClose: () => void;
}

const ContactFormCancelButton = ({ onClose }: ContactFormCancelButtonProps) => {
  return (
    <Button
      type='button'
      onClick={onClose}
      className='min-h-12 flex-1 border border-grey-500 px-10 py-4 text-center font-bold transition hover:bg-grey-50 active:bg-grey-100'
      variant='outline'
    >
      취소
    </Button>
  );
};

export default ContactFormCancelButton;
