import { z } from 'zod';

//회원가입 유효성검사 스키마
export const signUpSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: '이메일을 입력해주세요.' })
      .email({ message: '올바른 이메일 형식을 입력해주세요.' }),

    password: z
      .string()
      .min(1, { message: '비밀번호를 입력해주세요.' })
      .regex(/[!@#$%^&*]/, {
        message: '하나 이상의 특수문자가 포함되어야 합니다.',
      })
      .min(8, { message: '8자 이상으로 입력해주세요.' }),

    passwordCheck: z.string().min(1, { message: '비밀번호를 다시 입력해주세요.' }),

    nickname: z
      .string()
      .min(1, { message: '닉네임을 입력해주세요.' })
      .min(2, { message: '2자 이상으로 입력해주세요.' })
      .regex(/^[A-Za-z0-9가-힣]+$/, {
        message: '특수문자를 사용할 수 없습니다.',
      }),
  })
  .refine((data) => data.password === data.passwordCheck, {
    path: ['passwordCheck'],
    message: '비밀번호가 일치하지 않습니다.',
  });
