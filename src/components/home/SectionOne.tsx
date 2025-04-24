const SectionOne = () => {
  return (
    <div className='flex h-screen items-center justify-center p-6'>
      <div className='flex max-h-[720px] w-[1280px] flex-col items-center justify-between gap-6 md:flex-row'>
        <div className='flex h-full w-full items-center justify-center bg-red-400'>좌 </div>
        <div className='flex h-full w-full items-center justify-center bg-blue-300'>우</div>
      </div>
    </div>
  );
};

export default SectionOne;
