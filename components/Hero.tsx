import React from 'react';
import { BASIC_PROTOCOL } from '../constants';
import { Activity } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <div className="bg-slate-900 text-white rounded-3xl p-8 md:p-12 mb-12 shadow-xl overflow-hidden relative">
      <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
        <Activity size={400} />
      </div>
      
      <div className="relative z-10">
        <h1 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
          人体系统调优指南
        </h1>
        <p className="text-slate-300 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
          基于 Andrew Huberman 教授的神经科学研究，这是一份关于优化睡眠、饮食、思维与专注力的结构化实践手册。像优化代码一样优化你的身体。
        </p>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
          <h2 className="text-sm font-semibold text-blue-300 uppercase tracking-wider mb-4">
            基础健康四要素 (The Basic 4)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {BASIC_PROTOCOL.map((item) => (
              <div key={item.id} className="flex items-center space-x-3 bg-slate-800/50 p-4 rounded-xl">
                <item.icon className="text-green-400 shrink-0" size={24} />
                <span className="font-medium text-slate-100">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};