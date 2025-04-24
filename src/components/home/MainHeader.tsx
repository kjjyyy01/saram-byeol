import React from 'react';

const MainHeader = () => {
  return (
    <div className='fixed box-border flex h-28 w-full items-center justify-center'>
      <div className='container flex flex-row items-center justify-between px-6'>
        <div>로고</div>
        <div className='flex flex-row items-center justify-center'>
          <div>사람별이란?</div>
          <div>기능소개</div>
          <div>구독</div>
        </div>
        <div className='flex flex-row items-center justify-center'>
          <div>로그인</div>
          <div>지금 무료로 시작하기</div>
        </div>
      </div>
    </div>
  );
};

export default MainHeader;
