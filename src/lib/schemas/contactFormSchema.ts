import { z } from 'zod';

// Form Schema Definition
export const contactFormSchema = z.object({
  profileImage: z.string().nullable(),
  relationshipType: z.string().optional(),
  name: z.string()
    .min(1, { message: '이름을 입력해주세요.' })
    .max(13, { message: '이름은 최대 13자까지 입력 가능합니다.' }),
  memo: z.string().optional(),  // Optional로 변경
  phone: z
    .string()
    .optional()
    .refine((val) => !val || val.length === 0 || /^[0-9]+$/.test(val), {
      message: '숫자만 입력해주세요.',
    })
    .refine((val) => !val || val.length === 0 || val.length <= 11, {
      message: '전화번호는 11자리까지 입력 가능합니다.',
    })
    .refine((val) => !val || val.length === 0 || val.length >= 10, {
      message: '전화번호는 10자리 이상이어야 합니다.',
    }),
  email: z
    .string()
    .optional()
    .refine((val) => !val || val.length === 0 || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
      message: '유효한 이메일 주소를 입력해주세요.',
    }),
  birthday: z.string().optional(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export const defaultContactFormValues: ContactFormValues = {
  profileImage: '',
  relationshipType: '친구',
  name: '',
  memo: '',         // Optional 필드여도 초기값은 ''로 설정합니다
  phone: '',
  email: '',
  birthday: '',
};
