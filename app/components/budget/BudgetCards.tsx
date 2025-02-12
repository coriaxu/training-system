import { useMemo } from 'react';
import { Budget } from '@/types/budget';

interface BudgetCardsProps {
  budget: Budget;
  expenses: Array<{
    id: string;
    type: string;
    amount: number;
    description: string;
    date: string;
  }>;
}

export default function BudgetCards({ budget, expenses }: BudgetCardsProps) {
  // 使用 useMemo 计算总支出和剩余预算
  const { totalExpense, remainingBudget } = useMemo(() => {
    const total = expenses.reduce((sum, expense) => sum + (expense.amount || 0), 0);
    return {
      totalExpense: total,
      remainingBudget: (budget.totalBudget || 0) - total
    };
  }, [expenses, budget.totalBudget]);

  const cards = [
    {
      title: '总预算',
      amount: budget.totalBudget,
      bgColor: 'bg-[#0F4264]',
      icon: '💰',
    },
    {
      title: '已使用',
      amount: totalExpense,
      bgColor: 'bg-[#10B981]',
      icon: '📊',
    },
    {
      title: '剩余预算',
      amount: remainingBudget,
      bgColor: remainingBudget < 0 ? 'bg-red-500' : 'bg-[#F59E0B]',
      icon: '💎',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
      {cards.map((card) => (
        <div
          key={card.title}
          className={`flex items-center justify-between rounded-lg ${card.bgColor} p-6 text-white`}
        >
          <div>
            <span className="text-2xl">{card.icon}</span>
            <h3 className="mt-2 text-lg font-medium">{card.title}</h3>
            <p className="text-sm opacity-80">
              <span className="ml-1 text-4xl font-bold">
                ¥{(card.amount ?? 0).toLocaleString('zh-CN')}
              </span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
