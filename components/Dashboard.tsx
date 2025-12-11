import React, { useState } from 'react';
import { SavedReport, DailyTask } from '../types';
import { Trash2, FileText, CheckCircle2, Circle, Calendar, Wind, ChevronRight, X } from 'lucide-react';

interface DashboardProps {
  savedReports: SavedReport[];
  dailyTasks: DailyTask[];
  onToggleTask: (taskId: string) => void;
  onDeleteReport: (reportId: string) => void;
  onOpenBreathing: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ 
  savedReports, 
  dailyTasks,
  onToggleTask,
  onDeleteReport,
  onOpenBreathing
}) => {
  const [selectedReport, setSelectedReport] = useState<SavedReport | null>(null);

  // Calculate completion percentage
  const completedCount = dailyTasks.filter(t => t.completed).length;
  const progress = Math.round((completedCount / dailyTasks.length) * 100) || 0;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2 tracking-tight">My Protocol</h1>
        <p className="text-slate-500">Track your daily habits and review your health assessments.</p>
      </header>

      {/* Daily Protocol Section (P1) */}
      <section className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-4 md:p-6 border-b border-slate-100 flex flex-col md:flex-row md:justify-between md:items-center bg-slate-50 gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <Calendar size={20} className="text-blue-500" />
              Daily Protocol
            </h2>
            <p className="text-xs text-slate-400 mt-1">{new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}</p>
          </div>
          <div className="flex items-center justify-between md:justify-end gap-4 w-full md:w-auto">
             <div className="text-left md:text-right">
               <span className="text-2xl font-bold text-blue-600">{progress}%</span>
               <span className="text-xs text-slate-400 block">Completed</span>
             </div>
             {/* Breathing Button (P2 Entry) */}
             <button 
               onClick={onOpenBreathing}
               className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm font-semibold shadow-sm hover:shadow"
             >
               <Wind size={16} />
               Breathe
             </button>
          </div>
        </div>
        
        <div className="p-4 md:p-6">
          <div className="space-y-3">
            {dailyTasks.map(task => (
              <div 
                key={task.id} 
                onClick={() => onToggleTask(task.id)}
                className={`flex items-center justify-between p-3 md:p-4 rounded-xl border transition-all cursor-pointer group select-none
                  ${task.completed 
                    ? 'bg-green-50/50 border-green-200' 
                    : 'bg-white border-slate-100 hover:border-blue-300 hover:shadow-sm'
                  }`}
              >
                <div className="flex items-center gap-3 md:gap-4 overflow-hidden">
                  <div className={`
                    shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-colors
                    ${task.completed ? 'text-green-600' : 'text-slate-300 group-hover:text-blue-400'}
                  `}>
                    {task.completed ? <CheckCircle2 size={24} /> : <Circle size={24} />}
                  </div>
                  <div className="truncate">
                    <span className={`font-medium block truncate ${task.completed ? 'text-slate-400 line-through' : 'text-slate-800'}`}>
                      {task.text}
                    </span>
                    <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold flex items-center gap-1">
                      {task.time} <span className="w-1 h-1 rounded-full bg-slate-300"></span> {task.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Archives Section (P0) */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        {/* Reports List */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 md:p-6 h-[350px] md:h-[500px] flex flex-col">
          <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <FileText size={20} className="text-purple-500" />
            Health Archives
          </h2>
          
          <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
            {savedReports.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-400 text-center p-8">
                <FileText size={48} className="mb-4 opacity-20" />
                <p>No reports saved yet.</p>
                <p className="text-xs mt-2">Take an assessment in any section to generate a report.</p>
              </div>
            ) : (
              savedReports.map(report => (
                <div 
                  key={report.id}
                  onClick={() => setSelectedReport(report)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer relative group
                    ${selectedReport?.id === report.id 
                      ? 'bg-purple-50 border-purple-200 shadow-sm' 
                      : 'bg-white border-slate-100 hover:bg-slate-50'
                    }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-slate-800">{report.sectionTitle} Assessment</h4>
                      <p className="text-xs text-slate-500 mt-1">
                        {new Date(report.date).toLocaleString()}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                        {selectedReport?.id === report.id && (
                             <ChevronRight size={16} className="text-purple-400 lg:hidden" />
                        )}
                        <button 
                          onClick={(e) => { e.stopPropagation(); onDeleteReport(report.id); }}
                          className="p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-md transition-all lg:opacity-0 lg:group-hover:opacity-100"
                          title="Delete Report"
                        >
                          <Trash2 size={16} />
                        </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Report Viewer - Hidden on mobile if nothing selected to save space, or simply scrolls into view */}
        <div className={`bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8 h-[500px] overflow-y-auto custom-scrollbar transition-all
            ${!selectedReport ? 'hidden lg:block opacity-50' : 'block opacity-100'}
        `}>
          {selectedReport ? (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">{selectedReport.sectionTitle}</h3>
                  <p className="text-sm text-slate-500">Report from {new Date(selectedReport.date).toLocaleDateString()}</p>
                </div>
                <button 
                    onClick={() => setSelectedReport(null)}
                    className="lg:hidden p-2 text-slate-400 hover:bg-slate-100 rounded-full"
                >
                    <X size={20} />
                </button>
              </div>
              <div 
                className="prose prose-slate prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: selectedReport.content }} 
              />
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 text-center">
              <FileText size={64} className="mb-4 opacity-10" />
              <p className="font-medium">Select a report to view analysis</p>
              <p className="text-xs mt-1">Details will appear here</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};