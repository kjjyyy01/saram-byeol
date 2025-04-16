'use client';
import { PlanFormType, PlansSchema } from '@/lib/schemas/plansSchema';

import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import ColorOptions from './ColorOptions';
import { X } from '@phosphor-icons/react';
import PopOverForm from '@/components/calendar/popOver/PopOverForm';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  date: Date | null;
}

const CalendarPopOver = ({ onOpenChange, date }: Props) => {
  const [selectedColor, setSelectedColor] = useState('#2F80ED'); // 선택 색상

  const dateInput = {
    from: new Date(),
    to: new Date(),
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

  return (
    <div>
      <FormProvider {...form}>
        <div className='absolute left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2'>
          <div className='relative rounded-lg bg-white p-8 shadow-lg'>
            <div className='grid gap-8'>
              <section className='flex items-center justify-between'>
                <h3 className='text-[20px] font-bold text-grey-900'>약속 추가</h3>
                <X size={24} onClick={() => onOpenChange(false)} className='cursor-pointer' />
              </section>
              <ColorOptions selectedColor={selectedColor} setSelectedColor={setSelectedColor} /> {/* state 전달 */}
              <PopOverForm selectedColor={selectedColor} />
            </div>
          </div>
        </div>
      </FormProvider>
    </div>
  );
};
export default CalendarPopOver;
