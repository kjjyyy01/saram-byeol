import React from 'react';

const AddPlanButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <div>
      <button
        onClick={onClick}
        className='items-center justify-center rounded-md border-[1px] border-primary-500 px-5 py-3 text-[14px] font-bold text-[#0066FF]'
      >
        약속 추가
      </button>
    </div>
  );
};

export default AddPlanButton;
