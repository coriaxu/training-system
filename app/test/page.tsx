export default function TestPage() {
  return (
    <div className="p-8 space-y-8">
      {/* 测试卡片样式 */}
      <div className="card">
        这是一个卡片组件
      </div>
      
      {/* 测试按钮样式 */}
      <div className="space-x-4">
        <button className="btn-primary">主要按钮</button>
        <button className="btn-secondary">次要按钮</button>
        <button className="btn-primary" disabled>禁用按钮</button>
      </div>
      
      {/* 测试文本样式 */}
      <div className="space-y-4">
        <h1 className="text-heading-1">标题1</h1>
        <h2 className="text-heading-2">标题2</h2>
        <h3 className="text-heading-3">标题3</h3>
        <h4 className="text-heading-4">标题4</h4>
        <p className="text-body">正文文本</p>
        <p className="text-small">小号文本</p>
      </div>
      
      {/* 测试滚动条 */}
      <div className="h-40 overflow-y-auto card">
        {Array(20).fill(0).map((_, i) => (
          <p key={i} className="py-2">滚动条测试行 {i + 1}</p>
        ))}
      </div>
    </div>
  )
} 