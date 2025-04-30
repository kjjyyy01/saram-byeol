import React, { useRef } from 'react';
import { Pencil, Trash } from 'lucide-react';
import Image from 'next/image';
import { UseFormSetValue } from 'react-hook-form';
import { ContactFormValues } from '@/lib/schemas/contactFormSchema';
import { ImageSquare } from '@phosphor-icons/react';

interface ProfileImageUploadProps {
  imageSource: string | null;
  setImageSource: (src: string | null) => void;
  setValue: UseFormSetValue<ContactFormValues>;
}

const ProfileImageUpload = ({ imageSource, setImageSource, setValue }: ProfileImageUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setImageSource(result);
      setValue('profileImage', result);
    };
    reader.readAsDataURL(file);
  };

  const openFileDialog = () => {
    inputRef.current?.click();
  };

  const handleDelete = () => {
    setImageSource(null);
    setValue('profileImage', null);
    if (inputRef.current) inputRef.current.value = '';
  };

  const disabled = !imageSource;

  return (
    <div className='mb-10 mt-10 flex items-center'>
      {/* 숨긴 파일 인풋 */}
      <input type='file' accept='image/*' className='hidden' ref={inputRef} onChange={handleFileSelect} />

      {/* 이미지 프리뷰 */}
      <label
        onClick={openFileDialog}
        className='relative h-40 w-40 flex-shrink-0 cursor-pointer overflow-hidden rounded-full bg-grey-100'
      >
        {imageSource ? (
          <Image src={imageSource} alt='프로필' fill className='object-cover' />
        ) : (
          <div className='flex h-full w-full flex-col items-center justify-center text-black'>
            <ImageSquare className='mb-1 h-6 w-6' />
          </div>
        )}
      </label>

      <div className='ml-20 flex flex-col space-y-8'>
        {/* 수정 버튼 */}
        <button
          type='button'
          onClick={openFileDialog}
          disabled={disabled}
          title={disabled ? '이미지를 먼저 업로드해주세요' : '이미지 수정'}
          className={`flex h-8 w-28 items-center justify-center rounded-md bg-primary-500 text-xs font-bold text-grey-0 transition ${disabled ? 'cursor-default opacity-50' : 'hover:bg-primary-600'} `}
        >
          <Pencil size={16} className='mr-1' />
          이미지 변경
        </button>

        {/* 삭제 버튼 */}
        <button
          type='button'
          onClick={handleDelete}
          disabled={disabled}
          title={disabled ? '삭제할 이미지가 없습니다' : '이미지 삭제'}
          className={`flex h-8 w-28 items-center justify-center rounded-md border border-primary-500 bg-primary-50 text-xs font-bold text-primary-500 transition ${disabled ? 'cursor-default opacity-50' : 'hover:bg-primary-100'} `}
        >
          <Trash size={16} className='mr-1' />
          이미지 삭제
        </button>
      </div>
    </div>
  );
};

export default ProfileImageUpload;
