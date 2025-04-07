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
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const PlansSchema = z.object({
  title: z.string().min(1, {
    message: '제목을 입력해주세요.',
  }),
  dateInput: z.object({
    from: z.date({
      required_error: '날짜를 지정해주세요.',
    }),
    to: z.date(),
  }),
  contacts: z.string(),
  detail: z.string().optional(),
});

//타입정의의 선언방식은 interface로 컨벤션되어있지만, interface는 조드가 지원해주는 자동 타입추론을 사용할 수 없습니다.
//조드의 타입추론을 쓰면 스키마와 타입이 항상 동기화되는 장점이 있어서, 예외적으로 type을 사용한 타입선언을 했습니다.
type PlanFormType = z.infer<typeof PlansSchema>;

const PlanForm = () => {
  const form = useForm<PlanFormType>({
    resolver: zodResolver(PlansSchema),
  });

  const planSubmitHandler = (data: PlanFormType) => {
    alert(JSON.stringify(data));
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(planSubmitHandler)}>
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
      </form>
    </Form>
  );
};

export default PlanForm;
