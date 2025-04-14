'use client';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useFormContext } from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea';

const DetailField = () => {
      const { control } = useFormContext();
    
  return (
    <FormField
          control={control}
          name='detail'
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>내용</FormLabel>
                <FormControl>
                  <Textarea id='detail' placeholder='내용을 입력해주세요.(최대 100자)' className='resize-none' {...field} maxLength={100} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
  )
}

export default DetailField