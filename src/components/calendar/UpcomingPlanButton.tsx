import { getUserPlans } from '@/app/api/supabase/service';
import { useAuthStore } from '@/store/zustand/store';
import React, { useEffect, useState } from 'react';

interface Props {
  onClick: () => void;
  activeTab: string;
}

const UpcomingPlanButton = ({ onClick, activeTab }: Props) => {
  const user = useAuthStore((state) => state.user);
  const [upcomingCount, setUpcomingCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchPlans = async () => {
      if (user?.id) {
        const upcomingPlans = await getUserPlans(user.id);
        setUpcomingCount(upcomingPlans.length); // 데이터 도착한 후에만 업데이트
      }
    };
    fetchPlans();
  }, [user?.id]);

  return (
    <div>
      <button
        onClick={onClick}
        className={`mr-6 rounded-md border-[1px] px-5 py-3 text-[14px] font-bold ${activeTab === 'upcoming' ? 'border-primary-500 text-primary-500' : 'border-grey-300 text-grey-700'}`}
      >
        다가오는 약속
        <span
          className={`m-1 rounded-full px-1 text-white ${activeTab === 'upcoming' ? 'bg-primary-500' : 'bg-black'}`}
        >
          {upcomingCount !== null ? upcomingCount : ''}
        </span>
      </button>
    </div>
  );
};

export default UpcomingPlanButton;
