'use client';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { TextAa } from '@phosphor-icons/react';

const TitleField = () => {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name='title'
      render={({ field }) => {
        return (
          <FormItem className='flex items-center justify-start gap-8'>
            <FormLabel className='relative flex w-14 flex-shrink-0 flex-grow-0 flex-col items-center justify-center gap-1'>
              <TextAa size={24} className='h-6 w-6 flex-shrink-0 flex-grow-0' />
              <p className='text-center text-sm'>제목</p>
            </FormLabel>
            <div className='flex w-full flex-col'>
              <FormControl>
                <Input
                  type='text'
                  placeholder='제목을 입력해주세요.'
                  {...field}
                  maxLength={50}
                  className={`border-grey-200 flex items-center self-stretch rounded-lg border px-4 py-2 text-sm leading-6`}
                />
              </FormControl>
              <FormMessage className='pl-1' />
            </div>
          </FormItem>
        );
      }}
    />
  );
};

export default TitleField;
