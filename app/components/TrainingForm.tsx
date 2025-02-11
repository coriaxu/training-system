'use client';

import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { COURSE_TYPES, type TrainingRecord } from '../lib/storage';
import { X } from 'lucide-react';

interface TrainingFormProps {
  onClose: () => void;
  onSubmit: (data: Omit<TrainingRecord, 'id'>) => void;
}

export function TrainingForm({ onClose, onSubmit }: TrainingFormProps) {
  const [formData, setFormData] = useState({
    courseType: COURSE_TYPES[0],
    courseName: '',
    instructor: '',
    date: new Date().toISOString().split('T')[0],
    participants: 0,
    duration: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
    // 重置表单
    setFormData({
      courseType: COURSE_TYPES[0],
      courseName: '',
      instructor: '',
      date: new Date().toISOString().split('T')[0],
      participants: 0,
      duration: 0,
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" onClick={onClose} />
        
        <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md p-6">
          {/* 关闭按钮 */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-500"
          >
            <X className="h-6 w-6" />
          </button>

          {/* 表单标题 */}
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            添加培训记录
          </h3>

          {/* 表单内容 */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* 课程类型 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                课程类型
              </label>
              <select
                value={formData.courseType}
                onChange={(e) =>
                  setFormData({ ...formData, courseType: e.target.value })
                }
                className="w-full rounded-lg border border-gray-300 px-3 py-2"
                required
              >
                {COURSE_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* 课程名称 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                课程名称
              </label>
              <input
                type="text"
                value={formData.courseName}
                onChange={(e) =>
                  setFormData({ ...formData, courseName: e.target.value })
                }
                className="w-full rounded-lg border border-gray-300 px-3 py-2"
                required
              />
            </div>

            {/* 讲师 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                讲师
              </label>
              <input
                type="text"
                value={formData.instructor}
                onChange={(e) =>
                  setFormData({ ...formData, instructor: e.target.value })
                }
                className="w-full rounded-lg border border-gray-300 px-3 py-2"
                required
              />
            </div>

            {/* 日期 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                培训日期
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                className="w-full rounded-lg border border-gray-300 px-3 py-2"
                required
              />
            </div>

            {/* 参训人数 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                参训人数
              </label>
              <input
                type="number"
                min="1"
                value={formData.participants}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    participants: parseInt(e.target.value) || 0,
                  })
                }
                className="w-full rounded-lg border border-gray-300 px-3 py-2"
                required
              />
            </div>

            {/* 培训时长 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                培训时长（小时）
              </label>
              <input
                type="number"
                min="0.5"
                step="0.5"
                value={formData.duration}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    duration: parseFloat(e.target.value) || 0,
                  })
                }
                className="w-full rounded-lg border border-gray-300 px-3 py-2"
                required
              />
            </div>

            {/* 提交按钮 */}
            <div className="flex justify-end gap-4 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 border border-gray-300 rounded-lg"
              >
                取消
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-lg"
              >
                保存
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
