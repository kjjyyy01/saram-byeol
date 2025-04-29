import Image from 'next/image';

const SectionOne = () => {
  return (
    <div className='flex h-screen scroll-mt-28 items-center justify-center p-6'>
      <div className='flex max-h-[720px] w-[1280px] flex-col items-center justify-between gap-6 md:flex-row'>
        <div className='flex h-full w-full items-center justify-center'>
          <Image src={'/home/landing-mockup.png'} alt={'메인랜딩'} width={580} style={{ height: 'auto' }} />
        </div>
        <div className='flex h-full w-full flex-col justify-center gap-12'>
          <h2 className='font-gmarket text-[40px] font-bold leading-snug'>
            내 사람과 약속을 <br />
            쉽게 관리하는 서비스
          </h2>
          <div className='flex flex-col'>
            <p className='text-2xl font-medium'>
              사람별은 소중한 사람들과의 관계를 더 깊고
              <br /> 전문적으로 관리할 수 있는 퍼스널 스케줄 서비스입니다.
            </p>
            <br />
            <p className='text-2xl font-medium'>
              내 사람들을 저장하고, 약속을 기록하며,
              <br /> 함께한 추억을 앨범으로 한눈에 확인하세요.
            </p>
            <br />
            <p className='text-2xl font-medium'>
              사람별과 함께라면 당신의 인맥과 약속이
              <br />한 곳에서 자연스럽게 이어집니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionOne;
