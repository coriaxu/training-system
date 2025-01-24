import { Expense } from '@/types/budget';

interface ExpenseTableProps {
  expenses: Expense[];
  onEdit: (expense: Expense) => void;
  onDelete: (id: string) => void;
}

export default function ExpenseTable({ expenses, onEdit, onDelete }: ExpenseTableProps) {
  const getTypeText = (type: Expense['type']) => {
    const types = {
      training: '培训费用',
      travel: '差旅费用',
      other: '其他费用'
    };
    return types[type];
  };

  return (
    <div className="card">
      <h2 className="text-heading-2 mb-6">支出记录</h2>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>日期</th>
              <th>支出项目</th>
              <th>金额</th>
              <th>类型</th>
              <th>备注</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id}>
                <td>{expense.date}</td>
                <td>{expense.project}</td>
                <td>¥{expense.amount.toLocaleString()}</td>
                <td>{getTypeText(expense.type)}</td>
                <td>{expense.note || '-'}</td>
                <td>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onEdit(expense)}
                      className="text-primary hover:text-primary/80"
                    >
                      编辑
                    </button>
                    <button
                      onClick={() => onDelete(expense.id)}
                      className="text-red-500 hover:text-red-400"
                    >
                      删除
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 