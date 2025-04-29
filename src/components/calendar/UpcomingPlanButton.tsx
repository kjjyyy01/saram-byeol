import { useSetUpcomingCount } from '@/hooks/queries/useSetUpcomingCount';
import React, { useCallback } from 'react';

interface Props {
  onClick: () => void;
  activeTab: string;
}

const UpcomingPlanButton = ({ onClick, activeTab }: Props) => {
  const { data: count = 0, refetch } = useSetUpcomingCount();

  const handleClick = useCallback(() => {
    refetch();
    onClick();
  }, [refetch, onClick]);

  return (
    <div>
      <button
        onClick={handleClick}
        className={`mr-6 rounded-md border-[1px] px-5 py-3 text-[14px] font-bold ${activeTab === 'upcoming' ? 'border-primary-500 text-primary-500' : 'border-grey-300 text-grey-700'}`}
      >
        다가오는 약속
        <span
          className={`m-1 rounded-full px-1 text-white ${activeTab === 'upcoming' ? 'bg-primary-500' : 'bg-black'}`}
        >
          {count}
        </span>
      </button>
    </div>
  );
};

export default UpcomingPlanButton;
