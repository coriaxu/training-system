'use client';

import { useState } from 'react';
import BudgetOverview from '@/components/budget/BudgetOverview';
import ExpenseForm from '@/components/budget/ExpenseForm';
import ExpenseTable from '@/components/budget/ExpenseTable';
import Statistics from '@/components/budget/Statistics';
import { BudgetSettingForm } from '@/app/components/budget/BudgetSettingForm';
import { Budget, Expense, ExpenseFormData } from '@/types/budget';
import { v4 as uuidv4 } from 'uuid';
import { getBudgetByMonth, saveBudgetData } from '@/app/lib/budgetStorage';
import { getExpenses } from '@/app/lib/expenseStorage';

// 获取初始数据
const getInitialData = () => {
  const currentMonth = new Date().toISOString().slice(0, 7);
  const budget = getBudgetByMonth(currentMonth) || {
    total: 0,
    used: 0,
    remaining: 0,
    warningThreshold: 80,
    courseTypeBudgets: []
  };
  const expenses = getExpenses().filter((e: Expense) => e.date.startsWith(currentMonth));
  return { budget, expenses };
};

const { budget: initialBudget, expenses: initialExpenses } = getInitialData();

export default function BudgetPage() {
  const [budget, setBudget] = useState<Budget>(initialBudget as Budget);
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [budgetFormOpen, setBudgetFormOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const showToastMessage = (message: string) => {
    // 临时实现，后续可以替换成统一的toast组件
    alert(message);
  };

  const handleAddExpense = (data: ExpenseFormData) => {
    const newExpense: Expense = {
      id: uuidv4(),
      ...data,
      budgetType: '日常培训开销', // 默认设置为日常培训开销
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setExpenses([newExpense, ...expenses]);
    setBudget(currentBudget => ({
      ...currentBudget,
      used: currentBudget.used + data.amount,
      remaining: currentBudget.remaining - data.amount
    }));
    setShowExpenseForm(false);
  };

  const handleEditExpense = (expense: Expense) => {
    setEditingExpense(expense);
    setShowExpenseForm(true);
  };

  const handleDeleteExpense = (id: string) => {
    const expense = expenses.find(e => e.id === id);
    if (!expense) return;

    setExpenses(expenses.filter(e => e.id !== id));
    setBudget(currentBudget => ({
      ...currentBudget,
      used: currentBudget.used - expense.amount,
      remaining: currentBudget.remaining + expense.amount
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <BudgetOverview budget={budget} />

      <div className="flex justify-between items-center">
        <h1 className="text-heading-1">培训预算开销记录</h1>
        <div className="flex items-center space-x-4">
          <button
            className="btn-primary"
            onClick={() => setShowExpenseForm(true)}
          >
            新增支出记录
          </button>
          <button
            className="btn-primary"
            onClick={() => setBudgetFormOpen(true)}
          >
            设置预算
          </button>
        </div>
      </div>

      <Statistics expenses={expenses} />

      {showExpenseForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-heading-2 mb-4">
              {editingExpense ? '编辑支出记录' : '新增支出记录'}
            </h2>
            <ExpenseForm
              onSubmit={handleAddExpense}
              onClose={() => {
                setShowExpenseForm(false);
                setEditingExpense(null);
              }}
            />
          </div>
        </div>
      )}

      {budgetFormOpen && (
        <BudgetSettingForm
          onClose={() => setBudgetFormOpen(false)}
          onSubmit={(data) => {
            const totalBudget = data.courseTypeBudgets.reduce((sum, item) => sum + item.amount, 0);
            const newBudget = {
              ...budget,
              total: totalBudget,
              remaining: totalBudget - budget.used,
              courseTypeBudgets: data.courseTypeBudgets
            };
            
            // 保存到 localStorage
            saveBudgetData({
              month: data.month,
              totalBudget,
              courseTypeBudgets: data.courseTypeBudgets,
              notes: ''
            });
            
            setBudget(newBudget);
            setBudgetFormOpen(false);
            showToastMessage('预算设置已更新！');
          }}
        />
      )}

      <ExpenseTable
        expenses={expenses}
        onEdit={handleEditExpense}
        onDelete={handleDeleteExpense}
      />
    </div>
  );
}