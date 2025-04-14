import LeftNavBar from '@/components/nav/LeftNavBar';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '사람 별',
  description: '연락처 관리는 사람 별',
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-row" >
      <header className='flex items-center'>
        <LeftNavBar />
      </header>
      <main className='w-full'>{children}</main>
    </div>
  );
}
