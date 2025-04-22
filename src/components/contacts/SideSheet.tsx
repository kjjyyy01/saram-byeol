import { X } from '@phosphor-icons/react';
import React, { ReactNode, useEffect } from 'react';

interface SideSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string; 
}

const SideSheet = ({
  isOpen,
  onClose,
  children,
  title = "내 사람 추가",
}: SideSheetProps) => {
  // 스크롤 방지
  useEffect(() => {
    document.body.classList.toggle('overflow-hidden', isOpen);
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isOpen]);

  return (
    <div
      className={`
        fixed right-0 top-0 z-50 h-screen w-full transform
        bg-white shadow-lg transition-all duration-300 ease-in-out border-l border-gray-200
        md:w-[474px]
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}
      style={{
        transitionProperty: 'transform, box-shadow',
        boxShadow: isOpen ? '-4px 0 16px rgba(0, 0, 0, 0.1)' : 'none',
      }}
    >
      <div className="flex h-full flex-col">
        {/* 1) 고정된 타이틀 영역 */}
        <div className="flex items-center justify-between p-4 border-gray-200">
          <h2 className="text-2xl font-bold">{title}</h2>
          <button
            onClick={onClose}
            className="rounded-full p-1 hover:bg-gray-100 transition-colors duration-200"
          >
            <X size={24} />
          </button>
        </div>

        {/* 2) 스크롤이 필요한 children만 이 영역에! */}
        <div
          className="flex-1 overflow-y-scroll p-4"
          style={{ scrollbarGutter: 'stable' }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default SideSheet;
