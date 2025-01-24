'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Database, DollarSign } from 'lucide-react';

interface NavItem {
  name: string;
  path: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    name: '培训数据管理',
    path: '/',
    icon: <Database className="w-5 h-5" />,
  },
  {
    name: '培训预算费用',
    path: '/budget',
    icon: <DollarSign className="w-5 h-5" />,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="bg-white border-r border-gray-200 w-64 min-h-screen fixed left-0 top-0">
      {/* Logo区域 */}
      <div className="h-16 flex items-center justify-center border-b border-gray-200">
        <h1 className="text-lg font-bold text-primary">SURFIN</h1>
      </div>

      {/* 导航菜单 */}
      <nav className="p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
