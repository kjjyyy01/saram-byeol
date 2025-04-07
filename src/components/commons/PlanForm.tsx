'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';

const PlanForm = () => {
  const form = useForm();

  
  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name='title'
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel>제목</FormLabel>
              <FormControl>
                <Input type='text' placeholder='제목' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
      />
      <FormField
        control={form.control}
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
                <PopoverContent className="w-auto">
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
      <FormField
        control={form.control}
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

      <FormField
        control={form.control}
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
      <Button type='submit'> 약속 저장 </Button>
    </Form>
  );
};

export default PlanForm;
