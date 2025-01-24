'use client';

import { useState, useEffect } from 'react';
import { Users, Clock, Calendar, UserCheck, Timer } from 'lucide-react';
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
  calculateKPIs,
  type TrainingRecord,
} from './lib/storage';
import { exportToExcel } from './utils/exportToExcel';

export default function Home() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [records, setRecords] = useState<TrainingRecord[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

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

  // 导出数据到Excel
  const handleExport = () => {
    exportToExcel(records);
    showToastMessage('数据已成功导出到Excel文件！');
  };

  return (
    <div className="space-y-6">
      {/* 页面标题和操作按钮 */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">培训数据管理</h2>
        <div className="flex items-center space-x-4">
          <button
            className="btn-primary"
            onClick={() => setIsFormOpen(true)}
          >
            添加培训记录
          </button>
          <button
            className="btn-secondary"
            onClick={handleExport}
          >
            导出到Excel
          </button>
        </div>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="总培训场次"
          value={kpis.totalSessions}
          icon={<Calendar className="w-6 h-6" />}
          description="所有已完成的培训总数"
        />
        <StatCard
          title="总参训人数"
          value={kpis.totalParticipants}
          icon={<Users className="w-6 h-6" />}
          description="累计参加培训的人数"
        />
        <StatCard
          title="总培训时长"
          value={`${kpis.totalDuration}小时`}
          icon={<Clock className="w-6 h-6" />}
          description="累计培训总时长"
        />
        <StatCard
          title="总培训人时"
          value={`${kpis.totalParticipantHours}小时`}
          icon={<Timer className="w-6 h-6" />}
          description="参训人数×培训时长的总和"
        />
      </div>

      {/* 图表区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card">
          <h3 className="text-heading-4 mb-4">参训人数趋势</h3>
          <ParticipantsTrend data={records} />
        </div>
        <div className="card">
          <h3 className="text-heading-4 mb-4">培训时长统计</h3>
          <DurationStats data={records} />
        </div>
        <div className="card">
          <h3 className="text-heading-4 mb-4">课程类型分布</h3>
          <CourseTypeDistribution data={records} />
        </div>
      </div>

      {/* AI 洞察 */}
      <AIInsights data={records} />

      {/* 培训记录表格 */}
      <div className="card">
        <h3 className="text-heading-4 mb-4">培训记录</h3>
        <TrainingTable data={records} onDelete={handleDeleteRecord} />
      </div>

      {/* 添加培训记录表单 */}
      {isFormOpen && (
        <TrainingForm
          onClose={() => setIsFormOpen(false)}
          onSubmit={handleAddRecord}
        />
      )}

      {/* 提示消息 */}
      {showToast && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg">
          {toastMessage}
        </div>
      )}
    </div>
  );
}
