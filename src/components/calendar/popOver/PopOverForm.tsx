import React, { useCallback, useEffect } from 'react';
import DateInputField from '@/components/plans/DateInputField';
import { Input } from '@/components/ui/input';
import { Form, FormField } from '@/components/ui/form';
import ContactsField from '@/components//plans/ContactsField';
import useMutateInsertNewPlan from '@/hooks/mutations/useMutateInsertNewPlan';
import { PlanFormType } from '@/lib/schemas/plansSchema';
import { mappingFormData } from '@/lib/planFormUtils';
import { toast } from 'react-toastify';
import { TextAa } from '@phosphor-icons/react';
import { useFormContext } from 'react-hook-form';
import { useAuthStore } from '@/store/zustand/store';
import { usePlanFormStore } from '@/store/zustand/usePlanFormStore';

interface Props {
  selectedColor: string;
  onOpenFullForm: () => void;
}

const PopOverForm = ({ selectedColor, onOpenFullForm }: Props) => {
  const user = useAuthStore((state) => state.user);
  const form = useFormContext<PlanFormType>();
  const { mutate: insertNewPlan, isPending } = useMutateInsertNewPlan();

  // 팝오버에 작성된 내용
  const { setInitialFormData, clearFormData } = usePlanFormStore();

  const handleShowFullForm = () => {
    const currentData = form.getValues();
    setInitialFormData(currentData);
    // 이제 Calendar 컴포넌트에 PlanForm 보여주게 트리거
    onOpenFullForm(); // props로 받아서 상태 변경하거나, zustand에서 같이 관리
  };

  const planSubmitHandler = useCallback(
    (data: PlanFormType) => {
      if (!user) return null;
      const inputData = mappingFormData(data);
      insertNewPlan(
        { user_id: user.id, ...inputData, colors: selectedColor }, //새로운 일정 추가 시 색상 포함
        {
          onSuccess: () => {
            form.reset();
            toast.success('약속이 추가되었습니다.');
            clearFormData();
          },
          onError: () => {
            toast.error('약속 저장에 실패했습니다.');
          },
        }
      );
    },
    [insertNewPlan, form, selectedColor, user, clearFormData]
  );

  useEffect(() => {
    form.setValue('colors', selectedColor); // 색상 업데이트
  }, [selectedColor, form]);

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
            {user && <ContactsField userId={user.id} enabled={!!user.id} />}
            <div className='flex justify-between'>
              <button
                type='button'
                onClick={handleShowFullForm}
                className='items-center justify-center rounded-[6px] border-[1px] border-primary-500 bg-primary-50 px-5 py-3 font-bold text-primary-500'
              >
                옵션 더보기
              </button>
              <button
                type='submit'
                disabled={isPending}
                className='w-[121px] items-center justify-center rounded-[6px] border-[1px] bg-primary-500 px-5 py-3 text-[14px] font-bold text-grey-0'
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
