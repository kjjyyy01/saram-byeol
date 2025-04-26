import SectionTwoToggle from './SectionTwoToggle';

const SectionTwo = () => {
  return (
    <div className='flex h-screen scroll-mt-28 items-center justify-center bg-zinc-50 p-6 pt-24'>
      <div className='flex flex-col items-center justify-center gap-10'>
        <SectionTwoToggle />
      </div>
    </div>
  );
};

export default SectionTwo;
