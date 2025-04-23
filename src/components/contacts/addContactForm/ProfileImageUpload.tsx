import React, { useRef } from 'react';
import { Camera, Pencil, Trash } from 'lucide-react';
import Image from 'next/image';
import { UseFormSetValue } from 'react-hook-form';
import { ContactFormValues } from '@/lib/schemas/contactFormSchema';

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
    <div className="flex items-center mb-10 mt-10">
      {/* 숨긴 파일 인풋 */}
      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={inputRef}
        onChange={handleFileSelect}
      />

      {/* 이미지 프리뷰 */}
      <label
        onClick={openFileDialog}
        className="relative h-40 w-40 cursor-pointer flex-shrink-0 rounded-full bg-gray-200 overflow-hidden"
      >
        {imageSource
          ? <Image src={imageSource} alt="프로필" fill className="object-cover" />
          : (
            <div className="flex h-full w-full flex-col items-center justify-center text-gray-500">
              <Camera className="mb-1 h-6 w-6" />
              <span className="text-xs font-bold">이미지 추가</span>
            </div>
          )
        }
      </label>

      <div className="flex flex-col space-y-8 ml-20">
        {/* 수정 버튼 */}
        <button
          type="button"
          onClick={openFileDialog}
          disabled={disabled}
          title={disabled ? '이미지를 먼저 업로드해주세요' : '이미지 수정'}
          className={`
            flex items-center justify-center
            w-28 h-8
            rounded-md
            bg-primary-500 text-grey-0
            text-xs
            font-bold
            transition
            ${disabled ? 'opacity-50 cursor-default' : 'hover:bg-primary-600'}
          `}
        >
          <Pencil size={16} className="mr-1" />
          이미지 변경
        </button>

        {/* 삭제 버튼 */}
        <button
          type="button"
          onClick={handleDelete}
          disabled={disabled}
          title={disabled ? '삭제할 이미지가 없습니다' : '이미지 삭제'}
          className={`
            flex items-center justify-center
            w-28 h-8
            rounded-md
            bg-primary-50 border border-primary-500 text-primary-500
            text-xs
            font-bold
            transition
            ${disabled ? 'opacity-50 cursor-default' : 'hover:bg-primary-100'}
          `}
        >
          <Trash size={16} className="mr-1" />
          이미지 삭제
        </button>
      </div>
    </div>
  );
};

export default ProfileImageUpload;
