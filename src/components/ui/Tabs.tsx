'use client';

import React, { useState } from 'react';

interface TabProps {
  tabs: string[];
  children: React.ReactNode[];
}

const Tabs: React.FC<TabProps> = ({ tabs, children }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div>
      <div className='flex space-x-4 border-b px-4'>
        {tabs.map((tab, index) => (
          <button
            key={tab}
            onClick={() => setActiveIndex(index)}
            className={`px-4 py-2 font-medium ${
              index === activeIndex ? 'border-b-2 border-black text-black' : 'text-gray-500'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className='p-4'>{children[activeIndex]}</div>
    </div>
  );
};

export default Tabs;
