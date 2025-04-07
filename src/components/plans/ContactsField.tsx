'use client';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';

const ContactsField = () => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name='contacts'
      render={({ field }) => {
        return (
          <FormItem>
            <FormLabel>내 사람</FormLabel>
            <FormControl>
              <Input placeholder='test' {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default ContactsField;
