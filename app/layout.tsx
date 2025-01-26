import './globals.css';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';

export const metadata = {
  title: '学习发展培训运营后台系统',
  description: '一个集成的培训运营管理平台，提供全面、高效、便捷的培训管理工具',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className="font-sans">
        <div className="min-h-screen bg-background">
          {/* 侧边栏 */}
          <Sidebar />
          
          {/* 主内容区域 - 使用 padding 避免布局冲突 */}
          <div className="pl-64">
            {/* 顶部导航 */}
            <Header />
            
            {/* 内容区域 */}
            <main className="p-6 mt-16">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
