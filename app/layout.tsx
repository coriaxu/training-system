import './globals.css';
import { Inter } from 'next/font/google';
import { Sidebar } from '@/app/components/layout/Sidebar';
import { Header } from '@/app/components/layout/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: '培训预算系统',
  description: '管理培训预算和支出的系统',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh">
      <body className={inter.className}>
        <div className="flex h-screen">
          <aside className="w-64 flex-shrink-0">
            <Sidebar />
          </aside>
          <main className="flex flex-1 flex-col">
            <Header />
            <div className="flex-1 bg-gray-50 p-6">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
