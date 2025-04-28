import Image from 'next/image';
import SectionThreeEmail from './SectionThreeEmail';
import Link from 'next/link';

const SectionThree = () => {
  return (
    <div className='flex h-screen scroll-mt-28 flex-col items-center justify-between pt-24'>
      <div className='flex h-full flex-col items-center justify-center p-6'>
        <div className='flex flex-col items-center justify-center'>
          <h2 className='mb-4 text-center text-[40px] font-bold leading-snug'>
            사람별과 함께 관계의 가치를 새롭게 경험해보세요.
          </h2>
          <span className='mb-12 text-2xl font-medium'>추가기능이 나올 때 마다 이메일로 보내드릴게요.</span>
          <SectionThreeEmail />
        </div>{' '}
      </div>
      <footer className='flex w-full flex-col items-center justify-between gap-12 bg-grey-50 px-6 pb-16 pt-8 text-center'>
        <div className='flex flex-row items-center gap-16'>
          <div className='flex flex-row items-center gap-5'>
            <Image src={'/nav/app-logo-greyscale.png'} alt={'app logo greyscale'} width={50} height={47} />
            <div className='font-gmarket text-2xl font-bold'>사람,별</div>
          </div>
          <div className='flex flex-row gap-9 text-base font-normal text-grey-200 transition-all duration-500'>
            <Link
              href='#'
              className='cursor-pointer hover:font-semibold hover:text-grey-500'
              aria-label='개인정보처리방침'
            >
              개인정보처리방침
            </Link>
            <Link href='#' className='cursor-pointer hover:font-semibold hover:text-grey-500' aria-label='사람,별 공지'>
              사람,별 공지
            </Link>
            <Link href='#' className='cursor-pointer hover:font-semibold hover:text-grey-500' aria-label='고객 문의'>
              고객 문의
            </Link>
            <Link href='#' className='cursor-pointer hover:font-semibold hover:text-grey-500' aria-label='구독 문의'>
              구독 문의
            </Link>
          </div>
        </div>
        <div className='flex flex-col gap-2 text-sm text-grey-100'>
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
