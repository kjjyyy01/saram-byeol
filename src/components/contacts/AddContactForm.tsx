import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Camera } from 'lucide-react';
import Image from 'next/image';

// Form Schema Definition
const formSchema = z.object({
  profileImage: z.string().optional(),
  relationshipType: z.string().optional(),
  name: z.string().min(1, { message: '이름을 입력해주세요.' }),
  bio: z.string().min(5, { message: '최소 5자 이상 입력해주세요.' }).optional().or(z.literal('')),
  phone: z.string().refine(val => val === '' || (/^[0-9]*$/.test(val) && (val.length === 10 || val.length === 11)), { 
    message: '숫자만 입력해주세요.' 
  }).optional(),
  email: z.string().email({ message: '유효한 이메일 주소를 입력해주세요.' }).optional().or(z.literal('')),
  birthday: z.string().optional(),
});

type ContactFormValues = z.infer<typeof formSchema>;

const AddContactForm: React.FC = () => {
  const [imageSource, setImageSource] = useState<string | null>(null);
  const [relationshipType, setRelationshipType] = useState('친구');

  // 폼 초기화
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      profileImage: '',
      relationshipType: '친구',
      name: '',
      bio: '',
      phone: '',
      email: '',
      birthday: '',
    },
    mode: 'all', // 모든 이벤트(onChange, onBlur, onSubmit)에서 유효성 검사를 실행
  });

  // 파일 선택 처리 함수
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSource(e.target?.result as string);
        form.setValue('profileImage', e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // 관계 유형 변경 처리
  const handleRelationshipChange = (value: string) => {
    setRelationshipType(value);
    form.setValue('relationshipType', value);
  };

  // 폼 제출 함수
  const onSubmit = (data: ContactFormValues) => {
    console.log('연락처 추가:', data);
  };

  return (
    <div className='space-y-8 pl-12 pr-12'>
      {/* 이미지 업로드 버튼 */}
      <div className='mt-10 mb-10'>
        <div className='relative'>
          <input type='file' id='profile-image' accept='image/*' className='hidden' onChange={handleFileSelect} />
          <label
            htmlFor='profile-image'
            className='flex h-32 w-32 cursor-pointer flex-col items-center justify-center rounded-full bg-gray-200'
          >
            {imageSource ? (
              <div className='relative h-full w-full'>
                <Image src={imageSource} alt='프로필 이미지' fill className='rounded-full object-cover' />
              </div>
            ) : (
              <>
                <Camera className='mb-1 h-6 w-6 text-gray-500' />
                <span className='text-xs font-bold'>이미지 추가</span>
              </>
            )}
          </label>
        </div>
      </div>

      {/* 관계 드롭다운 */}
      <div className='mt-10 mb-10'>
        <div className='flex items-center'>
          <div className='w-24 text-lg font-bold'>관계</div>
          <div className='flex-1'>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='outline'>{relationshipType}</Button>
              </DropdownMenuTrigger>
              <DropdownMenuPortal>
                <DropdownMenuContent className='w-56'>
                  <DropdownMenuLabel>관계 유형 선택</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup value={relationshipType} onValueChange={handleRelationshipChange}>
                    <DropdownMenuRadioItem value='소울메이트'>소울메이트</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value='절친'>절친</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value='친구'>친구</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value='지인'>지인</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value='비즈니스'>비즈니스</DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenuPortal>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-10'>
          {/* 이름 필드 */}
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <div className='flex flex-col'>
                <div className='flex items-center'>
                  <FormLabel className='w-24 text-lg font-bold'>이름</FormLabel>
                  <FormControl className='flex-1'>
                    <Input placeholder='이름을 입력해주세요.' {...field} />
                  </FormControl>
                </div>
                {/* 에러 메시지를 위한 고정된 높이의 공간 */}
                <div className='h-6 mt-1 flex justify-center'>
                  <FormMessage className='text-red-500 text-sm' />
                </div>
              </div>
            )}
          />
          
          {/* 한줄소개 필드 */}
          <FormField
            control={form.control}
            name='bio'
            render={({ field }) => (
              <div className='flex flex-col'>
                <div className='flex items-center'>
                  <FormLabel className='w-24 text-lg font-bold'>한줄소개</FormLabel>
                  <FormControl className='flex-1'>
                    <Input placeholder='이 사람을 한 마디로 표현한다면? (최소 5자)' {...field} />
                  </FormControl>
                </div>
                <div className='h-6 mt-1 flex justify-center'>
                  <FormMessage className='text-red-500 text-sm' />
                </div>
              </div>
            )}
          />

          {/* 전화번호 필드 */}
          <FormField
            control={form.control}
            name='phone'
            render={({ field }) => (
              <div className='flex flex-col'>
                <div className='flex items-center'>
                  <FormLabel className='w-24 text-lg font-bold'>전화번호</FormLabel>
                  <FormControl className='flex-1'>
                    <Input 
                      type='tel' 
                      placeholder='전화번호를 입력해주세요.' 
                      {...field}
                    />
                  </FormControl>
                </div>
                <div className='h-6 mt-1 flex justify-center'>
                  <FormMessage className='text-red-500 text-sm' />
                </div>
              </div>
            )}
          />

          {/* 이메일 필드 */}
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <div className='flex flex-col'>
                <div className='flex items-center'>
                  <FormLabel className='w-24 text-lg font-bold'>이메일</FormLabel>
                  <FormControl className='flex-1'>
                    <Input type='email' placeholder='이메일을 입력해주세요.' {...field} />
                  </FormControl>
                </div>
                <div className='h-6 mt-1 flex justify-center'>
                  <FormMessage className='text-red-500 text-sm' />
                </div>
              </div>
            )}
          />

          {/* 생일 필드 */}
          <FormField
            control={form.control}
            name='birthday'
            render={({ field }) => (
              <div className='flex flex-col'>
                <div className='flex items-center'>
                  <FormLabel className='w-24 text-lg font-bold'>생일</FormLabel>
                  <FormControl className='flex-1'>
                    <Input type='date' {...field} />
                  </FormControl>
                </div>
                <div className='h-6 mt-1 flex justify-center'>
                  <FormMessage className='text-red-500 text-sm' />
                </div>
              </div>
            )}
          />

          {/* 제출 버튼 */}
          <div className='flex justify-end pt-10'>
            <Button type='submit'>추가</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddContactForm;