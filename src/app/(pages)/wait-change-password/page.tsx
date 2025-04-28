const WaitChangePassword = () => {
  return (
    <div className='flex h-screen w-screen flex-col items-center justify-center gap-8'>
      <h1 className='text-[28px] font-bold text-primary-500'>비밀번호 재설정</h1>
      <p className='text-xl font-bold'>입력하신 이메일로 발송된 메일을 확인하고 비밀번호 재설정을 완료해 주세요.</p>
    </div>
  );
};

export default WaitChangePassword;
