'use client';

import { useFormContext } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const PriorityField = () => {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name='priority'
      render={({ field }) => {
        return (
          <FormItem>
            <FormLabel>중요도</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder='중요도를 선택해주세요' />
                </SelectTrigger>
              </FormControl>
                <SelectContent>
                  <SelectItem value='low'>낮음</SelectItem>
                  <SelectItem value='medium'>중간</SelectItem>
                  <SelectItem value='high'>높음</SelectItem>
                </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default PriorityField;
