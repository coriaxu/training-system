import Link from 'next/link';
import {
  HomeIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';

const navigation = [
  { name: '培训数据管理', href: '/', icon: HomeIcon },
  { name: '预算管理', href: '/budget', icon: CurrencyDollarIcon },
  { name: '培训记录', href: '/training', icon: DocumentTextIcon },
  { name: '统计报表', href: '/reports', icon: ChartBarIcon },
];

export function Sidebar() {
  return (
    <div className="flex h-full flex-col bg-[#0F4264] px-4 py-8">
      <div className="mb-8 px-2">
        <h1 className="text-2xl font-bold text-white">Surfin</h1>
      </div>
      <nav className="flex-1 space-y-2">
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex items-center rounded-lg px-2 py-2 text-sm font-medium text-gray-100 hover:bg-[#1A5A80]"
          >
            <item.icon className="mr-3 h-6 w-6" />
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}
