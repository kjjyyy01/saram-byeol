import Image from 'next/image';

const SectionTwo = () => {
  return (
    <div className='flex h-screen items-center justify-center bg-zinc-50 p-6 pt-24 scroll-mt-28'>
      <div className='flex flex-col items-center justify-center gap-10'>
        <div className='flex items-center justify-center'>
          <div className='flex flex-row gap-8 rounded-full bg-primary-50 px-6 py-4'>
            <button className='rounded-full bg-primary-400 px-6 py-4 text-2xl font-bold'>내사람</button>
            <button className='rounded-full bg-primary-400 px-6 py-4 text-2xl font-bold'>캘린더</button>
          </div>
        </div>
        <div>
          <Image src={'/home/landing-people.png'} width={960} height={540} alt='calendar Image' />
        </div>
        <div>
          <p>
            연락처 기반으로 사람을 추가해서 내 사람들과의 인맥을 관리할 수 있습니다. 등록한 인맥과의 약속을 모아볼 수도
            있고 관련된 앨범(준비 중)도 볼 수 있습니다.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SectionTwo;
