import { BudgetFormData } from '@/types/budget';

export function validateBudgetForm(data: BudgetFormData): string | null {
  // 验证月份
  if (!data.month) {
    return '请选择预算月份';
  }

  // 验证月份格式
  const monthRegex = /^\d{4}-\d{2}$/;
  if (!monthRegex.test(data.month)) {
    return '月份格式不正确';
  }

  // 验证课程类型预算
  for (const typeBudget of data.courseTypeBudgets) {
    if (typeBudget.amount < 0) {
      return `${typeBudget.type}预算不能为负数`;
    }
    if (!Number.isFinite(typeBudget.amount)) {
      return `${typeBudget.type}预算必须是有效数字`;
    }
  }

  // 验证总预算
  const totalAmount = data.courseTypeBudgets.reduce((sum, item) => sum + item.amount, 0);
  if (Math.abs(totalAmount - data.totalBudget) > 0.01) { // 考虑浮点数精度
    return '各类型预算总和必须等于总预算';
  }

  return null;
} 