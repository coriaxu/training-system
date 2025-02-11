import { Budget } from '@/types/budget';

interface ExpenseTableProps {
  budget: Budget | null;
}

export default function ExpenseTable({ budget }: ExpenseTableProps) {
  if (!budget) {
    return (
      <div className="card animate-pulse">
        <div className="h-6 w-48 bg-gray-200 rounded mb-6"></div>
        <div className="h-40 bg-gray-200 rounded"></div>
      </div>
    );
  }

  return (
    <div className="card">
      <h2 className="text-heading-2 mb-6">预算分配明细</h2>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>课程类型</th>
              <th>预算金额</th>
              <th>占总预算比例</th>
            </tr>
          </thead>
          <tbody>
            {budget.courseTypeBudgets.map((typeBudget, index) => (
              <tr key={index}>
                <td>{typeBudget.type}</td>
                <td>¥{typeBudget.amount.toLocaleString('zh-CN')}</td>
                <td>
                  {((typeBudget.amount / budget.totalBudget) * 100).toFixed(1)}%
                </td>
              </tr>
            ))}
            <tr className="font-bold">
              <td>总计</td>
              <td>¥{budget.totalBudget.toLocaleString('zh-CN')}</td>
              <td>100%</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      {budget.notes && (
        <p className="text-sm text-gray-500 mt-4">
          备注：{budget.notes}
        </p>
      )}
    </div>
  );
}