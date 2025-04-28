'use client';

import GenericError from '@/components/Error';

export default function ErrorPage({ error, reset }: { error: Error & { originalError?: Error }; reset: () => void }) {
  console.error('메인 에러:', error);

  if (error.originalError) {
    console.error('원래 에러:', error.originalError);
  }

  return (
    <GenericError
      error={error}
      originalError={error.originalError ?? null}
      refetch={reset} // reset 함수는 Next.js가 제공하는 재시도 함수
    />
  );
}
