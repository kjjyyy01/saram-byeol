import { useEffect, useRef } from 'react';

interface CallbackFunction {
  callback: (ref: React.RefObject<HTMLDivElement>, deltaY: number, scrollTop: number | undefined) => void;
}

//콜백함수를 인자로 받아 ref 객체를 반환하는 커스텀 훅
const useWheel = ({ callback }: CallbackFunction): React.RefObject<HTMLDivElement> => {
  const ref = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<number | null>(null);

  //휠 이벤트를 받아서 콜백함수에 ref와 휠의 deltaY와 scrollTop를 인자로 넣어준다.
  const handleMouseWheel = (event: WheelEvent) => {
    event.preventDefault();
    if (!timeoutRef.current) {
      callback(ref, event.deltaY, ref.current?.scrollTop);
      timeoutRef.current = window.setTimeout(() => {
        timeoutRef.current = null;
      }, 500);
    }
  };

  //현재 ref에 휠 이벤트 리스너를 적용, 언마운트 시 이벤트 리스너 삭제
  useEffect(() => {
    const currentRef = ref.current;
    if (currentRef) {
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

