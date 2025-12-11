import React from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, ReferenceLine, Legend 
} from 'recharts';
import { ChartType } from '../types';

// Data for Sleep (Circadian Rhythm)
const sleepData = [
  { time: '06:00', cortisol: 20, melatonin: 2, temp: 36.5 },
  { time: '09:00', cortisol: 80, melatonin: 1, temp: 36.8 },
  { time: '12:00', cortisol: 50, melatonin: 0, temp: 37.0 },
  { time: '15:00', cortisol: 40, melatonin: 0, temp: 37.2 },
  { time: '18:00', cortisol: 30, melatonin: 2, temp: 37.1 },
  { time: '21:00', cortisol: 15, melatonin: 15, temp: 36.9 },
  { time: '00:00', cortisol: 5, melatonin: 60, temp: 36.5 },
  { time: '03:00', cortisol: 10, melatonin: 40, temp: 36.2 },
  { time: '06:00', cortisol: 25, melatonin: 5, temp: 36.4 },
];

// Data for Diet (Fasting Phases)
const dietData = [
  { hours: 0, glucose: 100, autophagy: 10 },
  { hours: 4, glucose: 120, autophagy: 10 },
  { hours: 8, glucose: 90, autophagy: 15 },
  { hours: 12, glucose: 70, autophagy: 30 },
  { hours: 16, glucose: 65, autophagy: 80 }, // Peak benefit for 16:8
  { hours: 20, glucose: 60, autophagy: 90 },
  { hours: 24, glucose: 55, autophagy: 100 },
];

// Data for Dopamine (Baseline vs Spike)
const dopamineData = [
  { t: 'Pre', level: 100, label: 'Baseline' },
  { t: 'Trigger', level: 100, label: 'Action' },
  { t: 'Spike', level: 250, label: 'High' },
  { t: 'Drop', level: 60, label: 'Crash' }, // Below baseline
  { t: 'Recover', level: 85, label: 'Recovery' },
  { t: 'Stable', level: 100, label: 'Baseline' },
];

// Data for Focus (Ultradian Rhythm)
const focusData = [
  { min: 0, alertness: 50 },
  { min: 15, alertness: 80 },
  { min: 45, alertness: 100 }, // Peak focus
  { min: 75, alertness: 80 },
  { min: 90, alertness: 40 }, // Trough
  { min: 105, alertness: 30 }, // Need rest
  { min: 120, alertness: 60 }, // Recovery
];

// Data for Longevity (Healthspan)
const longevityData = [
  { age: 20, normal: 100, optimized: 100 },
  { age: 40, normal: 90, optimized: 95 },
  { age: 60, normal: 70, optimized: 90 },
  { age: 80, normal: 40, optimized: 80 },
  { age: 90, normal: 10, optimized: 60 },
  { age: 100, normal: 0, optimized: 30 },
];

interface ChartProps {
  type: ChartType;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-slate-200 shadow-lg rounded text-xs text-slate-700">
        <p className="font-bold mb-1">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export const SectionChart: React.FC<ChartProps> = ({ type }) => {
  const renderChart = () => {
    switch (type) {
      case 'sleep':
        return (
          <div className="h-64 w-full">
            <h4 className="text-center text-xs font-bold text-slate-500 mb-2 uppercase tracking-widest">Circadian Rhythm Dynamics</h4>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sleepData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="time" tick={{fontSize: 10}} stroke="#94a3b8" />
                <YAxis hide />
                <Tooltip content={<CustomTooltip />} />
                <Legend iconType="circle" wrapperStyle={{fontSize: '12px', paddingTop: '10px'}}/>
                <Line type="monotone" dataKey="cortisol" name="Cortisol (Alertness)" stroke="#eab308" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="melatonin" name="Melatonin (Sleepiness)" stroke="#3b82f6" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        );
      
      case 'diet':
        return (
          <div className="h-64 w-full">
            <h4 className="text-center text-xs font-bold text-slate-500 mb-2 uppercase tracking-widest">Fasting: Glucose vs Autophagy</h4>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dietData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorAutophagy" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="hours" label={{ value: 'Hours Fasting', position: 'insideBottom', offset: -5, fontSize: 10 }} stroke="#94a3b8" />
                <YAxis hide />
                <Tooltip content={<CustomTooltip />} />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <Area type="monotone" dataKey="autophagy" name="Autophagy (Cell Repair)" stroke="#22c55e" fillOpacity={1} fill="url(#colorAutophagy)" />
                <Line type="monotone" dataKey="glucose" name="Glucose Levels" stroke="#f97316" strokeWidth={2} dot={false} strokeDasharray="5 5" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        );

      case 'dopamine':
        return (
          <div className="h-64 w-full">
            <h4 className="text-center text-xs font-bold text-slate-500 mb-2 uppercase tracking-widest">Dopamine Spike & Crash</h4>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dopamineData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="t" tick={{fontSize: 10}} stroke="#94a3b8" />
                <YAxis hide domain={[0, 300]} />
                <Tooltip content={<CustomTooltip />} />
                <ReferenceLine y={100} stroke="#94a3b8" strokeDasharray="3 3" label={{ value: 'Baseline', fill: '#94a3b8', fontSize: 10 }} />
                <Line type="stepAfter" dataKey="level" name="Dopamine Level" stroke="#ec4899" strokeWidth={3} dot={{r: 4}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        );
      
      case 'focus':
        return (
          <div className="h-64 w-full">
            <h4 className="text-center text-xs font-bold text-slate-500 mb-2 uppercase tracking-widest">Ultradian Focus Cycle (90 min)</h4>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={focusData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <XAxis dataKey="min" label={{ value: 'Minutes', position: 'insideBottom', offset: -5, fontSize: 10 }} stroke="#94a3b8" />
                <YAxis hide />
                <Tooltip content={<CustomTooltip />} />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <Area type="basis" dataKey="alertness" name="Mental Focus" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.1} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        );

      case 'longevity':
        return (
          <div className="h-64 w-full">
             <h4 className="text-center text-xs font-bold text-slate-500 mb-2 uppercase tracking-widest">Healthspan Extension</h4>
             <ResponsiveContainer width="100%" height="100%">
              <LineChart data={longevityData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="age" label={{ value: 'Age', position: 'insideBottom', offset: -5, fontSize: 10 }} stroke="#94a3b8" />
                <YAxis hide />
                <Tooltip content={<CustomTooltip />} />
                <Legend iconType="plainLine" wrapperStyle={{fontSize: '12px', paddingTop: '10px'}}/>
                <Line type="monotone" dataKey="normal" name="Standard Aging" stroke="#94a3b8" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="optimized" name="Optimized Protocol" stroke="#10b981" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm mt-4">
      {renderChart()}
    </div>
  );
};