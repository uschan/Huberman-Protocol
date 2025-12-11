import React, { useState, useEffect, useRef } from 'react';
import { X, Wind } from 'lucide-react';

interface BreathingExerciseProps {
  onClose: () => void;
}

export const BreathingExercise: React.FC<BreathingExerciseProps> = ({ onClose }) => {
  const [phase, setPhase] = useState<'inhale1' | 'inhale2' | 'exhale'>('inhale1');
  const [text, setText] = useState('Inhale (Nose)');
  const [cycles, setCycles] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Physiological Sigh Cycle:
  // 1. Inhale deeply (2s)
  // 2. Second short inhale (1s)
  // 3. Long exhale (5s)
  
  useEffect(() => {
    const runCycle = () => {
      // Step 1: Inhale 1
      setPhase('inhale1');
      setText('Inhale (Nose)');
      
      timerRef.current = setTimeout(() => {
        // Step 2: Inhale 2
        setPhase('inhale2');
        setText('Inhale Again');
        
        timerRef.current = setTimeout(() => {
          // Step 3: Exhale
          setPhase('exhale');
          setText('Long Exhale (Mouth)');
          
          timerRef.current = setTimeout(() => {
            setCycles(c => c + 1);
            runCycle();
          }, 5000); // Exhale duration
        }, 1200); // Inhale 2 duration
      }, 2500); // Inhale 1 duration
    };

    runCycle();

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-md bg-transparent text-center flex flex-col items-center">
        <button 
          onClick={onClose}
          className="absolute -top-12 right-0 p-2 text-white/50 hover:text-white transition-colors rounded-full hover:bg-white/10"
        >
          <X size={32} />
        </button>

        <h3 className="text-3xl font-bold text-white mb-2 tracking-tight">Physiological Sigh</h3>
        <p className="text-blue-200 mb-16 text-lg">Reduces stress & lowers heart rate</p>

        {/* Animation Container */}
        <div className="relative w-72 h-72 flex items-center justify-center mb-16">
          {/* Base Glow */}
          <div className={`absolute rounded-full bg-blue-500/30 blur-2xl transition-all duration-[2500ms] ease-out
            ${phase === 'inhale1' ? 'w-56 h-56 opacity-50' : ''}
            ${phase === 'inhale2' ? 'w-72 h-72 opacity-80' : ''}
            ${phase === 'exhale' ? 'w-32 h-32 opacity-30 duration-[5000ms]' : ''}
          `} />
          
          {/* Main Circle */}
          <div className={`absolute rounded-full bg-white transition-all ease-in-out shadow-[0_0_60px_rgba(59,130,246,0.6)]
            ${phase === 'inhale1' ? 'w-48 h-48 duration-[2500ms]' : ''}
            ${phase === 'inhale2' ? 'w-64 h-64 duration-[1200ms]' : ''}
            ${phase === 'exhale' ? 'w-24 h-24 duration-[5000ms]' : ''}
          `}>
             <div className="w-full h-full flex items-center justify-center">
               <Wind className={`text-blue-500 transition-all duration-500
                 ${phase === 'exhale' ? 'opacity-0 scale-50' : 'opacity-100 scale-100'}
               `} size={48} />
             </div>
          </div>
        </div>

        <div className="h-20 flex items-center justify-center">
          <p className="text-4xl font-light text-white transition-all duration-300 transform">
            {text}
          </p>
        </div>

        <div className="mt-8 text-slate-400 font-medium">
          Completed Cycles: <span className="text-white">{cycles}</span>
        </div>
      </div>
    </div>
  );
};