import React from 'react';
import { SectionContent } from '../types';
import { Info, AlertTriangle, CheckCircle2, ChevronRight, BookOpen, Sparkles } from 'lucide-react';
import { SectionChart } from './SectionCharts';

interface ContentSectionProps {
  data: SectionContent;
  onOpenAssessment: (sectionId: string) => void;
}

export const ContentSection: React.FC<ContentSectionProps> = ({ data, onOpenAssessment }) => {
  return (
    <section id={data.id} className="mb-24 scroll-mt-24">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-100 text-blue-700 rounded-xl">
            <data.icon size={32} />
          </div>
          <h2 className="text-3xl font-bold text-slate-900">{data.title}</h2>
        </div>
        
        {data.assessmentQuestions && data.assessmentQuestions.length > 0 && (
          <button
            onClick={() => onOpenAssessment(data.id)}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-5 py-2.5 rounded-full font-semibold shadow-lg hover:shadow-purple-500/30 hover:-translate-y-0.5 transition-all text-sm w-fit"
          >
            <Sparkles size={16} />
            Start AI Assessment
          </button>
        )}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column: Summary & Science & Actions */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Science & Summary Card */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-semibold text-slate-900 mb-3 flex items-center gap-2">
              <Info size={18} className="text-blue-500" />
              核心机制
            </h3>
            <p className="text-slate-600 leading-relaxed mb-6">{data.summary}</p>
            
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div className="bg-slate-50 p-4 rounded-xl text-sm text-slate-500 border-l-4 border-blue-400 h-full">
                <span className="font-bold text-slate-700 block mb-2">Scientific Principle:</span>
                {data.science}
              </div>
              <div className="h-full">
                <SectionChart type={data.chartType} />
              </div>
            </div>
          </div>

          {/* Actions Card */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
             <h3 className="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2">
              <CheckCircle2 size={18} className="text-green-500" />
              行动指南 (Protocol)
            </h3>
            <ul className="space-y-4">
              {data.actions.map((action) => (
                <li key={action.id} className="flex items-start gap-3 group">
                  <div className={`mt-1 shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${action.important ? 'border-green-500 bg-green-50' : 'border-slate-300 group-hover:border-blue-300'}`}>
                    {action.important && <div className="w-2.5 h-2.5 rounded-full bg-green-500" />}
                  </div>
                  <div>
                    <span className={`font-medium block ${action.important ? 'text-green-800' : 'text-slate-800'}`}>
                      {action.text}
                    </span>
                    {action.detail && (
                      <span className="text-sm text-slate-500 mt-1 block leading-relaxed">
                        {action.detail}
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: Warnings, References */}
        <div className="space-y-6">
          {data.warnings && data.warnings.length > 0 && (
            <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100">
              <h4 className="text-amber-800 font-semibold mb-3 flex items-center gap-2">
                <AlertTriangle size={18} />
                注意事项
              </h4>
              <ul className="space-y-2">
                {data.warnings.map((warning, idx) => (
                  <li key={idx} className="text-sm text-amber-700 flex gap-2">
                    <ChevronRight size={14} className="mt-1 shrink-0 opacity-50" />
                    {warning}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {/* References Section */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
            <h4 className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
              <BookOpen size={14} />
              Literature / References
            </h4>
            <ul className="space-y-4">
              {data.references.map((ref) => (
                <li key={ref.id} className="text-xs text-slate-600">
                  <p className="font-semibold text-slate-800 mb-0.5 leading-snug">
                    {ref.url ? (
                      <a href={ref.url} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 hover:underline">
                        {ref.title}
                      </a>
                    ) : (
                      ref.title
                    )}
                  </p>
                  <p className="text-slate-400 italic">
                    {ref.authors} — {ref.journal}, {ref.year}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gradient-to-br from-white to-blue-50 p-6 rounded-2xl border border-blue-100 shadow-sm">
             <p className="text-sm text-blue-800 italic text-center">
              "Biological optimization is a game of leverage. Small changes in protocol yield massive returns in performance."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};