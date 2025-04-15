import { signInUser } from '@/app/api/supabase/service';
import { SignInFormType } from '@/components/signin/SigninForm';
import { PEOPLE } from '@/constants/paths';
import { useAuthStore } from '@/store/zustand/store';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export const useSignin = () => {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  //로그인 기능 핸들러
  const SignInHandler = async (value: SignInFormType) => {
    const { data, error } = await signInUser(value);
    if (data.session) {
      localStorage.setItem('alreadySignIn', 'true');
      toast.success(`로그인되었습니다.'내 사람' 페이지로 이동합니다.`);
      setUser(data.session.user);
      router.push(PEOPLE);
    } else if (error) {
      toast.warning('아이디 또는 비밀번호를 확인해주세요.');
    }
  };

  return { SignInHandler };
};
