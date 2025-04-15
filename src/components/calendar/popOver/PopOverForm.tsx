import React, { useCallback } from 'react';
import DateInputField from '@/components/plans/DateInputField';
import { Input } from '@/components/ui/input';
import { Form, FormField } from '@/components/ui/form';
import ContactsField from '@/components//plans/ContactsField';
import useMutateInsertNewPlan from '@/hooks/mutations/useMutateInsertNewPlan';
import { PlanFormType } from '@/lib/schemas/plansSchema';
import { mappingFormData } from '@/lib/planFormUtils';
import { TEST_USER_ID } from '@/components/contacts/ContactList';
import { toast } from 'react-toastify';
import { TextAa } from '@phosphor-icons/react';
import { useFormContext } from 'react-hook-form';

const PopOverForm = ({ selectedColor }: { selectedColor: string }) => {
  const form = useFormContext<PlanFormType>();
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
      <form onSubmit={form.handleSubmit(planSubmitHandler)}>
        <fieldset disabled={isPending} className='grid gap-8'>
          <Form {...form}>
            <section className='flex items-center gap-8'>
              <div className='relative flex w-14 flex-shrink-0 flex-grow-0 flex-col items-center justify-center gap-1'>
                <TextAa size={24} />
                <p className='min-w-max text-[14px]'>제목</p>
              </div>
              <FormField
                control={form.control}
                name='title'
                render={({ field }) => <Input type='text' placeholder='제목' {...field} />}
              />
            </section>
            <DateInputField />
            <ContactsField userId={TEST_USER_ID} />
            <div className='flex justify-between'>
              <button className='items-center justify-center rounded-[6px] border-[1px] border-primary-500 bg-primary-50 px-5 py-3 font-bold text-primary-500'>
                옵션 더보기
              </button>
              <button
                type='submit'
                disabled={isPending}
                className='w-[121px] items-center justify-center rounded-[6px] border-[1px] bg-primary-100 px-5 py-3 text-[14px] font-bold text-grey-0'
              >
                {isPending ? '저장 중...' : '저장'}
              </button>
            </div>
          </Form>
        </fieldset>
      </form>
    </div>
  );
};

export default PopOverForm;
