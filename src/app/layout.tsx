import type { Metadata } from 'next';
import './globals.css';
import { QueryProviders } from './provider';

export const metadata: Metadata = {
  title: '사람 별',
  description: '연락처 관리는 사람 별',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body>
        <QueryProviders>{children}</QueryProviders>
      </body>
    </html>
  );
}
