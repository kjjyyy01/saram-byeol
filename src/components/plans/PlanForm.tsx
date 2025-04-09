'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import TitleField from '@/components/plans/TitleField';
import DateInputField from '@/components/plans/DateInputField';
import ContactsField from '@/components/plans/ContactsField';
import DetailField from '@/components/plans/DetailField';
import useMutateInsertNewPlan from '@/hooks/mutations/useMutateInsertNewPlan';
import { PlanFormType, PlansSchema } from '@/lib/schemas/plansSchema';
import { mappingFormData } from '@/lib/planFormUtils';

const TEST_USER_ID = 'a27fc897-4216-4863-9e7b-f8868a8369ff';

const PlanForm = () => {
  const form = useForm<PlanFormType>({
    resolver: zodResolver(PlansSchema),
    mode: 'onChange',
    defaultValues: {
      title: '',
      dateInput: {
        from: new Date(),
        to: undefined,
      },
      contacts: '',
      detail: '',
    },
  });

  // mutate함수 호출
  const { mutate: insertNewPlan } = useMutateInsertNewPlan();

  const planSubmitHandler = (data: PlanFormType) => {
    const formData = mappingFormData(data);
    insertNewPlan(
      { user_id: TEST_USER_ID, ...formData },
      {
        onSuccess: () => {
          form.reset();
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
        <DetailField />
        <Button type='submit' disabled={form.formState.isSubmitting}>
          약속 저장
        </Button>
      </form>
    </FormProvider>
  );
};

export default PlanForm;
