'use client';

import { useFormContext } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Star } from '@phosphor-icons/react';

const PriorityField = () => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name='priority'
      render={({ field }) => (
        <FormItem className='flex items-center justify-start gap-8'>
          <FormLabel className='relative flex w-14 flex-shrink-0 flex-grow-0 flex-col items-center justify-center gap-1'>
            <Star size={24} className='h-6 w-6 flex-shrink-0 flex-grow-0' />
            <p className='text-center text-sm'>중요도</p>
          </FormLabel>
          <Select onValueChange={field.onChange} value={field.value}>
            <FormControl className='flex flex-1 items-center self-stretch rounded-lg border border-grey-200 px-4 py-2 text-sm leading-6'>
              <SelectTrigger>
                <SelectValue placeholder='중요도를 선택해주세요' />
              </SelectTrigger>
            </FormControl>
            <SelectContent className='rounded-lg'>
              <SelectItem value='low'>낮음</SelectItem>
              <SelectItem value='medium'>중간</SelectItem>
              <SelectItem value='high'>높음</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default PriorityField;
