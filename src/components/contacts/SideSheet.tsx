import { X } from '@phosphor-icons/react';
import React, { ReactNode, useEffect } from 'react';

interface SideSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string; 
}

const SideSheet = ({ isOpen, onClose, children, title = "내 사람 추가" }: SideSheetProps) => {
  // 사이드시트가 열릴 때 body에 클래스 추가하여 스크롤 방지
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isOpen]);

  return (
    <div
    className={`fixed right-0 top-0 z-50 h-screen w-full transform bg-white shadow-lg transition-all duration-300 ease-in-out border-l border-gray-200 md:w-[474px] ${
      isOpen ? 'translate-x-0' : 'translate-x-full'
    }`}
    style={{
      transitionProperty: 'transform, box-shadow',
      boxShadow: isOpen ? '-4px 0 16px rgba(0, 0, 0, 0.1)' : 'none'
    }}
  >
    <div className='flex h-full flex-col p-4'>
      {/* 스크롤 영역 - 타이틀과 버튼 포함 */}
      <div 
        className='flex-1 overflow-y-auto py-4'
        style={{ scrollbarGutter: 'stable' }}
      >
        {/* 타이틀과 버튼도 스크롤 영역 안으로 - 서서히 나타나는 효과 추가 */}
        <div 
          className={`flex items-center justify-between mt-2 ml-2 mb-6 transition-opacity duration-500 ${
            isOpen ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <h2 className='text-2xl font-bold'>{title}</h2>
          <button 
            onClick={onClose} 
            className='rounded-full p-1 hover:bg-gray-100 transition-colors duration-200'
          >
            <X size={24} />
          </button>
        </div>

        {/* 내용이 약간 딜레이되며 페이드인 되도록 설정 */}
        <div 
          className={`transition-opacity duration-500 delay-100 ${
            isOpen ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  </div>
  );
};

export default SideSheet;