'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import TitleField from './TitleField';
import DateInputField from './DateInputField';
import ContactsField from './ContactsField';
import DetailField from './DetailField';

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
    //입력값 확인을 위한 임시 코드
    alert(JSON.stringify(data));
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(planSubmitHandler)}>
        <TitleField />
        <DateInputField />
        <ContactsField />
        <DetailField />

        <Button type='submit'> 약속 저장 </Button>
      </form>
    </FormProvider>
  );
};

export default PlanForm;
