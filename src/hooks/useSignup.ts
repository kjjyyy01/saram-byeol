import { signUpUser } from '@/app/api/supabase/service';
import { SignUpFormType } from '@/components/signup/SignupForm';
import { CONFIRM_EMAIL } from '@/constants/paths';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

export const useSignup = (emailDomain: string) => {
  const [isNicknameChecked, setIsNicknameChecked] = useState<boolean>(false);
  const [isEmailChecked, setIsEmailChecked] = useState<boolean>(false);

  const router = useRouter();

  //회원가입 기능 핸들러
  const SignUpHandler = async (value: SignUpFormType) => {
    const fullEmail = value.email + emailDomain;
    if (!isEmailChecked || !isNicknameChecked) {
      toast.warning('이메일과 닉네임 중복 검사를 완료해주세요.');
      return;
    }

    const userData = {
      ...value,
      email: fullEmail,
    };

    const { data, error } = await signUpUser(userData);
    if (data) {
      toast.success('이메일을 통해 인증해주세요.');
      router.replace(CONFIRM_EMAIL);
    } else if (error) {
      toast.warning('입력한 정보를 다시 한 번 확인해주세요.');
    }
  };

  return { SignUpHandler, setIsEmailChecked, setIsNicknameChecked };
};
