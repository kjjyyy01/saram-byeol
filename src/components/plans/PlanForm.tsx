'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import TitleField from '@/components/plans/TitleField';
import DateInputField from '@/components/plans/DateInputField';
import ContactsField from '@/components/plans/ContactsField';
import DetailField from '@/components/plans/DetailField';
import PlaceField from '@/components/plans/PlaceField';
import PriorityField from '@/components/plans/PriorityField';
import useMutateInsertNewPlan from '@/hooks/mutations/useMutateInsertNewPlan';
import { planFormDefaultValues, PlanFormType, PlansSchema } from '@/lib/schemas/plansSchema';
import { mappingFormData } from '@/lib/planFormUtils';
import { useState } from 'react';
import { toast } from 'react-toastify';
import ColorOptions from '@/components/calendar/ColorOptions';

const TEST_USER_ID = 'a27fc897-4216-4863-9e7b-f8868a8369ff';

const PlanForm = () => {
  const [inputValue, setInputValue] = useState('');
  const [selectedColor, setSelectedColor] = useState('#2F80ED'); // 선택 색상

  const form = useForm<PlanFormType>({
    resolver: zodResolver(PlansSchema),
    mode: 'onChange',
    defaultValues: planFormDefaultValues,
  });

  // mutate함수 호출
  const { mutate: insertNewPlan } = useMutateInsertNewPlan();

  const planSubmitHandler = (data: PlanFormType) => {
    const formData = mappingFormData(data);
    console.log('formData', formData);
    insertNewPlan(
      { user_id: TEST_USER_ID, ...formData, colors: selectedColor },
      {
        onSuccess: () => {
          form.reset();
          setInputValue('');
          toast.success('약속이 추가되었습니다.');
        },
        onError: () => {
          toast.error('약속 저장에 실패했습니다.');
        },
      }
    );
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(planSubmitHandler)}>
        <ColorOptions selectedColor={selectedColor} setSelectedColor={setSelectedColor} />
        <TitleField />
        <DateInputField />
        <ContactsField userId={TEST_USER_ID} />
        <PlaceField inputValue={inputValue} setInputValue={setInputValue} />
        <PriorityField />
        <DetailField />
        <Button type='submit' disabled={form.formState.isSubmitting}>
          약속 저장
        </Button>
      </form>
    </FormProvider>
  );
};

export default PlanForm;
