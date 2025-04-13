import LeftNavBar from '@/components/nav/LeftNavBar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className='flex flex-row'>
        <header className='flex items-center'>
          <LeftNavBar />
        </header>
        <main className='w-full'>{children}</main>
      </body>
    </html>
  );
}
