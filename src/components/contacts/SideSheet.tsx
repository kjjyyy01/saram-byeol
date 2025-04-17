import { X } from '@phosphor-icons/react';
import React, { ReactNode, useEffect } from 'react';

interface SideSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string; // 이미 만들어두신 SideSheet 활용하기 위해 타이틀을 동적(내 사람 추가, 내 사람 수정)으로 수정했습니다
                  // 추후 해당 사이드시트 다른 곳에서도 사용하게 될 시 용이할 것 같습니다
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
            {/* 사이드시트 타이틀 */}
            <h2 className='text-2xl font-bold'>{title}</h2>
            <button onClick={onClose} className='rounded-full p-1 hover:bg-gray-100'>
              <X size={24} />
            </button>
          </div>

          {/* 스크롤 영역 - 항상 스크롤바 공간 확보 */}
          <div 
            className='flex-1 py-4 overflow-y-auto'
            style={{ scrollbarGutter: 'stable' }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideSheet;