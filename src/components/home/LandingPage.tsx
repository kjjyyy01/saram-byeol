'use client';
import useWheel from '@/hooks/useWheel';
import { useCallback, useRef } from 'react';
import SectionOne from '@/components/home/SectionOne';
import SectionTwo from '@/components/home/SectionTwo';
import SectionThree from '@/components/home/SectionThree';
import MainHeader from './MainHeader';

const LandingPage = () => {
  //deltaY는 휠이 이동한 방향 중 y축 방향으로의 벡터값 / scrollTop은 현재 휠이 스크롤 된 영역에서 최 상단의 좌표값
  //scrolltop으로 현재 어느 영역에 위치하고 있는지 알아내고, deltaY로 어느 섹션으로 이동할건지 알아내고, ref.scrollTop을 이용해서 특정 섹션으로 이동한다.
  const wheelHandler = useCallback(
    //계산하는 부분이니까 메모이제이션 시켜서 처리
    (ref: React.RefObject<HTMLDivElement>, deltaY: number, scrollTop: number | undefined) => {
      const pageHeight = window.innerHeight; //예: 1080px

      //첫번째 섹션이면 (scrolltop = 0 / pageHeight = 1080) + 1 = 소수점 내림해서 0+1 = dest
      //두번째 섹션이면 (scrollTop = 1080 / pageHeight = 1080) + 1 = 소수점 내림해서 1+1 = dest
      //deltaY가 양수면 스크롤(휠)을 내리고
      if (deltaY > 0) {
        if (scrollTop !== undefined) {
          const dest = Math.floor(scrollTop / pageHeight) + 1;
          ref.current?.scrollTo({
            // 실제 스크롤을 이동시키는 부분
            top: pageHeight * dest, // 예: 1080*dest
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
  const sectionRef = {
    about: useRef<HTMLDivElement>(null),
    function: useRef<HTMLDivElement>(null),
    subscription: useRef<HTMLDivElement>(null),
  };

  const scrollToSection = (key: keyof typeof sectionRef) => {
    sectionRef[key].current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <MainHeader onNavClick={scrollToSection} />
      <div className='h-screen overflow-y-hidden' ref={containerRef}>
        <div ref={sectionRef.about}>
          <SectionOne />
        </div>
        <div ref={sectionRef.function}>
          <SectionTwo />
        </div>
        <div ref={sectionRef.subscription}>
          <SectionThree />
        </div>
      </div>
    </>
  );
};

export default LandingPage;
//https://codingbroker.tistory.com/128
// https://velog.io/@igun0423/Emotion.js%EB%A1%9C-%ED%92%80%ED%8E%98%EC%9D%B4%EC%A7%80-%EC%8A%A4%ED%81%AC%EB%A1%A4-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0-feat.-%EB%94%94%EB%B0%94%EC%9A%B4%EC%8A%A4
