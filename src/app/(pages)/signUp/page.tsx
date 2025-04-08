'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/zustand/store';
import { mutateSignUp, NicknameDuplicateTest } from '@/app/api/supabase/service';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { PLACEHOLDER_EMAIL, PLACEHOLDER_NICKNAME, PLACEHOLDER_PASSWORD } from '@/constants/placeholders';
import { PEOPLE } from '@/constants/paths';

export interface SignUpFormType {
  email: string;
  password: string;
  nickname: string;
}

const signUpSchema = z.object({
  email: z.string().email({ message: '올바른 이메일 형식을 입력해주세요.' }),
  password: z
    .string()
    .regex(/[!@#$%^&*(),.?":{}|<>]/, {
      message: '하나 이상의 특수문자가 포함되어야 합니다.',
    })
    .min(8, { message: '8자 이상으로 입력해주세요.' }),
  nickname: z
    .string()
    .min(2, { message: '2자 이상으로 입력해주세요.' })
    .regex(/^[A-Za-z0-9가-힣\s]+$/, {
      message: '띄어쓰기를 제외한 특수문자를 사용할 수 없습니다.',
    })
    .max(7, { message: '띄어쓰기 포함 8자 이하로 입력해주세요.' }),
});

const SignUp = () => {
  const { register, handleSubmit, getValues, formState } = useForm<SignUpFormType>({
    mode: 'onChange',
    resolver: zodResolver(signUpSchema),
  });
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const onSignUpHandler = async (value: SignUpFormType) => {
    const user = await mutateSignUp(value);

    setUser(user);
    alert(`회원가입이 완료되었습니다. 자동으로 로그인되어 '내 사람' 페이지로 이동합니다.`);
    router.push(PEOPLE);
  };

  const NicknameDuplicateTestHandler = async () => {
    const nickname = getValues('nickname');
    const data = await NicknameDuplicateTest(nickname);

    if (data) {
      alert('중복된 닉네임이 존재합니다.');
    } else if (formState.errors.nickname) {
      alert('닉네임 형식을 확인해주세요.');
    } else {
      alert('사용가능한 닉네임입니다.');
    }
  };

  const EmailDuplicateTestHandler = async () => {
    const email = getValues('email');
    const data = await NicknameDuplicateTest(email);

    if (data) {
      alert('중복된 이메일이 존재합니다.');
    } else if (formState.errors.email) {
      alert('이메일 형식을 확인해주세요.');
    } else {
      alert('사용가능한 이메일입니다.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSignUpHandler)}>
      <div>
        <label htmlFor='nickname'>닉네임</label>
        <input type='text' id='nickname' maxLength={8} placeholder={PLACEHOLDER_NICKNAME} {...register('nickname')} />
        <button type='button' onClick={NicknameDuplicateTestHandler}>
          중복 검사
        </button>
        {formState.errors.nickname && <span>{formState.errors.nickname.message as string}</span>}
      </div>

      <div>
        <label htmlFor='email'>이메일</label>
        <input type='email' id='email' placeholder={PLACEHOLDER_EMAIL} {...register('email')} />
        <button type='button' onClick={EmailDuplicateTestHandler}>
          중복 검사
        </button>
        {formState.errors.email && <span>{formState.errors.email.message as string}</span>}
      </div>

      <div>
        <label htmlFor='password'>비밀번호</label>
        <input type='password' id='password' placeholder={PLACEHOLDER_PASSWORD} {...register('password')} />
        {formState.errors.password && <span>{formState.errors.password.message as string}</span>}
      </div>

      <button type='submit'>회원가입</button>
    </form>
  );
};

export default SignUp;
