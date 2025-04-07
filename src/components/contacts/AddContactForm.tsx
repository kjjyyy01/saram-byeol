import React from 'react'
import { useForm } from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';


// Form Schema Definition
const formSchema = z.object({
  name: z.string().min(1, {message: '이름을 입력해주세요.'}),
  bio: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email({ message: '유효한 이메일 주소를 입력해주세요.'}).optional().or(z.literal('')),
  birthday: z.string().optional(),
});

type ContactFormValues = z.infer<typeof formSchema>;

const AddContactForm: React.FC = () => {
  // 폼 초기화
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      bio: '',
      phone: '',
      email: '',
      birthday: '',
    }
  });

  // 폼 제출 함수
  const onSubmit = (data: ContactFormValues) => {
    console.log('연락처 추가:', data);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* 이름 필드 */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <div className="flex flex-col space-y-2">
              <div className="flex items-center">
                <FormLabel className="w-1/4 text-right pr-4">이름</FormLabel>
                <FormControl className="flex-1">
                  <Input placeholder="이름을 입력해주세요" {...field} />
                </FormControl>
              </div>
              <FormMessage className="ml-[25%]" />
            </div>
          )}
        />

        {/* 한줄소개 필드 */}
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <div className="flex flex-col space-y-2">
              <div className="flex items-center">
                <FormLabel className="w-1/4 text-right pr-4">한줄소개</FormLabel>
                <FormControl className="flex-1">
                  <Input placeholder="이 사람을 한 마디로 표현한다면?" {...field} />
                </FormControl>
              </div>
              <FormMessage className="ml-[25%]" />
            </div>
          )}
        />

        {/* 전화번호 필드 */}
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <div className="flex flex-col space-y-2">
              <div className="flex items-center">
                <FormLabel className="w-1/4 text-right pr-4">전화번호</FormLabel>
                <FormControl className="flex-1">
                  <Input 
                    type="tel" 
                    placeholder="전화번호를 입력해주세요" 
                    {...field} 
                  />
                </FormControl>
              </div>
              <FormMessage className="ml-[25%]" />
            </div>
          )}
        />

        {/* 이메일 필드 */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <div className="flex flex-col space-y-2">
              <div className="flex items-center">
                <FormLabel className="w-1/4 text-right pr-4">이메일</FormLabel>
                <FormControl className="flex-1">
                  <Input 
                    type="email" 
                    placeholder="이메일을 입력해주세요" 
                    {...field} 
                  />
                </FormControl>
              </div>
              <FormMessage className="ml-[25%]" />
            </div>
          )}
        />

        {/* 생일 필드 */}
        <FormField
          control={form.control}
          name="birthday"
          render={({ field }) => (
            <div className="flex flex-col space-y-2">
              <div className="flex items-center">
                <FormLabel className="w-1/4 text-right pr-4">생일</FormLabel>
                <FormControl className="flex-1">
                  <Input 
                    type="date" 
                    {...field} 
                  />
                </FormControl>
              </div>
              <FormMessage className="ml-[25%]" />
            </div>
          )}
        />

        {/* 제출 버튼 */}
        <div className="flex justify-end pt-4">
          <Button type="submit">추가</Button>
        </div>
      </form>
    </Form>
  )
}

export default AddContactForm