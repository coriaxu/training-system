import { useState } from 'react';
import { ExpenseFormData, BudgetType } from '@/types/budget';

interface ExpenseFormProps {
  onSubmit: (data: ExpenseFormData) => void;
  onClose: () => void;
}

export default function ExpenseForm({ onSubmit, onClose }: ExpenseFormProps) {
  const [formData, setFormData] = useState<ExpenseFormData>({
    date: new Date().toISOString().split('T')[0],
    project: '',
    amount: 0,
    budgetType: '日常培训开销',
    note: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          日期
        </label>
        <input
          type="date"
          className="form-input"
          value={formData.date}
          onChange={e => setFormData({ ...formData, date: e.target.value })}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          支出项目
        </label>
        <input
          type="text"
          className="form-input"
          value={formData.project}
          onChange={e => setFormData({ ...formData, project: e.target.value })}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          支出金额
        </label>
        <input
          type="number"
          className="form-input"
          value={formData.amount}
          onChange={e => setFormData({ ...formData, amount: Number(e.target.value) })}
          min="0"
          step="0.01"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          预算类型
        </label>
        <select
          className="form-select"
          value={formData.budgetType}
          onChange={e => setFormData({ ...formData, budgetType: e.target.value as BudgetType })}
          required
        >
          <option value="日常培训开销">日常培训开销</option>
          <option value="特殊项目开销">特殊项目开销</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          备注说明
        </label>
        <textarea
          className="form-textarea"
          value={formData.note}
          onChange={e => setFormData({ ...formData, note: e.target.value })}
        />
      </div>

      <div className="flex justify-end space-x-2">
        <button type="button" className="btn-secondary" onClick={onClose}>
          取消
        </button>
        <button type="submit" className="btn-primary">
          确定
        </button>
      </div>
    </form>
  );
}