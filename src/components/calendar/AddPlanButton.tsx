import React from 'react';

interface Props {
  onClick: () => void;
  activeTab: string;
}

const AddPlanButton = ({ onClick, activeTab }: Props) => {
  return (
    <div>
      <button
        onClick={onClick}
        className={`items-center justify-center rounded-md border-[1px] px-5 py-3 text-[14px] font-bold ${activeTab === 'add' ? 'border-primary-500 text-primary-500' : 'border-grey-300 text-grey-700'}`}
      >
        약속 추가
      </button>
    </div>
  );
};

export default AddPlanButton;
