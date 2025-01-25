'use client';

import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { COURSE_TYPES, type TrainingRecord, type CourseType } from '../lib/storage';
import { X } from 'lucide-react';

interface TrainingFormProps {
  onClose: () => void;
  onSubmit: (data: Omit<TrainingRecord, 'id'>) => void;
}

export function TrainingForm({ onClose, onSubmit }: TrainingFormProps) {
  const [formData, setFormData] = useState<Omit<TrainingRecord, 'id'>>({
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
    <Transition appear show as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex items-center justify-between mb-4">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                    添加培训记录
                  </Dialog.Title>
                  <button
                    type="button"
                    className="text-gray-400 hover:text-gray-500"
                    onClick={onClose}
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="courseType" className="block text-sm font-medium text-gray-700">
                      培训类型
                    </label>
                    <select
                      id="courseType"
                      value={formData.courseType}
                      onChange={(e) =>
                        setFormData({ ...formData, courseType: e.target.value as CourseType })
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

                  <div>
                    <label htmlFor="courseName" className="block text-sm font-medium text-gray-700">
                      课程名称
                    </label>
                    <input
                      type="text"
                      id="courseName"
                      value={formData.courseName}
                      onChange={(e) =>
                        setFormData({ ...formData, courseName: e.target.value })
                      }
                      className="w-full rounded-lg border border-gray-300 px-3 py-2"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="instructor" className="block text-sm font-medium text-gray-700">
                      讲师
                    </label>
                    <input
                      type="text"
                      id="instructor"
                      value={formData.instructor}
                      onChange={(e) =>
                        setFormData({ ...formData, instructor: e.target.value })
                      }
                      className="w-full rounded-lg border border-gray-300 px-3 py-2"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                      日期
                    </label>
                    <input
                      type="date"
                      id="date"
                      value={formData.date}
                      onChange={(e) =>
                        setFormData({ ...formData, date: e.target.value })
                      }
                      className="w-full rounded-lg border border-gray-300 px-3 py-2"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="participants" className="block text-sm font-medium text-gray-700">
                      参与人数
                    </label>
                    <input
                      type="number"
                      id="participants"
                      value={formData.participants}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          participants: parseInt(e.target.value) || 0,
                        })
                      }
                      min="0"
                      className="w-full rounded-lg border border-gray-300 px-3 py-2"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
                      培训时长（小时）
                    </label>
                    <input
                      type="number"
                      id="duration"
                      value={formData.duration}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          duration: parseInt(e.target.value) || 0,
                        })
                      }
                      min="0"
                      step="0.5"
                      className="w-full rounded-lg border border-gray-300 px-3 py-2"
                      required
                    />
                  </div>

                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={onClose}
                      className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
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
