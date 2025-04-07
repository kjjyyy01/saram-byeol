'use client';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useFormContext } from 'react-hook-form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';

const DateInputField = () => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name='dateInput'
      render={({ field }) => {
        return (
          <FormItem>
            <FormLabel>날짜</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    id='dateInput'
                    variant={'outline'}
                    className={cn('w-full pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}
                  >
                    {field.value?.from ? (
                      field.value.to ? (
                        <>{`${format(field.value.from, 'PPP')} - ${format(field.value.to, 'ppp')}`}</>
                      ) : (
                        format(field.value.from, 'ppp')
                      )
                    ) : (
                      <span> 날짜 선택</span>
                    )}
                    <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className='w-auto'>
                <Calendar
                  mode='range'
                  defaultMonth={field.value?.from}
                  selected={field.value}
                  onSelect={field.onChange}
                  numberOfMonths={2}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default DateInputField;
