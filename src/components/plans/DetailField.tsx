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
                  <Textarea id='detail' placeholder='약속내용을 작성하세요' className='resize-none' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
  )
}

export default DetailField