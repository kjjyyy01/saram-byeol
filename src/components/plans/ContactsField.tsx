'use client';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useFormContext } from 'react-hook-form';
import useGetContactsByUserID from '@/hooks/queries/useGetContactsByUserID';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown } from 'lucide-react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { useState } from 'react';
import { UserType } from '@/types/contacts';

interface Props {
  userId: UserType['user_id'];
}

const ContactsField = ({ userId }: Props) => {
  const [open, setOpen] = useState(false);
  const { control, setValue } = useFormContext();
  const { data: contacts = [] } = useGetContactsByUserID(userId);

  return (
    <FormField
      control={control}
      name='contacts'
      render={({ field }) => {
        return (
          <FormItem>
            <FormLabel>이름</FormLabel>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant='outline'
                    role='combobox'
                    aria-expanded={open}
                    className={cn('w-full justify-between', !field.value && 'text-muted-foreground')}
                  >
                    {field.value ? contacts.find((person) => person.contacts_id === field.value)?.name : '이름을 검색해주세요.'}
                    <ChevronsUpDown className='opacity-50' />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className='w-auto p-0'>
                <Command>
                  <CommandInput placeholder='검색' className='h-9' />
                  <CommandList>
                    <CommandEmpty>일치하는 이름이 없습니다.</CommandEmpty>
                    <CommandGroup>
                      {contacts.map((person, i) => (
                        <CommandItem
                          value={person.contacts_id}
                          key={i}
                          onSelect={() => {
                            setValue('contacts', person.contacts_id);
                            setOpen(false);
                          }}
                        >
                          {person.name}
                          <Check className={cn('ml-auto', person.contacts_id === field.value ? 'opacity-100' : 'opacity-0')} />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default ContactsField;
