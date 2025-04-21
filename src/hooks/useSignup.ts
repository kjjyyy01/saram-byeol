import { signUpUser } from '@/app/api/supabase/service';
import { SignUpFormType } from '@/components/signup/SignupForm';
import { PEOPLE } from '@/constants/paths';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

export const useSignup = () => {
  const [isNicknameChecked, setIsNicknameChecked] = useState<boolean>(false);
  const [isEmailChecked, setIsEmailChecked] = useState<boolean>(false);

  const router = useRouter();

  //회원가입 기능 핸들러
  const SignUpHandler = async (value: SignUpFormType) => {
    if (!isEmailChecked || !isNicknameChecked) {
      toast.warning('이메일과 닉네임 중복 검사를 완료해주세요.');
      return;
    }

    const { data, error } = await signUpUser(value);
    if (data.session) {
      toast.success(`회원가입을 성공했습니다.'내사람'으로 이동합니다.`);
      router.replace(PEOPLE);
    } else if (error) {
      toast.warning('입력한 정보를 다시 한 번 확인해주세요.');
    }
  };

  return { SignUpHandler, setIsEmailChecked, setIsNicknameChecked };
};
