'use client';

import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { TrainingRecord } from '../lib/storage';
import { format } from 'date-fns';

interface TrainingFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<TrainingRecord, 'id'>) => void;
  initialData?: TrainingRecord | null;
}

// 固定的课程类型选项
const courseTypes = ['管理培训', 'AI 分享', '龙门阵', '其他'];

export function TrainingForm({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}: TrainingFormProps) {
  const [formData, setFormData] = useState({
    courseType: '',
    courseName: '',
    startDate: format(new Date(), 'yyyy-MM-dd'),
    duration: '',
    participants: '',
    description: '',
  });

  // 当编辑模式打开时，填充表单数据
  useEffect(() => {
    if (initialData) {
      // 安全解析日期
      let parsedDate = new Date(initialData.startDate);
      // 如果日期无效，使用当前日期
      if (isNaN(parsedDate.getTime())) {
        console.warn('无效的日期值:', initialData.startDate);
        parsedDate = new Date();
      }

      setFormData({
        courseType: initialData.courseType || courseTypes[0],
        courseName: initialData.courseName || '',
        startDate: format(parsedDate, 'yyyy-MM-dd'),
        duration: String(initialData.duration || 0),
        participants: String(initialData.participants || 0),
        description: initialData.description || '',
      });
    } else {
      // 重置表单
      setFormData({
        courseType: courseTypes[0],
        courseName: '',
        startDate: format(new Date(), 'yyyy-MM-dd'),
        duration: '',
        participants: '',
        description: '',
      });
    }
  }, [initialData, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 安全解析提交的日期
    const dateVal = new Date(formData.startDate);
    const safeDate = isNaN(dateVal.getTime()) 
      ? new Date() 
      : dateVal;

    onSubmit({
      courseType: formData.courseType,
      courseName: formData.courseName,
      startDate: safeDate.toISOString(),
      duration: Number(formData.duration) || 0,
      participants: Number(formData.participants) || 0,
      description: formData.description,
    });
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
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
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500"
                    onClick={onClose}
                  >
                    <span className="sr-only">关闭</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-semibold leading-6 text-gray-900"
                    >
                      {initialData ? '编辑培训记录' : '添加培训记录'}
                    </Dialog.Title>

                    <div>
                      <label
                        htmlFor="courseType"
                        className="block text-sm font-medium text-gray-700"
                      >
                        课程类型
                      </label>
                      <select
                        id="courseType"
                        value={formData.courseType}
                        onChange={(e) =>
                          setFormData({ ...formData, courseType: e.target.value })
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        required
                      >
                        <option value="">请选择课程类型</option>
                        {courseTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="courseName"
                        className="block text-sm font-medium text-gray-700"
                      >
                        课程名称
                      </label>
                      <input
                        type="text"
                        id="courseName"
                        value={formData.courseName}
                        onChange={(e) =>
                          setFormData({ ...formData, courseName: e.target.value })
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="startDate"
                        className="block text-sm font-medium text-gray-700"
                      >
                        开始日期
                      </label>
                      <input
                        type="date"
                        id="startDate"
                        value={formData.startDate}
                        onChange={(e) =>
                          setFormData({ ...formData, startDate: e.target.value })
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="duration"
                        className="block text-sm font-medium text-gray-700"
                      >
                        时长（小时）
                      </label>
                      <input
                        type="number"
                        id="duration"
                        value={formData.duration}
                        onChange={(e) =>
                          setFormData({ ...formData, duration: e.target.value })
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        required
                        min="0"
                        step="0.5"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="participants"
                        className="block text-sm font-medium text-gray-700"
                      >
                        参训人数
                      </label>
                      <input
                        type="number"
                        id="participants"
                        value={formData.participants}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            participants: e.target.value,
                          })
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        required
                        min="1"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="description"
                        className="block text-sm font-medium text-gray-700"
                      >
                        描述
                      </label>
                      <textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            description: e.target.value,
                          })
                        }
                        rows={3}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end gap-x-3">
                    <button
                      type="button"
                      onClick={onClose}
                      className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                      取消
                    </button>
                    <button
                      type="submit"
                      className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    >
                      {initialData ? '保存' : '添加'}
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
