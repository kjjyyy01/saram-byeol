'use client';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { toast } from 'react-toastify';

const SectionThreeEmail = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error('이메일을 입력해주세요.');
      return;
    }
    setEmail('');
    toast.info('구독 신청이 완료되었습니다. 감사합니다:)');
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className='flex flex-row gap-6'>
        <Input
          placeholder='이메일을 입력해주세요.'
          className='box-border h-14 w-[324px] p-4'
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button className='h-14 bg-primary-500 px-6 py-4 hover:bg-primary-600 active:bg-primary-700' type='submit'>
          구독하기
        </Button>
      </form>
    </div>
  );
};

export default SectionThreeEmail;
