import { Warning } from '@phosphor-icons/react';

type GenericErrorProps = {
  message?: string;
  error?: Error | null;
  refetch?: () => void;
};

export default function GenericError({ message, error, refetch }: GenericErrorProps) {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center gap-8'>
      <Warning size={60} className='text-secondary-600' />
      <h2 className='title text-[45px] font-bold text-primary-700'>에러 발생!</h2>
      <p className='text-[23px] text-primary-500'>
        {message} {error?.message}
      </p>
      {refetch && (
        <button
          onClick={refetch}
          className='rounded-md border-2 bg-primary-500 p-4 font-bold text-white hover:bg-primary-600'
        >
          다시 시도
        </button>
      )}
    </div>
  );
}
