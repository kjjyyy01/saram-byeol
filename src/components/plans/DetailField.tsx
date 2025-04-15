'use client';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useFormContext } from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea';
import { TextAlignLeft } from '@phosphor-icons/react';

const DetailField = () => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name='detail'
      render={({ field }) => {
        return (
          <FormItem className='flex items-center justify-start gap-8'>
            <FormLabel className='relative flex w-14 flex-shrink-0 flex-grow-0 flex-col items-center justify-center gap-1'>
              <TextAlignLeft size={24} className='h-6 w-6 flex-shrink-0 flex-grow-0' />
              <p className='text-center text-sm'>내용</p>
            </FormLabel>
            <FormControl>
              <Textarea
                id='detail'
                placeholder='내용을 입력해주세요.(최대 100자)'
                className='min-h-36 w-full resize-none self-stretch rounded-lg border-grey-200 px-4 py-2 text-sm leading-6'
                {...field}
                maxLength={150}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default DetailField;
