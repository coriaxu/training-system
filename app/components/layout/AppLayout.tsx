import { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex h-screen">
      <aside className="w-64 flex-shrink-0">
        <Sidebar />
      </aside>
      <main className="flex flex-1 flex-col">
        <Header />
        <div className="flex-1 bg-gray-50 p-6">{children}</div>
      </main>
    </div>
  );
}
