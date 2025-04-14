'use client';
import DateInputField from '@/components/plans/DateInputField';
import useMutateInsertNewPlan from '@/hooks/mutations/useMutateInsertNewPlan';
import { mappingFormData } from '@/lib/planFormUtils';
import { PlanFormType, PlansSchema } from '@/lib/schemas/plansSchema';
import { TEST_USER_ID } from '@/components/contacts/ContactList';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { useCallback, useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import ContactsField from '@/components//plans/ContactsField';
import { toast } from 'react-toastify';
import ColorOptions from './ColorOptions';
import { X } from '@phosphor-icons/react';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  date: Date | null;
}

const CalendarPopOver = ({ onOpenChange, date }: Props) => {
  const [selectedColor, setSelectedColor] = useState('#2F80ED'); // 선택 색상

  const dateInput = {
    from: new Date(),
    to: undefined,
  };
  const defaultValues = {
    title: '',
    dateInput,
    contacts: '',
    detail: '',
    colors: '#2F80ED',
  };
  const form = useForm<PlanFormType>({
    resolver: zodResolver(PlansSchema),
    mode: 'onChange',
    defaultValues,
  });

  // 팝오버가 열릴 때마다 선택한 날짜로 form 업데이트
  useEffect(() => {
    if (date) {
      form.reset({
        ...form.getValues(),
        dateInput: {
          from: date,
          to: undefined,
        },
      });
    }
  }, [date, form]);

  // mutate함수 호출
  const { mutate: insertNewPlan, isPending } = useMutateInsertNewPlan();

  const planSubmitHandler = useCallback(
    (data: PlanFormType) => {
      const inputData = mappingFormData(data);
      insertNewPlan(
        { user_id: TEST_USER_ID, ...inputData, colors: selectedColor }, //새로운 일정 추가 시 색상 포함
        {
          onSuccess: () => {
            form.reset();
            toast.success('약속이 추가되었습니다.');
          },
          onError: () => {
            toast.error('약속 저장에 실패했습니다.');
          },
        }
      );
    },
    [insertNewPlan, form, selectedColor]
  );

  return (
    <div>
      <FormProvider {...form}>
        <div className='absolute left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2'>
          <div className='relative w-[300px] rounded-lg bg-white p-6 shadow-lg'>
            <div className='flex justify-end'>
              <X size={24} onClick={() => onOpenChange(false)} className='cursor-pointer' />
            </div>
            <ColorOptions selectedColor={selectedColor} setSelectedColor={setSelectedColor} /> {/* state 전달 */}
            <form onSubmit={form.handleSubmit(planSubmitHandler)}>
              <fieldset disabled={isPending}>
                <Form {...form}>
                  <FormField
                    control={form.control}
                    name='title'
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input type='text' placeholder='제목' {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <DateInputField />
                  <ContactsField userId={TEST_USER_ID} />
                  <Button>옵션 더보기</Button>
                  <Button type='submit' disabled={isPending}>
                    {isPending ? '저장 중...' : '저장'}
                  </Button>
                </Form>
              </fieldset>
            </form>
          </div>
        </div>
      </FormProvider>
    </div>
  );
};
export default CalendarPopOver;
