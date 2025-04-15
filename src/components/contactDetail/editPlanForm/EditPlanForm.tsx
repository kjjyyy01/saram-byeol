import ContactsField from '@/components/plans/ContactsField';
import DateInputField from '@/components/plans/DateInputField';
import DetailField from '@/components/plans/DetailField';
import PlaceField from '@/components/plans/PlaceField';
import TitleField from '@/components/plans/TitleField';
import { Button } from '@/components/ui/button';
import { useMutateUpdatePlan } from '@/hooks/mutations/useMutateUpdatePlan';
import { mappingFormData } from '@/lib/planFormUtils';
import { PlanFormType, PlansSchema } from '@/lib/schemas/plansSchema';
import { useAuthStore } from '@/store/zustand/store';
import { EditPlanType } from '@/types/plans';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

interface Props {
  plan: EditPlanType;
  onClose: () => void;
}

const convertToFormValues = (plan: EditPlanType): PlanFormType => ({
  title: plan.title || '',
  detail: plan.detail || '',
  contacts: plan.contacts_id || '',
  priority: plan.priority || '',
  dateInput: {
    from: new Date(plan.start_date),
    to: new Date(plan.end_date),
  },
  location: {
    place_name: plan.location?.place_name || '',
    road_address_name: plan.location?.road_address_name || '',
    place_url: plan.location?.place_url || '',
    id: plan.location?.id || '',
    phone: plan.location?.phone || '',
    x: plan.location?.x || '',
    y: plan.location?.y || '',
  },
  colors: plan.colors ?? '',
});

const EditPlanForm: React.FC<Props> = ({ plan, onClose }) => {
  const [inputValue, setInputValue] = useState(plan.location?.place_name || '');
  const user = useAuthStore((state) => state.user);

  const form = useForm<PlanFormType>({
    resolver: zodResolver(PlansSchema),
    mode: 'onChange',
    defaultValues: convertToFormValues(plan),
  });

  const { mutate: updatePlan } = useMutateUpdatePlan();

  const editPlanHandler = (data: PlanFormType) => {
    const formData = mappingFormData(data);
    updatePlan(
      { planId: plan.plan_id, updatedData: { ...formData, user_id: plan.user_id } },
      {
        onSuccess: () => {
          toast.success('약속이 수정되었습니다.');
          onClose();
        },
        onError: () => toast.error('약속 수정에 실패했습니다.'),
      }
    );
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(editPlanHandler)}>
        <TitleField />
        <DateInputField />
        <ContactsField userId={user?.id || ''} />
        <PlaceField inputValue={inputValue} setInputValue={setInputValue} />
        <DetailField />
        <div className='flex justify-end pt-6'>
          <Button type='submit' disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? '수정 중...' : '수정'}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default EditPlanForm;
