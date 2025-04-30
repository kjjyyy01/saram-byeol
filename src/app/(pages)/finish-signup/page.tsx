'use client';

import { PEOPLE } from '@/constants/paths';
import { useRouter } from 'next/navigation';

const FinishSignup = () => {
  const router = useRouter();

  const replacePeople = () => {
    router.replace(PEOPLE);
  };

  return (
    <div className='flex h-screen w-screen flex-col items-center justify-center gap-8'>
      <h1 className='text-[28px] font-bold text-primary-500'>회원가입 완료</h1>
      <p className='text-xl font-bold'>회원가입이 성공적으로 완료되었습니다. 지금 사람, 별로 이동해보세요!</p>
      <button
        type='button'
        onClick={replacePeople}
        className='duration-600 mx-auto w-full rounded-lg bg-primary-500 px-6 py-4 font-bold leading-[135%] text-white transition hover:bg-primary-600 active:bg-primary-700 md:w-[456px]'
      >
        사람, 별로 이동
      </button>
    </div>
  );
};

export default FinishSignup;
