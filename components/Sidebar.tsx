import React from 'react';
import { SECTIONS } from '../constants';
import { LayoutDashboard } from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  onNavigate: (id: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeSection, onNavigate }) => {
  return (
    <nav className="space-y-2">
      <div className="mb-8 px-4">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <span>🧠</span> Huberman Lab
        </h2>
        <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider font-semibold">Protocol Summary</p>
      </div>
      
      {/* Dashboard Link */}
      <button
        onClick={() => onNavigate('dashboard')}
        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group mb-4 ${
          activeSection === 'dashboard'
            ? 'bg-slate-800 text-white shadow-md'
            : 'text-slate-800 font-semibold bg-slate-100 hover:bg-slate-200'
        }`}
      >
        <LayoutDashboard size={20} className={activeSection === 'dashboard' ? 'text-white' : 'text-slate-600'} />
        <span>My Protocol</span>
      </button>

      <div className="h-px bg-slate-200 my-4 mx-4"></div>
      
      {SECTIONS.map((section) => (
        <button
          key={section.id}
          onClick={() => onNavigate(section.id)}
          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
            activeSection === section.id
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <section.icon
            size={20}
            className={activeSection === section.id ? 'text-blue-200' : 'text-slate-400 group-hover:text-slate-600'}
          />
          <span className="font-medium">{section.title}</span>
        </button>
      ))}

      <div className="pt-8 mt-8 border-t border-slate-200 px-4">
        <p className="text-xs text-slate-400 leading-relaxed">
          Based on the summary of Huberman Lab Podcast & research by David Sinclair.
        </p>
      </div>
    </nav>
  );
};