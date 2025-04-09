import { z } from "zod";

// Form Schema Definition
export const contactFormSchema = z.object({
  profileImage: z.string().optional(),
  relationshipType: z.string().optional(),
  name: z.string().min(1, { message: '이름을 입력해주세요.' }),
  bio: z.string().min(5, { message: '최소 5자 이상 입력해주세요.' }).optional().or(z.literal('')),
  phone: z
    .string()
    .refine((val) => val === '' || (/^[0-9]*$/.test(val) && (val.length === 10 || val.length === 11)), {
      message: '숫자만 입력해주세요.',
    })
    .optional(),
  email: z.string().email({ message: '유효한 이메일 주소를 입력해주세요.' }).optional().or(z.literal('')),
  birthday: z.string().optional(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export const defaultContactFormValues: ContactFormValues = {
  profileImage: '',
  relationshipType: '친구',
  name: '',
  bio: '',
  phone: '',
  email: '',
  birthday: '',
};