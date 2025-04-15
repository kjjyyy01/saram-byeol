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
import { useAuthStore } from '@/store/zustand/store';

const PlanForm = () => {
  const [inputValue, setInputValue] = useState('');
  const [selectedColor, setSelectedColor] = useState('#2F80ED'); // 선택 색상
  const user = useAuthStore((state) => state.user);
  const userId = user ? user?.id : 'a27fc897-4216-4863-9e7b-f8868a8369ff'; //ContactsField Props 데이터 타입 호환용 테스트유저 아이디 (추후 데모용 아이디로 변경)

  const form = useForm<PlanFormType>({
    resolver: zodResolver(PlansSchema),
    mode: 'onChange',
    defaultValues: planFormDefaultValues,
  });

  // mutate함수 호출
  const { mutate: insertNewPlan } = useMutateInsertNewPlan();

  const planSubmitHandler = (data: PlanFormType) => {
    if (!userId) {
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
          },
          onError: () => {
            toast.error('약속 저장에 실패했습니다.');
          },
        }
      );
    }
  };

  return (
    <FormProvider {...form}>
      <div className='mx-12 my-10'>
        <form onSubmit={form.handleSubmit(planSubmitHandler)} className='flex flex-col justify-start gap-9'>
          <ColorOptions selectedColor={selectedColor} setSelectedColor={setSelectedColor} />
          <TitleField />
          <DateInputField />
          <ContactsField userId={userId} />
          <PlaceField inputValue={inputValue} setInputValue={setInputValue} />
          <PriorityField />
          <DetailField />
          {/* 이 아래 div가 버튼 영역입니다. submit 함수가 현재 이 form 태그 안에 있기 때문에 서브밋 함수랑 주의해서 적용해주세요. 취소버튼은 현재 아무 이벤트가 없으니 연결해주셔야합니다. */}
          <div className='flex w-full flex-row items-center justify-center gap-4'>
            <Button
              type='button'
              variant={'outline'}
              className='min-h-12 flex-1 border border-grey-500 px-6 py-4 hover:bg-grey-50 active:bg-grey-100'
            >
              취소
            </Button>
            <Button
              type='submit'
              disabled={form.formState.isSubmitting}
              variant={'default'}
              className='min-h-12 flex-1 bg-primary-500 px-6 py-4 hover:bg-primary-600 active:bg-primary-700'
            >
              저장
            </Button>
          </div>
        </form>
      </div>
    </FormProvider>
  );
};

export default PlanForm;
