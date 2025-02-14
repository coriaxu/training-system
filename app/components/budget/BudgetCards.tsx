import { useMemo, useState } from 'react';
import { Budget } from '@/types/budget';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import BudgetDialog from '../budget/BudgetDialog';

interface BudgetCardsProps {
  budget: Budget;
  expenses: Array<{
    id: string;
    amount: number;
    type: string;
  }>;
  onUpdate: (budget: Budget) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export default function BudgetCards({
  budget,
  expenses,
  onUpdate,
  onDelete,
}: BudgetCardsProps) {
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  // 使用 useMemo 优化计算
  const { totalExpense, remainingBudget, expensesByType } = useMemo(() => {
    const expensesByType = expenses.reduce((acc, expense) => {
      acc[expense.type] = (acc[expense.type] || 0) + (expense.amount || 0);
      return acc;
    }, {} as Record<string, number>);

    const totalExpense = expenses.reduce((sum, expense) => sum + (expense.amount || 0), 0);

    return {
      expensesByType,
      totalExpense,
      remainingBudget: (budget.totalBudget || 0) - totalExpense,
    };
  }, [expenses, budget.totalBudget]);

  const handleDelete = async () => {
    if (window.confirm('确定要删除这个预算吗？')) {
      await onDelete(budget.id);
    }
  };

  const cards = [
    {
      title: '总预算',
      amount: budget.totalBudget,
      icon: (
        <svg
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      gradient: 'from-[#0F4264] to-[#1E6091]',
      actions: (
        <div className="absolute right-4 top-4 flex space-x-2">
          <button
            onClick={() => setEditDialogOpen(true)}
            className="rounded-full bg-white/20 p-2 text-white opacity-90 transition-all hover:bg-white/30 hover:opacity-100"
          >
            <PencilSquareIcon className="h-5 w-5" />
          </button>
          <button
            onClick={handleDelete}
            className="rounded-full bg-white/20 p-2 text-white opacity-90 transition-all hover:bg-red-500/30 hover:opacity-100"
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>
      ),
    },
    {
      title: '已使用预算',
      amount: totalExpense,
      icon: (
        <svg
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
          />
        </svg>
      ),
      gradient: 'from-[#10B981] to-[#059669]',
    },
    {
      title: '剩余预算',
      amount: remainingBudget,
      icon: (
        <svg
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
          />
        </svg>
      ),
      gradient:
        remainingBudget < 0
          ? 'from-red-500 to-red-600'
          : 'from-[#F59E0B] to-[#D97706]',
    },
  ];

  return (
    <>
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <div
            key={card.title}
            className={`relative overflow-hidden rounded-2xl bg-gradient-to-r ${card.gradient} p-6 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl`}
          >
            <div className="flex items-start justify-between">
              <div className="rounded-lg bg-white/10 p-3">{card.icon}</div>
              {card.actions}
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-medium text-white">{card.title}</h3>
              <p className="mt-2 text-4xl font-bold text-white">
                ¥{(card.amount ?? 0).toLocaleString('zh-CN')}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 预算编辑对话框 */}
      <BudgetDialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        onSave={onUpdate}
        budget={budget}
      />
    </>
  );
}
