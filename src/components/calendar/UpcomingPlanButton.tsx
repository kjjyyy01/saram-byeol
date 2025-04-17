import React from 'react';

const UpcomingPlanButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <div>
      <button onClick={onClick} className='mr-[24px] rounded-md border-[1px] px-[20px] py-[12px] text-[14px] font-bold'>
        다가오는 약속
        {/* 다가오는 약속 갯수 추가 */}
      </button>
    </div>
  );
};

export default UpcomingPlanButton;
