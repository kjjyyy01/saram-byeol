import { Popover, PopoverContent } from '@/components/ui/popover';
import DateInputField from '@/components/plans/DateInputField';
import useMutateInsertNewPlan from '@/hooks/mutations/useMutateInsertNewPlan';
import { mappingFormData } from '@/lib/planFormUtils';
import { PlanFormType, PlansSchema } from '@/lib/schemas/plansSchema';
import { TEST_USER_ID } from '@/components/contacts/ContactList';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { useCallback, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import ContactsField from '@/components//plans/ContactsField';
import { toast } from 'react-toastify';
import ColorOptions from './ColorOptions';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  date: Date | null;
}

const CalendarPopOver = ({ open, onOpenChange, date }: Props) => {
  const dateInput = {
    from: new Date(),
    to: undefined,
  };
  const defaultValues = {
    title: '',
    dateInput,
    contacts: '',
    detail: '',
  };
  const form = useForm<PlanFormType>({
    resolver: zodResolver(PlansSchema),
    mode: 'onChange',
    defaultValues,
  });

  // 팝오버가 열릴 때마다 선택한 날짜로 form 업데이트
  useEffect(() => {
    if (date && open) {
      form.reset({
        ...form.getValues(),
        dateInput: {
          from: date,
          to: undefined,
        },
      });
    }
  }, [date, open, form]);

  // mutate함수 호출
  const { mutate: insertNewPlan, isPending } = useMutateInsertNewPlan();

  const planSubmitHandler = useCallback(
    (data: PlanFormType) => {
      const formData = mappingFormData(data);
      insertNewPlan(
        { user_id: TEST_USER_ID, ...formData },
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
    [insertNewPlan, form]
  );

  return (
    <>
      <FormProvider {...form}>
        <Popover open={open} onOpenChange={onOpenChange}>
          <PopoverContent side='right' align='start' style={{ position: 'absolute', top: 200, left: 600 }}>
            <ColorOptions />
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
          </PopoverContent>
        </Popover>
      </FormProvider>
    </>
  );
};
export default CalendarPopOver;
