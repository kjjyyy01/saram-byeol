import { signUpUser } from '@/app/api/supabase/service';
import { SignUpFormType } from '@/components/signup/SignupForm';
import { PEOPLE } from '@/constants/paths';
import { useAuthStore } from '@/store/zustand/store';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

export const useSignup = () => {
  const [isNicknameChecked, setIsNicknameChecked] = useState<boolean>(false);
  const [isEmailChecked, setIsEmailChecked] = useState<boolean>(false);

  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  //회원가입 기능 핸들러
  const SignUpHandler = async (value: SignUpFormType) => {
    if (!isEmailChecked || !isNicknameChecked) {
      toast.warning('이메일과 닉네임 중복 검사를 완료해주세요.');
      return;
    }

    const { data, error } = await signUpUser(value);
    if (data.session) {
      localStorage.setItem('alreadySignIn', 'true');
      toast.success(`회원가입이 완료되었습니다. 자동으로 로그인되어 '내 사람' 페이지로 이동합니다.`);
      setUser(data.session.user);
      router.push(PEOPLE);
    } else if (error) {
      toast.warning('입력한 정보를 다시 한 번 확인해주세요.');
    }
  };

  return { SignUpHandler, setIsEmailChecked, setIsNicknameChecked };
};
