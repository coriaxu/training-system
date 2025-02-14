'use client';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export default function MarkdownRenderer({
  content,
  className = '',
}: MarkdownRendererProps) {
  const components = {
    h1: ({ children }: any) => (
      <h1 className="text-2xl font-bold text-gray-900 mb-4">{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-xl font-bold text-gray-900 mb-3">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {children}
      </h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-base font-semibold text-gray-900 mb-2">
        {children}
      </h4>
    ),
    p: ({ children }: any) => (
      <p className="text-gray-600 leading-relaxed mb-4">{children}</p>
    ),
    ul: ({ children }: any) => (
      <ul className="list-disc list-inside space-y-2 mb-4">{children}</ul>
    ),
    ol: ({ children }: any) => (
      <ol className="list-decimal list-inside space-y-2 mb-4">{children}</ol>
    ),
    li: ({ children }: any) => (
      <li className="text-gray-600">{children}</li>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-gray-200 pl-4 italic text-gray-600 mb-4">
        {children}
      </blockquote>
    ),
    code({ node, inline, className, children, ...props }: any) {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <SyntaxHighlighter
          language={match[1]}
          PreTag="div"
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
    table: ({ children }: any) => (
      <div className="overflow-x-auto mb-4">
        <table className="min-w-full divide-y divide-gray-200">
          {children}
        </table>
      </div>
    ),
    thead: ({ children }: any) => (
      <thead className="bg-gray-50">{children}</thead>
    ),
    tbody: ({ children }: any) => (
      <tbody className="divide-y divide-gray-200 bg-white">{children}</tbody>
    ),
    tr: ({ children }: any) => <tr>{children}</tr>,
    th: ({ children }: any) => (
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        {children}
      </th>
    ),
    td: ({ children }: any) => (
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
        {children}
      </td>
    ),
  };

  return (
    <div className={`prose prose-sm max-w-none dark:prose-invert ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
