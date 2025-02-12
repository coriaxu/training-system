import { useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';

interface Expense {
  id: string;
  type: string;
  amount: number;
  description: string;
  date: string;
}

interface ExpenseListProps {
  expenses: Expense[];
  onAddExpense: () => void;
  onEdit: (expense: Expense) => void;
  onDelete: (id: string) => void;
}

export default function ExpenseList({ expenses, onAddExpense, onEdit, onDelete }: ExpenseListProps) {
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  return (
    <div className="mt-8 rounded-lg bg-white p-6 shadow">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-[#0F4264]">支出记录</h3>
        <button
          onClick={onAddExpense}
          className="flex items-center rounded-md bg-[#0F4264] px-4 py-2 text-sm text-white hover:bg-[#1A5A80]"
        >
          <PlusIcon className="mr-2 h-5 w-5" />
          添加支出
        </button>
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">日期</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">课程类型</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">金额</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">描述</th>
              <th className="px-6 py-3 text-center text-sm font-medium text-gray-500">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {expenses.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                  暂无支出记录
                </td>
              </tr>
            ) : (
              expenses.map((expense, index) => (
                <tr
                  key={expense.id}
                  className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                >
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                    {new Date(expense.date).toLocaleDateString()}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                    {expense.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ¥{(expense.amount ?? 0).toLocaleString('zh-CN')}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {expense.description}
                  </td>
                  <td className="px-6 py-4 flex justify-center space-x-2">
                    {/* 编辑按钮 */}
                    <button
                      onClick={() => onEdit(expense)}
                      className="px-3 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-600 transition"
                    >
                      编辑
                    </button>
                    
                    {/* 删除按钮 */}
                    <button
                      onClick={() => setConfirmDeleteId(expense.id)}
                      className="px-3 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600 transition"
                    >
                      删除
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* 确认删除弹窗 */}
      {confirmDeleteId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-gray-700 mb-4">确定要删除这条记录吗？</p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300 transition"
              >
                取消
              </button>
              <button
                onClick={() => {
                  onDelete(confirmDeleteId);
                  setConfirmDeleteId(null);
                }}
                className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 transition"
              >
                确定删除
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
