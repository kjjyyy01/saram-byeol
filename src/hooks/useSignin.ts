import { signInUser } from '@/app/api/supabase/service';
import { SignInFormType } from '@/components/signin/SigninForm';
import { PEOPLE } from '@/constants/paths';
import { useRouter } from 'next/navigation';
import { UseFormGetValues } from 'react-hook-form';
import { toast } from 'react-toastify';

export const useSignin = (getValues: UseFormGetValues<SignInFormType>, isChecked: boolean) => {
  const router = useRouter();

  //로그인 기능 핸들러
  const SignInHandler = async (value: SignInFormType) => {
    const email = getValues('email');

    const { data, error } = await signInUser(value);
    if (data.session) {
      //체크박스가 체크되면 입력한 email값을 로컬스토리지에 저장,아니면 로컬스토리지에서 삭제
      if (isChecked) {
        localStorage.setItem('saved-email', email);
      } else {
        localStorage.removeItem('saved-email');
      }
      toast.success(`로그인에 성공했습니다. '내사람'으로 이동합니다.`);
      router.replace(PEOPLE);
    } else if (error) {
      toast.warning('아이디 또는 비밀번호를 확인해주세요.');
    }
  };

  return { SignInHandler };
};
