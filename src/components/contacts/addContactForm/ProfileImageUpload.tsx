import { ContactFormValues } from '@/lib/schemas/contactFormSchema';
import { Camera } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { UseFormSetValue } from 'react-hook-form';

interface ProfileImageUPloadProps {
  imageSource: string | null;
  setImageSource: (source: string | null) => void;
  setValue: UseFormSetValue<ContactFormValues>;
}

const ProfileImageUpload = ({ imageSource, setImageSource, setValue }: ProfileImageUPloadProps) => {
  // 파일 선택 처리 함수
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImageSource(e.target?.result as string);
        setValue('profileImage', result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className='mb-10 mt-10'>
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
  );
};

export default ProfileImageUpload;
