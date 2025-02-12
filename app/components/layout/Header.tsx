'use client';

import { UserCircleIcon } from '@heroicons/react/24/outline';
import { usePathname } from 'next/navigation';

export function Header() {
  const pathname = usePathname();

  const getTitle = () => {
    switch (pathname) {
      case '/':
        return '培训数据管理';
      case '/budget':
        return '预算管理';
      case '/training':
        return '培训记录';
      case '/reports':
        return '统计报表';
      default:
        return '培训数据管理';
    }
  };

  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">{getTitle()}</h2>
      </div>
      <div className="flex items-center">
        <button className="flex items-center rounded-full bg-gray-100 p-2 hover:bg-gray-200">
          <UserCircleIcon className="h-6 w-6 text-gray-600" />
        </button>
      </div>
    </header>
  );
}
