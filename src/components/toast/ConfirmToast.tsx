import { toast } from 'react-toastify';
import { Button } from '@/components/ui/button';

interface ConfirmToastProps {
  message: string;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
}

export const ConfirmToast = ({ message, onConfirm, confirmText = '삭제', cancelText = '취소' }: ConfirmToastProps) => {
  const toastId = toast(
    ({ closeToast }) => (
      <div className='flex flex-col space-y-2'>
        <p className='text-center'>{message}</p>
        <div className='flex justify-end gap-2'>
          <Button variant='outline' size='sm' onClick={closeToast}>
            {cancelText}
          </Button>
          <Button
            variant='destructive'
            size='sm'
            onClick={() => {
              toast.dismiss(toastId);
              onConfirm();
            }}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    ),
    { position: 'top-center', autoClose: false }
  );
};
