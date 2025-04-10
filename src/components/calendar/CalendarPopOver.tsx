import { Popover, PopoverContent } from '@/components/ui/popover';
import DateInputField from '../plans/DateInputField';
import useMutateInsertNewPlan from '@/hooks/mutations/useMutateInsertNewPlan';
import { mappingFormData } from '@/lib/planFormUtils';
import { PlanFormType, PlansSchema } from '@/lib/schemas/plansSchema';
import { TEST_USER_ID } from '../contacts/ContactList';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../ui/button';
import { useEffect } from 'react';
import { Input } from '../ui/input';
import { Form, FormControl, FormField, FormItem } from '../ui/form';
import ContactsField from '../plans/ContactsField';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  date: Date | null;
}

const CalendarPopOver = ({ open, onOpenChange, date }: Props) => {
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
  }, [date, open]);

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
      <Popover open={open} onOpenChange={onOpenChange}>
        <PopoverContent side='right' align='start' style={{ position: 'absolute', top: 200, left: 400 }} asChild>
          <form onSubmit={form.handleSubmit(planSubmitHandler)}>
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
              <Button type='submit'>저장</Button>
            </Form>
          </form>
        </PopoverContent>
      </Popover>
    </FormProvider>
  );
};
export default CalendarPopOver;
