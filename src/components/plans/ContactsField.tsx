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

const TEST_USER_ID = 'a27fc897-4216-4863-9e7b-f8868a8369ff'; // 나중에 props로 받을것

const ContactsField = () => {
  const { control, setValue } = useFormContext();
  const [open, setOpen] = useState(false);
  const { data: contacts = [] } = useGetContactsByUserID(TEST_USER_ID);
  // console.log(contacts);

  return (
    <FormField
      control={control}
      name='contacts'
      render={({ field }) => {
        return (
          <FormItem>
            <FormLabel>내 사람</FormLabel>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant='outline'
                    role='combobox'
                    aria-expanded={open}
                    className={cn('w-full justify-between', !field.value && 'text-muted-foreground')}
                  >
                    {field.value ? contacts.find((person) => person.name === field.value)?.name : '내 사람 선택'}
                    <ChevronsUpDown className='opacity-50' />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className='w-auto p-0'>
                <Command>
                  <CommandInput placeholder='검색' className='h-9' />
                  <CommandList>
                    <CommandEmpty>일치하는 친구가 없습니다.</CommandEmpty>
                    <CommandGroup>
                      {contacts.map((person, i) => (
                        <CommandItem
                          value={person.name}
                          key={i}
                          onSelect={() => {
                            setValue('contacts', person.name);
                            setOpen(false);
                          }}
                        >
                          {person.name}
                          <Check className={cn('ml-auto', person.name === field.value ? 'opacity-100' : 'opacity-0')} />
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
