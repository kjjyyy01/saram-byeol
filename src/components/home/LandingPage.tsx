'use client';
import useWheel from '@/hooks/useWheel';
import { useCallback } from 'react';

const LandingPage = () => {
  //deltaY는 휠이 이동한 방향 중 y축 방향으로의 벡터값 / scrollTop은 현재 휠이 스크롤 된 영역에서 최 상단의 좌표값
  //scrolltop으로 현재 어느 영역에 위치하고 있는지 알아내고, deltaY로 어느 섹션으로 이동할건지 알아내고, ref.scrollTop을 이용해서 특정 섹션으로 이동한다.
  const wheelHandler = useCallback(
    (ref: React.RefObject<HTMLDivElement>, deltaY: number, scrollTop: number | undefined) => {
      const pageHeight = window.innerHeight;

      //deltaY가 양수면 스크롤(휠)을 내리고
      if (deltaY > 0) {
        if (scrollTop !== undefined) {
          const dest = Math.floor(scrollTop / pageHeight) + 1;
          ref.current?.scrollTo({
            top: pageHeight * dest,
            left: 0,
            behavior: 'smooth',
          });
        }
      } else {
        //deltaY가 양수인 경우 스크롤(휠)이 위로
        if (scrollTop !== undefined) {
          const dest = Math.floor(scrollTop / pageHeight) - 1;
          ref.current?.scrollTo({
            top: pageHeight * dest,
            left: 0,
            behavior: 'smooth',
          });
        }
      }
    },
    []
  );

  const containerRef = useWheel({ callback: wheelHandler });

  return (
    <div className='h-screen overflow-y-auto' ref={containerRef}>
      <div className='flex h-screen items-center justify-center bg-yellow-200 text-4xl'>1</div>
      <div className='flex h-screen items-center justify-center bg-blue-200 text-4xl'>2</div>
      <div className='flex h-screen items-center justify-center bg-green-200 text-4xl'>3</div>
    </div>
  );
};

export default LandingPage;
//https://codingbroker.tistory.com/128
// https://velog.io/@igun0423/Emotion.js%EB%A1%9C-%ED%92%80%ED%8E%98%EC%9D%B4%EC%A7%80-%EC%8A%A4%ED%81%AC%EB%A1%A4-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0-feat.-%EB%94%94%EB%B0%94%EC%9A%B4%EC%8A%A4
