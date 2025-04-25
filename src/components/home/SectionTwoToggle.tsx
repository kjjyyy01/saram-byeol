'use client';

import Image from 'next/image';
import { useState } from 'react';

const SectionTwoToggle = () => {
  const [checked, setChecked] = useState(true);

  const toggleCheckHandler = () => {
    setChecked((prev) => !prev);
  };
  return (
    <>
      <div className='flex items-center justify-center'>
        <div className='flex flex-row gap-2 rounded-full bg-primary-50 px-6 py-4 transition-all duration-500 ease-in-out'>
          <button
            className={`rounded-full px-6 py-4 text-2xl font-bold ${checked === true ? 'bg-primary-400 text-grey-0' : ''} `}
            onClick={toggleCheckHandler}
          >
            내사람
          </button>
          <button
            className={`rounded-full px-6 py-4 text-2xl font-bold ${checked === false ? 'bg-primary-400 text-grey-0' : ''}`}
            onClick={toggleCheckHandler}
          >
            캘린더
          </button>
        </div>
      </div>

      <div className='relative h-[560px] w-[960px] overflow-hidden'>
        <div
          className='flex w-screen flex-row items-center justify-between transition-transform duration-500 ease-in-out'
          style={{ transform: `translateX(${checked ? '0%' : '-100%'})`, width: '100%' }}
        >
          <Image src={'/home/landing-people.png'} width={960} height={540} alt='calendar Image' />
          <Image src={'/home/landing-calendar.png'} width={960} height={540} alt='calendar Image' />
        </div>
      </div>

      <div className='transition-all duration-500'>
        <div className={`text-center text-2xl font-medium ${checked === true ? 'block' : 'hidden'}`}>
          <p>연락처 기반으로 사람을 추가해서 내 사람들과의 인맥을 관리할 수 있습니다.</p>
          <p>등록한 인맥과의 약속을 모아볼 수도 있고 관련된 앨범(준비 중)도 볼 수 있습니다.</p>
        </div>
        <div className={`text-center text-2xl font-medium ${checked === false ? 'block' : 'hidden'}`}>
          <p>내 사람들과의 약속을 캘린더에서 확인 할 수 있습니다.</p>
          <p>까먹지 않게 다가오는 약속도 챙겨줍니다.</p>
        </div>
      </div>
    </>
  );
};

export default SectionTwoToggle;
