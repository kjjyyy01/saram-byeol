import type { Metadata } from 'next';
import './globals.css';
import { Providers } from '@/app/providers';
import { ToastContainer } from 'react-toastify';
import localFont from 'next/font/local';

export const metadata: Metadata = {
  title: '사람 별',
  description: '연락처 관리는 사람 별',
};

const pretendard = localFont({
  src: './fonts/pretendard/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko' className={`${pretendard.variable}`}>
      <body className={pretendard.className}>
        <Providers>
          {children}
          <ToastContainer
            position='top-right'
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </Providers>
      </body>
    </html>
  );
}
