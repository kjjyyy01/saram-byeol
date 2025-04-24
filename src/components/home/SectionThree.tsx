import Image from 'next/image';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

const SectionThree = () => {
  return (
    <div className='flex h-screen flex-col items-center justify-between pt-24'>
      <div className='flex h-full flex-col items-center justify-center p-6'>
        <div className='flex flex-col items-center justify-center'>
          <h2 className='mb-4 text-[40px] font-bold leading-snug'>사람별과 함께 관계의 가치를 새롭게 경험해보세요.</h2>
          <span className='mb-12'>추가기능이 나올 때 마다 이메일로 보내드릴게요.</span>
          <div className='flex flex-row gap-6'>
            <Input placeholder='이메일을 입력해주세요.' className='max-w-xs p-4' />
            <Button className='bg-primary-500 px-6 py-4 hover:bg-primary-600 active:bg-primary-700'>구독하기</Button>
          </div>
        </div>{' '}
      </div>
      <footer className='flex w-full flex-col items-center justify-between gap-20 bg-grey-50 px-6 py-16 text-center'>
        <div className='flex flex-row items-center gap-16 text-xl'>
          <div className='flex flex-row items-center gap-5'>
            <Image src={'/nav/app-logo-greyscale.png'} alt={'app logo greyscale'} width={50} height={47} />
            <div>사람,별</div>
          </div>
          <div className='flex flex-row gap-9 text-xl font-normal text-grey-200'>
            <p className='font-semibold text-grey-500'>개인정보처리방침</p>
            <p>사람,별 공지</p>
            <p>고객 문의</p>
            <p>구독 문의</p>
          </div>
        </div>
        <div className='flex flex-col gap-4 text-base text-grey-100'>
          <p>사람,별 사업자 정보</p>
          <p>대표자 : 김르탄 | 사업자 등록번호 : 123-45-67890 | 통신판매업 신고번호:2020-서울르탄-02300</p>
          <p>주소:서울특별시 강남구 테헤란로44길 8 12층 | 이메일:contact@sarambyeol.io | 전화:1522-8016</p>
          <p>Copyright ©2025 SARAMBYEOL. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default SectionThree;
