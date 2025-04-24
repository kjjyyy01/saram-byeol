import { useEffect, useRef } from 'react';

interface CallbackFunction {
  callback: (ref: React.RefObject<HTMLDivElement>, deltaY: number, scrollTop: number | undefined) => void;
}

//콜백함수를 인자로 받아 ref 객체를 반환하는 커스텀 훅
const useWheel = ({ callback }: CallbackFunction): React.RefObject<HTMLDivElement> => {
  const ref = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<number | null>(null); //리렌더링 안되는 스테이트...

  //휠 이벤트를 받아서 콜백함수에 ref와 휠의 deltaY와 scrollTop를 인자로 넣어준다.
  const handleMouseWheel = (event: WheelEvent) => {
    event.preventDefault();
    if (!timeoutRef.current) { //타이머가 없으면 콜백을 실행하고 타이머를 다시 세팅 
      callback(ref, event.deltaY, ref.current?.scrollTop);
      timeoutRef.current = window.setTimeout(() => {
        timeoutRef.current = null;
      }, 500); //500이 지난 후에 타이머를 리셋
    }
  };

  //현재 ref에 휠 이벤트 리스너를 적용, 언마운트 시 이벤트 리스너 삭제
  useEffect(() => {
    const currentRef = ref.current;
    if (currentRef) {
      //currentRef가 가리는 요소에 휠 이벤트가 들어오면 handleMouseWheel이 실행되도록
      currentRef.addEventListener('wheel', handleMouseWheel);
    }
    return () => {
      if (currentRef) {
        currentRef.removeEventListener('wheel', handleMouseWheel);
      }
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, [ref, callback]);

  return ref;
};
export default useWheel;

