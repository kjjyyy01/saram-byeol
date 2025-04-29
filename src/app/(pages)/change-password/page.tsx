'use client';

import { changePassword } from '@/app/api/supabase/service';
import { SIGNIN } from '@/constants/paths';
import { PLACEHOLDER_PASSWORD, PLACEHOLDER_PASSWORD_CHECK } from '@/constants/placeholders';
import { changePasswordSchema } from '@/lib/schemas/changePasswordSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export interface ChangePasswordType {
  password: string;
  passwordCheck: string;
}

const ChangePassword = () => {
  const { register, handleSubmit, formState, getValues } = useForm<ChangePasswordType>({
    mode: 'onChange',
    resolver: zodResolver(changePasswordSchema),
  });
  const router = useRouter();

  const changePasswordHandler = async () => {
    const newPassword = getValues('passwordCheck');

    const data = await changePassword(newPassword);
    if (data.user) {
      toast.success('비밀번호를 재설정했습니다.');
      router.replace(SIGNIN);
    }
  };
  return (
    <div className='flex h-screen w-screen'>
      <section className='flex w-full flex-col items-center justify-center gap-10'>
        <h1 className='text-center text-[28px] font-bold text-primary-500'>비밀번호 재설정</h1>
        <form onSubmit={handleSubmit(changePasswordHandler)} className='flex flex-col items-center justify-center'>
          <div className='mx-auto w-full max-w-[375px] px-5 md:max-w-full md:px-0'>
            <div className='mb-8 flex flex-col gap-1'>
              <div className='flex flex-col justify-start gap-1'>
                <label
                  className={`self-stretch text-sm font-bold leading-[150%] ${formState.errors.password ? `text-status-error` : `text-grey-900`}`}
                >
                  새로운 비밀번호
                </label>
                <input
                  className={`w-full flex-1 items-center gap-2 self-stretch rounded-lg border p-4 placeholder-grey-100 ${formState.errors.password ? `border-status-error focus:outline-none` : `border-grey-200`}`}
                  type='password'
                  id='password'
                  placeholder={PLACEHOLDER_PASSWORD}
                  {...register('password')}
                />
              </div>
              {formState.errors.password ? (
                <span className='mt-1 self-stretch text-sm leading-[150%] text-status-error'>
                  {formState.errors.password.message}
                </span>
              ) : (
                <span className='mt-1 self-stretch text-xs font-normal not-italic leading-[150%] text-grey-100 md:text-base'>
                  특수문자(!@#$%^&*)를 1개 이상 포함하여 입력해주세요.
                </span>
              )}
            </div>

            <div className='mb-10 flex flex-col gap-1'>
              <div className='flex flex-col justify-start gap-1'>
                <label
                  className={`self-stretch text-sm font-bold leading-[150%] ${formState.errors.passwordCheck ? `text-status-error` : `text-grey-900`}`}
                >
                  새로운 비밀번호 확인
                </label>
                <input
                  className={`w-full flex-1 items-center gap-2 self-stretch rounded-lg border p-4 placeholder-grey-100 ${formState.errors.passwordCheck ? `border-status-error focus:outline-none` : `border-grey-200`}`}
                  type='password'
                  id='passwordCheck'
                  placeholder={PLACEHOLDER_PASSWORD_CHECK}
                  {...register('passwordCheck')}
                />
              </div>
              {formState.errors.passwordCheck ? (
                <span className='mt-1 self-stretch text-sm leading-[150%] text-status-error'>
                  {formState.errors.passwordCheck.message}
                </span>
              ) : (
                <span className='mt-1 self-stretch text-xs font-normal not-italic leading-[150%] text-grey-100 md:text-base'>
                  비밀번호를 한번 더 입력해주세요.
                </span>
              )}
            </div>
            <button
              type='submit'
              className='duration-600 mx-auto w-full rounded-lg bg-primary-500 px-6 py-4 font-bold leading-[135%] text-white transition hover:bg-primary-600 active:bg-primary-700 md:h-[54px] md:w-[456px]'
            >
              확인
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

export default ChangePassword;
