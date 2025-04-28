'use client';

import { sendPasswordResetEmail } from '@/app/api/supabase/service';
import { WAIT_CHANGE_PASSWORD } from '@/constants/paths';
import { PLACEHOLDER_EMAIL } from '@/constants/placeholders';
import { sendEmailSchema } from '@/lib/schemas/sendEmailSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export interface sendEmailType {
  email: string;
}

const ForgotPassword = () => {
  const { register, handleSubmit, formState, getValues } = useForm<sendEmailType>({
    mode: 'onChange',
    resolver: zodResolver(sendEmailSchema),
  });
  const router = useRouter();

  const sendEmailHandler = async () => {
    const email = getValues('email');

    const data = await sendPasswordResetEmail(email);
    if (data) {
      toast.success('이메일이 전송되었습니다. 이메일을 확인해주세요');
      router.replace(WAIT_CHANGE_PASSWORD);
    }
  };

  return (
    <div className='flex h-screen w-screen'>
      <section className='flex w-full flex-col items-center justify-center gap-10'>
        <h1 className='text-center text-[28px] font-bold text-primary-500'>비밀번호 재설정</h1>
        <form onSubmit={handleSubmit(sendEmailHandler)}>
          <div className='mx-auto w-full max-w-[375px] px-5 md:max-w-full md:px-0'>
            <div className='mb-10 flex flex-col gap-1'>
              <div className='flex flex-col justify-start gap-1'>
                <label
                  htmlFor='email'
                  className={`self-stretch text-sm font-bold leading-[150%] ${formState.errors.email ? `text-status-error` : `text-grey-900`}`}
                >
                  이메일
                </label>
                <input
                  type='email'
                  id='email'
                  placeholder={PLACEHOLDER_EMAIL}
                  {...register('email')}
                  className={`w-full flex-1 items-center gap-2 self-stretch rounded-lg border p-4 placeholder-grey-100 ${formState.errors.email ? `border-status-error focus:outline-none` : `border-grey-200`}`}
                />
              </div>
              {formState.errors.email ? (
                <span className='mt-1 self-stretch text-sm leading-[150%] text-status-error'>
                  {formState.errors.email.message}
                </span>
              ) : (
                <span className='mt-1 self-stretch text-xs font-normal not-italic leading-[150%] text-grey-100 md:text-base'>
                  이메일 형식에 맞게 입력해주세요.
                </span>
              )}
            </div>
            <button
              type='submit'
              className='duration-600 mx-auto w-full rounded-lg bg-primary-500 px-6 py-4 font-bold leading-[135%] text-white transition hover:bg-primary-600 active:bg-primary-700 md:h-[54px] md:w-[456px]'
            >
              인증메일 보내기
            </button>
          </div>
        </form>
      </section>

      <section className='hidden md:flex md:h-full md:w-full md:items-center md:justify-center lg:flex'>
        <Image
          src={'/saram-byeol_img.avif'}
          alt='metaphor image'
          width={950}
          height={1080}
          className='mx-auto object-contain'
        />
      </section>
    </div>
  );
};

export default ForgotPassword;
