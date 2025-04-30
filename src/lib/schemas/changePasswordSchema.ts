import { z } from 'zod';

export const changePasswordSchema = z
  .object({
    password: z
      .string()
      .min(1, { message: '비밀번호를 입력해주세요.' })
      .regex(/[!@#$%^&*]/, {
        message: '하나 이상의 특수문자가 포함되어야 합니다.',
      })
      .min(8, { message: '8자 이상으로 입력해주세요.' }),

    passwordCheck: z.string().min(1, { message: '비밀번호를 다시 입력해주세요.' }),
  })
  .refine((data) => data.password === data.passwordCheck, {
    path: ['passwordCheck'],
    message: '비밀번호가 일치하지 않습니다.',
  });
