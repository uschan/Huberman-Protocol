import React, { useState } from 'react';
import { X, Sparkles, Loader2, Send, Save } from 'lucide-react';
import { AssessmentQuestion } from '../types';

interface AssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  questions: AssessmentQuestion[];
  onAnalyze: (answers: Record<string, any>) => Promise<string>;
  onSave: (result: string) => void;
}

export const AssessmentModal: React.FC<AssessmentModalProps> = ({ 
  isOpen, 
  onClose, 
  title, 
  questions,
  onAnalyze,
  onSave
}) => {
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen) return null;

  const handleInputChange = (id: string, value: any) => {
    setAnswers(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setIsSaved(false);
    try {
      const analysis = await onAnalyze(answers);
      setResult(analysis);
    } catch (error) {
      console.error("Analysis failed", error);
      setResult("Sorry, AI analysis failed. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = () => {
    if (result) {
      onSave(result);
      setIsSaved(true);
    }
  };

  const reset = () => {
    setResult(null);
    setAnswers({});
    setIsSaved(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
              <Sparkles size={20} />
            </div>
            <div>
              <h3 className="font-bold text-slate-800">AI Health Assessment</h3>
              <p className="text-xs text-slate-500">Focus: {title}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-200 rounded-full text-slate-400 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {!result ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl text-sm text-blue-800 mb-6">
                Please answer the following questions truthfully. Our AI, based on the Huberman Lab protocols, will analyze your habits and provide a personalized optimization plan.
              </div>

              {questions.map((q) => (
                <div key={q.id} className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700">
                    {q.label}
                  </label>
                  
                  {q.type === 'select' && q.options ? (
                    <div className="grid grid-cols-2 gap-2">
                      {q.options.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => handleInputChange(q.id, opt)}
                          className={`py-2 px-3 text-sm rounded-lg border transition-all ${
                            answers[q.id] === opt
                              ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                              : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:bg-blue-50'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <input
                      type={q.type === 'number' ? 'number' : 'text'}
                      className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                      placeholder={q.placeholder || 'Your answer...'}
                      value={answers[q.id] || ''}
                      onChange={(e) => handleInputChange(q.id, e.target.value)}
                      required
                    />
                  )}
                </div>
              ))}

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-slate-900 text-white font-semibold py-3 rounded-xl hover:bg-slate-800 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Analyzing Protocols...
                    </>
                  ) : (
                    <>
                      <Sparkles size={20} />
                      Generate AI Report
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
              <div className="prose prose-slate prose-sm max-w-none">
                <div dangerouslySetInnerHTML={{ __html: result }} />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={reset}
                  className="w-full border border-slate-200 text-slate-600 font-semibold py-3 rounded-xl hover:bg-slate-50 transition-all"
                >
                  Assess Again
                </button>
                <button
                  onClick={handleSave}
                  disabled={isSaved}
                  className={`w-full font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2
                    ${isSaved 
                      ? 'bg-green-100 text-green-700 border border-green-200' 
                      : 'bg-purple-600 text-white hover:bg-purple-700 shadow-lg'
                    }`}
                >
                  {isSaved ? (
                    <>
                      <Save size={18} />
                      Saved to Profile
                    </>
                  ) : (
                    <>
                      <Save size={18} />
                      Save Report
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};