import { create } from 'zustand';
import { planFormDefaultValues, PlanFormType } from '@/lib/schemas/plansSchema';

interface PlanFormState {
  initialFormData: PlanFormType | null;
  showPlanForm: boolean; // PlanForm의 표시 상태
  setInitialFormData: (data: PlanFormType | null) => void;
  clearFormData: () => void;
  setShowPlanForm: (show: boolean) => void; // 상태 변경 함수 추가
}

// 색상 상태 전역 관리
interface PlanColorState {
  selectedColor: string;
  setSelectedColor: (color: string) => void;
}

// 약속 추가 폼(팝오버와 PlanForm 함께 관리)
export const usePlanFormStore = create<PlanFormState>((set) => ({
  initialFormData: planFormDefaultValues,
  showPlanForm: false, // 초기값은 false로 설정
  setInitialFormData: (data) => set({ initialFormData: data }),
  clearFormData: () => set({ initialFormData: planFormDefaultValues }),
  setShowPlanForm: (show) => set({ showPlanForm: show }), // 상태 변경 함수 구현
}));

// 색상 상태
export const usePlanColorStore = create<PlanColorState>((set) => ({
  selectedColor: '#2F80ED',
  setSelectedColor: (color: string) => set({ selectedColor: color }),
}));
