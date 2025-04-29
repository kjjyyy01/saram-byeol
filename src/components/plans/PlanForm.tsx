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
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ColorOptions from '@/components/calendar/popOver/ColorOptions';
import { useAuthStore } from '@/store/zustand/store';
import { usePlanColorStore, usePlanFormStore } from '@/store/zustand/usePlanFormStore';
import { useDemoStore } from '@/store/zustand/useDemoStore';

const PlanForm = ({ onClose }: { onClose: () => void }) => {
  const { initialFormData } = usePlanFormStore();
  const [inputValue, setInputValue] = useState('');
  const { selectedColor, setSelectedColor } = usePlanColorStore(); // 선택 색상
  const user = useAuthStore((state) => state.user);
  const { isDemoUser, demoUser } = useDemoStore();
  const userId = user?.id || demoUser.id;
  const isAuthenticated = !!userId;

  const form = useForm<PlanFormType>({
    resolver: zodResolver(PlansSchema),
    mode: 'onChange',
    defaultValues: initialFormData ?? planFormDefaultValues, // 초기값을 props로 전달
  });

  // 색상 변경 시 업데이트
  useEffect(() => {
    form.setValue('colors', selectedColor); // 색상 값 업데이트
  }, [selectedColor, form]);

  // 인풋 변경 시 업데이트
  useEffect(() => {
    if (initialFormData) {
      form.reset(initialFormData); // initialFormData가 바뀌면 form을 reset
    }
  }, [initialFormData, form]);

  // mutate함수 호출
  const { mutate: insertNewPlan } = useMutateInsertNewPlan();

  const planSubmitHandler = (data: PlanFormType) => {
    if (isDemoUser) {
      toast.info('데모체험중에는 제한된 기능입니다.');
      onClose();
      return;
    }
    if (!isAuthenticated) {
      toast.warning('약속추가는 로그인 후 가능합니다.');
      return;
    } else {
      const formData = mappingFormData(data);
      insertNewPlan(
        { user_id: userId, ...formData, colors: selectedColor },
        {
          onSuccess: () => {
            form.reset();
            setInputValue('');
            toast.success('약속이 추가되었습니다.');
            onClose();
          },
          onError: () => {
            toast.error('약속 저장에 실패했습니다.');
          },
        }
      );
    }
  };

  const cancelBtnHandler = () => {
    form.reset();
    setInputValue('');
    onClose();
  };

  return (
    <FormProvider {...form}>
      <form className='flex h-full flex-col justify-between gap-10'>
        <div className='flex flex-col justify-start gap-9'>
          <ColorOptions selectedColor={selectedColor} setSelectedColor={setSelectedColor} />
          <TitleField />
          <ContactsField userId={userId} enabled={isAuthenticated} />
          <DateInputField />
          <PriorityField />
          <PlaceField inputValue={inputValue} setInputValue={setInputValue} />
          <DetailField />
        </div>

        <div className='flex w-full flex-row items-center justify-center gap-4'>
          <Button
            type='button'
            variant={'outline'}
            className='min-h-12 flex-1 border border-grey-500 px-6 py-4 hover:bg-grey-50 active:bg-grey-100'
            onClick={cancelBtnHandler}
          >
            취소
          </Button>
          <Button
            type='button'
            disabled={form.formState.isSubmitting}
            variant={'default'}
            className='min-h-12 flex-1 bg-primary-500 px-6 py-4 hover:bg-primary-600 active:bg-primary-700'
            onClick={form.handleSubmit(planSubmitHandler)}
          >
            저장
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default PlanForm;
