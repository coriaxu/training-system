// 预算类型常量定义
export const BUDGET_TYPES = [
  '日常培训开销',
  '特殊项目开销'
] as const;

export type BudgetType = typeof BUDGET_TYPES[number];

// 支出类型常量定义
export const EXPENSE_TYPES = {
  training: '培训费用',
  travel: '差旅费用',
  other: '其他费用'
};