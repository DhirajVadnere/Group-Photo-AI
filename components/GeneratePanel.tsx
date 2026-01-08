
import React, { useEffect, useState } from 'react';
import { AppState } from '../types';

interface GeneratePanelProps {
  state: AppState;
  onGenerate: () => void;
  onBack: () => void;
}

const GeneratePanel: React.FC<GeneratePanelProps> = ({ state, onGenerate, onBack }) => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Preparing director's prompt...");
  const [statusIndex, setStatusIndex] = useState(0);

  const statusMessages = [
    "Analyzing reference faces...",
    "Extracting identity features...",
    "Setting up Flash 2.5 pipeline...",
    "Arranging composition based on pose...",
    "Calculating lighting and shadows...",
    "Synthesizing 3D environment...",
    "Rendering textures and details...",
    "Finalizing high-speed composite..."
  ];

  useEffect(() => {
    if (state.isGenerating) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 99) return prev;
          const increment = prev > 80 ? Math.random() * 0.5 : Math.random() * 4;
          return Math.min(99, prev + increment);
        });
      }, 300);

      const statusInterval = setInterval(() => {
        setStatusIndex(prev => (prev + 1) % statusMessages.length);
      }, 3000);

      return () => {
        clearInterval(interval);
        clearInterval(statusInterval);
      };
    } else {
      setProgress(0);
      setStatusIndex(0);
    }
  }, [state.isGenerating]);

  useEffect(() => {
    setStatus(statusMessages[statusIndex]);
  }, [statusIndex]);

  if (state.isGenerating) {
    const RADIUS = 100;
    const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

    return (
      <div className="max-w-2xl mx-auto p-12 text-center space-y-16 animate-in fade-in zoom-in duration-700">
        <div className="relative w-64 h-64 mx-auto group">
          {/* Outer Ambient Glow */}
          <div className="absolute inset-0 rounded-full bg-indigo-500/10 dark:bg-indigo-500/5 blur-3xl animate-pulse" />
          
          <svg 
            viewBox="0 0 256 256" 
            className="w-full h-full transform -rotate-90 relative z-10 overflow-visible"
          >
            <defs>
              <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#4f46e5" />
                <stop offset="100%" stopColor="#9333ea" />
              </linearGradient>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            
            {/* Background Track */}
            <circle 
              cx="128" cy="128" r={RADIUS} 
              stroke="currentColor" 
              strokeWidth="8" 
              fill="transparent" 
              className="text-gray-100 dark:text-gray-800/50" 
            />
            
            {/* Main Progress Bar */}
            <circle 
              cx="128" cy="128" r={RADIUS} 
              stroke="url(#progressGradient)" 
              strokeWidth="10" 
              fill="transparent" 
              className="transition-all duration-700 ease-out"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={CIRCUMFERENCE - (CIRCUMFERENCE * progress) / 100}
              strokeLinecap="round"
              filter="url(#glow)"
            />

            {/* Glowing Pointer */}
            {progress > 0 && (
              <circle
                cx="128"
                cy="128"
                r="6"
                fill="white"
                className="transition-all duration-700 ease-out"
                style={{
                  transformOrigin: '128px 128px',
                  transform: `rotate(${(progress / 100) * 360}deg) translateY(-${RADIUS}px)`,
                  filter: 'drop-shadow(0 0 8px rgba(79, 70, 229, 0.9))'
                }}
              />
            )}
          </svg>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
            <div className="relative">
              <span className="text-6xl font-black text-gray-900 dark:text-white tabular-nums tracking-tighter">
                {Math.floor(progress)}
              </span>
              <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 align-top ml-1">%</span>
            </div>
            <div className="mt-2 flex gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-bounce [animation-delay:-0.3s]" />
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-bounce [animation-delay:-0.15s]" />
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-bounce" />
            </div>
          </div>
        </div>

        <div className="space-y-6 max-w-sm mx-auto">
          <div className="h-8 overflow-hidden">
            <p key={status} className="text-lg font-bold text-gray-900 dark:text-white animate-in slide-in-from-bottom-2 duration-500 fill-mode-forwards">
              {status}
            </p>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-[10px] font-bold text-gray-400 dark:text-gray-600 uppercase tracking-widest px-1">
              <span>Initialization</span>
              <span>Rendering</span>
              <span>Finalizing</span>
            </div>
            <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden flex">
              <div 
                className="h-full bg-indigo-600 transition-all duration-500 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          
          <p className="text-sm text-gray-400 dark:text-gray-500 italic">
            Usually takes 5-15 seconds. Please don't close this tab.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 animate-in slide-in-from-bottom-2 duration-500">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white transition-colors">Final Summary</h2>
        <p className="text-gray-500 dark:text-gray-400">Ready to composite your portraits using Gemini 2.5 Flash.</p>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-xl overflow-hidden transition-colors">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="p-8 bg-gray-50/50 dark:bg-gray-800/50 space-y-6">
            <h3 className="text-sm font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Composition</h3>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white dark:bg-gray-900 rounded-2xl flex items-center justify-center text-3xl shadow-sm border border-gray-100 dark:border-gray-800">
                {state.selectedPose?.thumbnail}
              </div>
              <div>
                <p className="font-bold text-gray-900 dark:text-white">{state.selectedPose?.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{state.images.length} People</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {state.images.map(img => (
                <div key={img.id} className="relative">
                  <img src={img.url} className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-950 shadow-sm object-cover" alt="Subject" />
                </div>
              ))}
            </div>
          </div>
          
          <div className="p-8 space-y-6">
            <h3 className="text-sm font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Technical</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-xs text-gray-400 dark:text-gray-600">Scene</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{state.scene}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-400 dark:text-gray-600">Aspect Ratio</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{state.aspectRatio}</p>
              </div>
              <div className="space-y-1 col-span-2">
                <p className="text-xs text-gray-400 dark:text-gray-600">Active Modes</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {state.preserveOutfits && <span className="px-2 py-0.5 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-300 text-[10px] font-bold rounded-full">Outfits Preserved</span>}
                  {state.sharedBackground && <span className="px-2 py-0.5 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-300 text-[10px] font-bold rounded-full">Shared Context</span>}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="px-8 py-6 bg-indigo-600 dark:bg-indigo-700 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-indigo-100 dark:text-indigo-200 text-sm">Everything ready. Fast generation active.</p>
          <button
            onClick={onGenerate}
            className="w-full sm:w-auto px-10 py-3 bg-white text-indigo-600 dark:text-indigo-700 rounded-full font-bold hover:bg-indigo-50 transition-all shadow-lg text-lg active:scale-95"
          >
            Start Generation
          </button>
        </div>
      </div>

      {state.error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 flex gap-3 text-red-700 dark:text-red-400 animate-in shake duration-500">
          <div className="text-sm flex-grow">
            <p className="font-bold">Error</p>
            <p>{state.error}</p>
          </div>
          <button 
            onClick={onGenerate}
            className="text-xs font-bold uppercase tracking-wider bg-red-100 dark:bg-red-900/40 px-3 py-1 rounded-lg hover:bg-red-200"
          >
            Retry
          </button>
        </div>
      )}

      <div className="flex justify-center">
        <button onClick={onBack} className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors">
          Back to Styles
        </button>
      </div>
    </div>
  );
};

export default GeneratePanel;
