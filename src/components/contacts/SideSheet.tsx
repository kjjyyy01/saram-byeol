import { X } from '@phosphor-icons/react';
import React, { ReactNode } from 'react'

interface SideSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const SideSheet: React.FC<SideSheetProps> = ({ isOpen, onClose, children }) => {
  return (
    <div>
      {/* 사이드 시트 */}
      <div
        className={`fixed right-0 top-0 z-50 h-screen w-full transform bg-white shadow-lg transition-transform duration-300 ease-in-out border-l border-gray-200 md:w-[474px] ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ maxHeight: '1080px' }}
      >
        <div className='flex h-full flex-col p-4'>
          <div className='flex items-center justify-between mt-6 ml-6 pb-4'>
            <h2 className='text-2xl font-bold'>내 사람 추가</h2>
            <button onClick={onClose} className='rounded-full p-1 hover:bg-gray-100'>
              <X size={24} />
            </button>
          </div>

          <div className='flex-1 py-4'>{children}</div>
        </div>
      </div>
    </div>
  );
};


export default SideSheet