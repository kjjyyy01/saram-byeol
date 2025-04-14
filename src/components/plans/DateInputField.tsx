'use client';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useFormContext } from 'react-hook-form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { format, setDefaultOptions } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { ko } from 'date-fns/locale/ko';
import { CalendarBlank } from '@phosphor-icons/react';

setDefaultOptions({ locale: ko });

const DateInputField = () => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name='dateInput'
      render={({ field }) => {
        return (
          <FormItem className='flex items-center justify-start gap-8'>
            <FormLabel className='relative flex w-14 flex-shrink-0 flex-grow-0 flex-col items-center justify-center gap-1'>
              <CalendarBlank className='h-6 w-6 flex-shrink-0 flex-grow-0' />
              <p className='text-center text-sm'>약속</p>
            </FormLabel>
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
                        <>{`${format(field.value.from, 'y.LL.dd (ccc)')} - ${format(field.value.to, 'y.LL.dd (ccc)')}`}</>
                      ) : (
                        format(field.value.from, 'y.LL.dd (ccc)')
                      )
                    ) : (
                      <span> 약속일을 선택하세요</span>
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
