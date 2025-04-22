import React, { useEffect, useRef, useState } from 'react';
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
  maxLength?: number;
  debounceTime?: number;
  required?: boolean;
  icon?: React.ReactNode;
}

const ContactTextField = ({
  control,
  name,
  label,
  placeholder,
  type = 'text',
  maxLength,
  debounceTime = 500,
  required = false,
  icon,
}: ContactTextFieldProps) => {
  const [isTyping, setIsTyping] = useState(false);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  return (
    <FormField
    control={control}
    name={name}
    render={({ field, fieldState }) => {
      const { error } = fieldState;

      const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsTyping(true);
        if (debounceTimerRef.current) {
          clearTimeout(debounceTimerRef.current);
        }

        let value = e.target.value;
        if (name === 'phone') {
          value = value.replace(/[^0-9]/g, '');
        }

        field.onChange(value);

        debounceTimerRef.current = setTimeout(() => {
          setIsTyping(false);
          field.onBlur();
        }, debounceTime);
      };

      return (
        <div className='flex w-full items-start'>
          {/* 아이콘 & 라벨 */}
          <div className='w-24 flex flex-col items-center pt-1'>
            {icon && <div className='mb-1 text-gray-600'>{icon}</div>}
            <div className='text-sm text-center peer-invalid:text-gray-600'>
              {label}
              {required && <span className='ml-1 text-red-500'>*</span>}
            </div>
          </div>

          {/* 인풋 */}
          <div className='flex flex-1 flex-col'>
            <FormControl>
              <Input
                type={type}
                placeholder={placeholder}
                maxLength={maxLength}
                {...field}
                value={field.value || ''}
                onChange={handleInputChange}
                onBlur={() => {
                  setIsTyping(false);
                  field.onBlur();
                }}
              />
            </FormControl>

            {/* 에러 메시지 */}
            <div className='mt-1 min-h-[24px]'>
              {!isTyping && error?.message && (
                <FormMessage className='text-left text-sm text-red-500'>{error.message}</FormMessage>
              )}
            </div>
          </div>
        </div>
        );
      }}
    />
  );
};

export default ContactTextField;
