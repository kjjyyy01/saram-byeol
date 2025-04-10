'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import TitleField from '@/components/plans/TitleField';
import DateInputField from '@/components/plans/DateInputField';
import ContactsField from '@/components/plans/ContactsField';
import DetailField from '@/components/plans/DetailField';
import PlaceField from '@/components/plans/PlaceField';
import useMutateInsertNewPlan from '@/hooks/mutations/useMutateInsertNewPlan';
import { planFormDefaultValues, PlanFormType, PlansSchema } from '@/lib/schemas/plansSchema';
import { mappingFormData } from '@/lib/planFormUtils';
import { useState } from 'react';

const TEST_USER_ID = 'a27fc897-4216-4863-9e7b-f8868a8369ff';

const PlanForm = () => {
    const [inputValue, setInputValue] = useState('');
  const form = useForm<PlanFormType>({
    resolver: zodResolver(PlansSchema),
    mode: 'onChange',
    defaultValues: planFormDefaultValues,
  });

  // mutate함수 호출
  const { mutate: insertNewPlan } = useMutateInsertNewPlan();

  const planSubmitHandler = (data: PlanFormType) => {
    const formData = mappingFormData(data);
    // console.log(data)
    insertNewPlan(
      { user_id: TEST_USER_ID, ...formData },
      {
        onSuccess: () => {
          form.reset()
          setInputValue('')
        },
      }
    );
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(planSubmitHandler)}>
        <TitleField />
        <DateInputField />
        <ContactsField userId={TEST_USER_ID} />
        <PlaceField inputValue={inputValue} setInputValue={setInputValue}/>
        <DetailField />
        <Button type='submit' disabled={form.formState.isSubmitting}>
          약속 저장
        </Button>
      </form>
    </FormProvider>
  );
};

export default PlanForm;
