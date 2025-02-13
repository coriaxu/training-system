'use client';

import { useState, useEffect } from 'react';
import { Users, Clock, Calendar, UserCheck } from 'lucide-react';
import { StatCard } from './components/StatCard';
import { TrainingForm } from './components/TrainingForm';
import { TrainingTable } from './components/TrainingTable';
import { AIInsights } from './components/AIInsights';
import { ParticipantsTrend } from './components/charts/ParticipantsTrend';
import { DurationStats } from './components/charts/DurationStats';
import { CourseTypeDistribution } from './components/charts/CourseTypeDistribution';
import {
  getTrainingRecords,
  saveTrainingRecord,
  deleteTrainingRecord,
  updateTrainingRecord,
  calculateKPIs,
  type TrainingRecord,
} from './lib/storage';
import { exportToExcel } from './utils/exportToExcel';

export default function Home() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [records, setRecords] = useState<TrainingRecord[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [editingRecord, setEditingRecord] = useState<TrainingRecord | null>(null);

  // 从 localStorage 加载数据
  useEffect(() => {
    const loadedRecords = getTrainingRecords();
    setRecords(loadedRecords);
  }, []);

  // 计算 KPIs
  const kpis = calculateKPIs(records);

  // 处理新增培训记录
  const handleAddRecord = (data: Omit<TrainingRecord, 'id'>) => {
    const newRecord = saveTrainingRecord(data);
    setRecords([...records, newRecord]);
    showToastMessage('培训记录已成功添加！');
    setIsFormOpen(false);
  };

  // 处理编辑培训记录
  const handleEditRecord = (record: TrainingRecord) => {
    setEditingRecord(record);
    setIsFormOpen(true);
  };

  // 处理更新培训记录
  const handleUpdateRecord = (data: Omit<TrainingRecord, 'id'>) => {
    if (!editingRecord) return;
    
    const updatedRecord = updateTrainingRecord({
      ...data,
      id: editingRecord.id
    });

    setRecords(records.map(record => 
      record.id === editingRecord.id ? updatedRecord : record
    ));
    
    setEditingRecord(null);
    setIsFormOpen(false);
    showToastMessage('培训记录已成功更新！');
  };

  // 处理删除培训记录
  const handleDeleteRecord = (id: string) => {
    if (window.confirm('确定要删除这条记录吗？')) {
      deleteTrainingRecord(id);
      setRecords(records.filter((record) => record.id !== id));
      showToastMessage('培训记录已成功删除！');
    }
  };

  // 显示提示消息
  const showToastMessage = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // 导出数据到 Excel
  const handleExport = () => {
    exportToExcel(records);
    showToastMessage('数据已成功导出到 Excel！');
  };

  // 处理表单关闭
  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingRecord(null);
  };

  return (
    <div className="space-y-6">
      {/* 统计卡片 */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="总培训次数"
          value={kpis.totalSessions}
          icon={Calendar}
        />
        <StatCard
          title="总参与人次"
          value={kpis.totalParticipants}
          icon={Users}
        />
        <StatCard
          title="总培训时长"
          value={`${kpis.totalDuration}h`}
          icon={Clock}
        />
        <StatCard
          title="培训总人时"
          value={`${kpis.totalManHours}h`}
          icon={UserCheck}
        />
      </div>

      {/* 图表区域 */}
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-lg bg-white p-4 shadow">
          <ParticipantsTrend data={records} />
        </div>
        <div className="rounded-lg bg-white p-4 shadow">
          <DurationStats data={records} />
        </div>
        <div className="rounded-lg bg-white p-4 shadow">
          <CourseTypeDistribution data={records} />
        </div>
        <div className="rounded-lg bg-white p-4 shadow">
          <AIInsights data={records} />
        </div>
      </div>

      {/* 培训记录表格 */}
      <div className="rounded-lg bg-white p-4 shadow">
        <div className="mb-4 flex items-center justify-between">
          <div className="space-x-2">
            <button
              onClick={() => {
                setEditingRecord(null);
                setIsFormOpen(true);
              }}
              className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              添加培训记录
            </button>
            <button
              onClick={handleExport}
              className="rounded border border-gray-300 px-4 py-2 hover:bg-gray-50"
            >
              导出到Excel
            </button>
          </div>
        </div>
        <TrainingTable 
          records={records} 
          onDelete={handleDeleteRecord}
          onEdit={handleEditRecord}
        />
      </div>

      {/* 添加/编辑培训记录表单 */}
      <TrainingForm
        isOpen={isFormOpen}
        onClose={handleFormClose}
        onSubmit={editingRecord ? handleUpdateRecord : handleAddRecord}
        initialData={editingRecord}
      />

      {/* 提示消息 */}
      {showToast && (
        <div className="fixed bottom-4 right-4 rounded-lg bg-green-500 px-4 py-2 text-white shadow-lg">
          {toastMessage}
        </div>
      )}
    </div>
  );
}
