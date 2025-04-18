import { getUserPlans } from '@/app/api/supabase/service';
import { useAuthStore } from '@/store/zustand/store';
import React, { useEffect, useState } from 'react';

const UpcomingPlanButton = ({ onClick }: { onClick: () => void }) => {
  const user = useAuthStore((state) => state.user);
  const [upcomingCount, setUpcomingCount] = useState(0);

  useEffect(() => {
    const fetchPlans = async () => {
      if (user?.id) {
        const upcomingPlans = await getUserPlans(user.id);
        setUpcomingCount(upcomingPlans.length);
      }
    };
    fetchPlans();
  }, [user?.id]);

  return (
    <div>
      <button onClick={onClick} className='mr-[24px] rounded-md border-[1px] px-[20px] py-[12px] text-[14px] font-bold'>
        다가오는 약속
        <span className='m-1 rounded-full bg-black px-1 text-white'>{upcomingCount}</span>
      </button>
    </div>
  );
};

export default UpcomingPlanButton;
