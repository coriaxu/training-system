'use client';

import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { X } from 'lucide-react';
import { useState } from 'react';
import { COURSE_TYPES } from '../lib/storage';

interface TrainingFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    courseType: string;
    courseName: string;
    startDate: string;
    duration: number;
    participants: number;
    satisfaction: number;
  }) => void;
}

export function TrainingForm({ isOpen, onClose, onSubmit }: TrainingFormProps) {
  const [formData, setFormData] = useState({
    courseType: COURSE_TYPES[0],
    courseName: '',
    startDate: new Date().toISOString().split('T')[0],
    duration: 0,
    participants: 0,
    satisfaction: 90,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
    // 重置表单
    setFormData({
      courseType: COURSE_TYPES[0],
      courseName: '',
      startDate: new Date().toISOString().split('T')[0],
      duration: 0,
      participants: 0,
      satisfaction: 90,
    });
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="relative w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 shadow-xl transition-all">
                <button
                  onClick={onClose}
                  className="absolute right-4 top-4 text-gray-400 hover:text-gray-500"
                >
                  <X className="h-6 w-6" />
                </button>

                <Dialog.Title className="text-lg font-semibold text-gray-900 mb-6">
                  添加培训记录
                </Dialog.Title>

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

                  {/* 开始日期 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      开始日期
                    </label>
                    <input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) =>
                        setFormData({ ...formData, startDate: e.target.value })
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
                      min="0"
                      step="0.5"
                      value={formData.duration}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          duration: parseFloat(e.target.value),
                        })
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
                          participants: parseInt(e.target.value),
                        })
                      }
                      className="w-full rounded-lg border border-gray-300 px-3 py-2"
                      required
                    />
                  </div>

                  {/* 满意度 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      满意度（%）
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={formData.satisfaction}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          satisfaction: parseInt(e.target.value),
                        })
                      }
                      className="w-full rounded-lg border border-gray-300 px-3 py-2"
                      required
                    />
                  </div>

                  {/* 提交按钮 */}
                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={onClose}
                      className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      取消
                    </button>
                    <button
                      type="submit"
                      className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                    >
                      保存
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
