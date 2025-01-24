'use client';

export function Header() {
  return (
    <header className="h-16 bg-white border-b border-gray-200 fixed top-0 left-64 right-0 z-10">
      <div className="h-full flex items-center">
        {/* 精准间距控制容器 */}
        <div className="pl-[28px]">
          <h2 
            className="text-xl font-semibold" 
            style={{ 
              color: '#0F4264',
              position: 'relative',
              left: '-4px'
            }}
          >
            学习发展培训运营后台系统
          </h2>
        </div>

        {/* 用户区域占位 */}
        <div className="flex-1"></div>
        
        {/* 用户信息容器 */}
        <div className="pr-6 flex items-center space-x-4">
          {/* 预留区域 */}
        </div>
      </div>
    </header>
  );
}