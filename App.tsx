import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Hero } from './components/Hero';
import { Sidebar } from './components/Sidebar';
import { ContentSection } from './components/ContentSection';
import { AssessmentModal } from './components/AssessmentModal';
import { Dashboard } from './components/Dashboard';
import { BreathingExercise } from './components/BreathingExercise';
import { SECTIONS, DEFAULT_DAILY_TASKS } from './constants';
import { SavedReport, DailyTask } from './types';
import { GoogleGenAI } from "@google/genai";

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Assessment State
  const [assessmentSectionId, setAssessmentSectionId] = useState<string | null>(null);
  
  // Persistence State
  const [savedReports, setSavedReports] = useState<SavedReport[]>([]);
  const [dailyTasks, setDailyTasks] = useState<DailyTask[]>(DEFAULT_DAILY_TASKS);
  
  // Utilities State
  const [isBreathingOpen, setIsBreathingOpen] = useState(false);

  // Initialize Data & Handle Daily Reset
  useEffect(() => {
    // 1. Load Reports
    const loadedReports = localStorage.getItem('huberman_reports');
    if (loadedReports) {
      try {
        setSavedReports(JSON.parse(loadedReports));
      } catch (e) {
        console.error("Failed to parse reports", e);
      }
    }

    // 2. Load Tasks & Check Date
    const loadedTasks = localStorage.getItem('huberman_tasks');
    const lastDate = localStorage.getItem('huberman_last_active_date');
    const today = new Date().toDateString();

    if (loadedTasks) {
      try {
        let tasks: DailyTask[] = JSON.parse(loadedTasks);
        
        // If it's a new day (or first time tracking date), reset tasks
        if (lastDate !== today) {
          tasks = tasks.map(t => ({ ...t, completed: false }));
          localStorage.setItem('huberman_last_active_date', today);
          // We don't save to 'huberman_tasks' immediately here to let the next effect handle it, 
          // or we can to be safe. Let's rely on state update.
        }
        
        // Merge with DEFAULT_DAILY_TASKS to ensure new protocol updates appear for old users
        // This keeps old task states if IDs match, adds new ones, removes obsolete ones
        const mergedTasks = DEFAULT_DAILY_TASKS.map(defaultTask => {
          const existing = tasks.find(t => t.id === defaultTask.id);
          return existing ? { ...defaultTask, completed: existing.completed } : defaultTask;
        });

        setDailyTasks(mergedTasks);
      } catch (e) {
        console.error("Failed to parse tasks", e);
        setDailyTasks(DEFAULT_DAILY_TASKS);
        localStorage.setItem('huberman_last_active_date', today);
      }
    } else {
      // First time initialization
      setDailyTasks(DEFAULT_DAILY_TASKS);
      localStorage.setItem('huberman_last_active_date', today);
    }
  }, []);

  // Save Tasks to LocalStorage whenever they change
  useEffect(() => {
    localStorage.setItem('huberman_tasks', JSON.stringify(dailyTasks));
  }, [dailyTasks]);

  // Save Reports to LocalStorage whenever they change
  useEffect(() => {
    localStorage.setItem('huberman_reports', JSON.stringify(savedReports));
  }, [savedReports]);

  // Handle scroll detection for Active Section Highlight
  useEffect(() => {
    if (activeSection === 'dashboard') return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      
      if (scrollPosition < 500) {
        setActiveSection('hero');
        return;
      }

      for (const section of SECTIONS) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  const handleNavigate = (id: string) => {
    setActiveSection(id);
    if (id !== 'dashboard') {
      // Give a small delay to allow state update if moving from dashboard
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          window.scrollTo({
            top: element.offsetTop - 40,
            behavior: 'smooth'
          });
        }
      }, 0);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const handleAssessmentAnalysis = async (answers: Record<string, any>): Promise<string> => {
    if (!assessmentSectionId) return "Error: No active section";
    const section = SECTIONS.find(s => s.id === assessmentSectionId);
    if (!section) return "Error: Section not found";

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const model = "gemini-2.5-flash";

      const prompt = `
        You are Andrew Huberman.
        Topic: ${section.title}.
        User Data: ${JSON.stringify(answers)}.
        Protocol: ${section.summary}.
        
        Provide a concise HTML assessment (use <h4>, <p>, <ul>, <li> tags ONLY, no markdown code blocks):
        1. <h4>Analysis</h4>
        2. <h4>Strengths</h4>
        3. <h4>Protocol Adjustments</h4>
        Keep it scientific, encouraging, and under 300 words.
      `;

      const response = await ai.models.generateContent({
        model: model,
        contents: prompt,
      });

      return response.text;
    } catch (error) {
      console.error("AI Error:", error);
      return "<p class='text-red-500'>Unable to connect to AI service. Please check your API Key.</p>";
    }
  };

  const saveCurrentReport = (content: string) => {
    if (!assessmentSectionId) return;
    const section = SECTIONS.find(s => s.id === assessmentSectionId);
    if (!section) return;

    const newReport: SavedReport = {
      id: Date.now().toString(),
      sectionId: section.id,
      sectionTitle: section.title,
      date: new Date().toISOString(),
      content: content
    };

    setSavedReports(prev => [newReport, ...prev]);
  };

  const toggleTask = (taskId: string) => {
    setDailyTasks(prev => prev.map(t => 
      t.id === taskId ? { ...t, completed: !t.completed } : t
    ));
  };

  const deleteReport = (reportId: string) => {
    setSavedReports(prev => prev.filter(r => r.id !== reportId));
    // If deleted report was selected, deselect it
    // Note: Dashboard component holds the selected state, so it might persist visually until another is clicked
    // Ideally we pass a clear selection callback, but for simplicity user just selects another.
  };

  const activeAssessmentData = SECTIONS.find(s => s.id === assessmentSectionId);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans">
      
      {/* Mobile Header */}
      <div className="md:hidden sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 px-4 py-3 flex items-center justify-between">
        <span className="font-bold text-slate-800 text-lg tracking-tight">Huberman Protocol</span>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-72 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out md:translate-x-0 md:sticky md:top-0 md:h-screen overflow-y-auto
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        shadow-xl md:shadow-none
      `}>
        <div className="p-6">
          <Sidebar activeSection={activeSection} onNavigate={handleNavigate} />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 lg:p-12 max-w-7xl mx-auto w-full min-h-screen">
        
        {activeSection === 'dashboard' ? (
          <Dashboard 
            savedReports={savedReports}
            dailyTasks={dailyTasks}
            onToggleTask={toggleTask}
            onDeleteReport={deleteReport}
            onOpenBreathing={() => setIsBreathingOpen(true)}
          />
        ) : (
          <>
            <div id="hero" className="scroll-mt-24">
              <Hero />
            </div>
            <div className="space-y-12">
              {SECTIONS.map((section) => (
                <ContentSection 
                  key={section.id} 
                  data={section} 
                  onOpenAssessment={setAssessmentSectionId}
                />
              ))}
            </div>
          </>
        )}

        <footer className="mt-24 py-8 border-t border-slate-200 text-center text-slate-400 text-sm">
          <p className="mb-2">Disclaimer: This is a summary of public information and personal experiments.</p>
          <p>Not medical advice. Consult a professional before changing your health regimen.</p>
        </footer>
      </main>

      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-30 md:hidden backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* AI Assessment Modal */}
      {activeAssessmentData && (
        <AssessmentModal 
          isOpen={!!assessmentSectionId}
          onClose={() => setAssessmentSectionId(null)}
          title={activeAssessmentData.title}
          questions={activeAssessmentData.assessmentQuestions || []}
          onAnalyze={handleAssessmentAnalysis}
          onSave={saveCurrentReport}
        />
      )}

      {/* Breathing Exercise Modal */}
      {isBreathingOpen && (
        <BreathingExercise onClose={() => setIsBreathingOpen(false)} />
      )}
    </div>
  );
};

export default App;