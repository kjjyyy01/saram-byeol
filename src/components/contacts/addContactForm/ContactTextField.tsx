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
}

const ContactTextField = ({ control, name, label, placeholder, type = 'text', maxLength, debounceTime = 500, required= false }: ContactTextFieldProps) => {
  const [isTyping, setIsTyping] = useState(false);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // 컴포넌트 언마운트 시 타이머 클리어
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
        
        // 타이머가 있으면 클리어
        if (debounceTimerRef.current) {
          clearTimeout(debounceTimerRef.current);
        }
        
        // 전화번호 필터링
        let value = e.target.value;
        if (name === 'phone') {
          value = value.replace(/[^0-9]/g, '');
        }
        
        // 값 업데이트
        field.onChange(value);
        
        // 디바운스 타이머 설정
        debounceTimerRef.current = setTimeout(() => {
          setIsTyping(false);
          // 입력이 멈추면 유효성 검사 트리거 (onBlur 효과)
          field.onBlur();
        }, debounceTime);
      };
            
      return (
        <div className='flex flex-col'>
          <div className='flex items-center'>
            <FormLabel className='w-24 text-lg font-bold'>
              {label}
              {required && <span className='ml-1 text-red-500'>*</span>}
            </FormLabel>
            <FormControl className='flex-1'>
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
          </div>
          <div className='mt-1 flex h-6 justify-center'>
            {/* 타이핑 중이 아닐 때만 에러 메시지 표시 */}
            {!isTyping && error?.message && (
              <FormMessage className='text-sm text-red-500'>{error.message}</FormMessage>
            )}
          </div>
        </div>
      );
    }}
  />
  );
};

export default ContactTextField;
