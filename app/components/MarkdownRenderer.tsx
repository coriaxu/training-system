'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Components } from 'react-markdown';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export function MarkdownRenderer({
  content,
  className = '',
}: MarkdownRendererProps) {
  const components: Partial<Components> = {
    // ...其他组件保持不变
    code: ({ className, children, node }) => { // 已完全移除 inline 参数
      const match = /language-(\w+)/.exec(className || '');
      const isInline = !node?.position?.start.line;
      return !isInline ? (
        <pre className="bg-gray-50 rounded-lg p-4 overflow-x-auto">
          <code className={match ? `language-${match[1]}` : ''}>
            {String(children).replace(/\n$/, '')}
          </code>
        </pre>
      ) : (
        <code className="bg-gray-100 rounded px-1 py-0.5 text-sm">
          {children}
        </code>
      );
    },
    // ...其他组件保持不变
  };

  return (
    <ReactMarkdown
      className={`prose prose-sm prose-slate max-w-none ${className}`}
      remarkPlugins={[remarkGfm]}
      components={components}
    >
      {content}
    </ReactMarkdown>
  );
}