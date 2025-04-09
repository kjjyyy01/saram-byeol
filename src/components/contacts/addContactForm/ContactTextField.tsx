import React from 'react';
import { Control } from 'react-hook-form';
import { FormField, FormControl, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ContactFormValues } from '@/lib/schemas/contactFormSchema';


interface ContactTextFieldProps {
  control: Control<ContactFormValues>;
  name: keyof ContactFormValues;
  label: string;
  placeholder: string;
  type?: string;
}

const ContactTextField: React.FC<ContactTextFieldProps> = ({
  control,
  name,
  label,
  placeholder,
  type = 'text',
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <div className='flex flex-col'>
          <div className='flex items-center'>
            <FormLabel className='w-24 text-lg font-bold'>{label}</FormLabel>
            <FormControl className='flex-1'>
              <Input type={type} placeholder={placeholder} {...field} />
            </FormControl>
          </div>
          <div className='mt-1 flex h-6 justify-center'>
            <FormMessage className='text-sm text-red-500' />
          </div>
        </div>
      )}
    />
  );
};

export default ContactTextField;