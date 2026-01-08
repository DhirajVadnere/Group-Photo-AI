
import React from 'react';
import { SCENES, ASPECT_RATIOS } from '../constants';
import { AspectRatio } from '../types';

interface StylePanelProps {
  scene: string;
  onSceneChange: (scene: string) => void;
  aspectRatio: AspectRatio;
  onAspectRatioChange: (val: AspectRatio) => void;
  preserveOutfits: boolean;
  onPreserveOutfitsChange: (val: boolean) => void;
  sharedBackground: boolean;
  onSharedBackgroundChange: (val: boolean) => void;
  onNext: () => void;
  onBack: () => void;
}

const RatioIcon: React.FC<{ ratio: AspectRatio; active: boolean }> = ({ ratio, active }) => {
  const boxStyles: Record<AspectRatio, string> = {
    '1:1': 'w-6 h-6',
    '3:4': 'w-5 h-7',
    '4:3': 'w-7 h-5',
    '9:16': 'w-4 h-8',
    '16:9': 'w-9 h-5'
  };

  return (
    <div className="w-12 h-10 flex items-center justify-center mb-2">
      <div 
        className={`border-2 rounded-[3px] transition-all duration-300 ${
          active 
            ? 'border-indigo-600 bg-indigo-600/20 scale-110' 
            : 'border-gray-400 dark:border-gray-600 group-hover:border-indigo-400'
        } ${boxStyles[ratio]}`} 
      />
    </div>
  );
};

const StylePanel: React.FC<StylePanelProps> = ({
  scene, onSceneChange,
  aspectRatio, onAspectRatioChange,
  preserveOutfits, onPreserveOutfitsChange,
  sharedBackground, onSharedBackgroundChange,
  onNext, onBack
}) => {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 animate-in slide-in-from-right duration-300">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white transition-colors">Refine the Style</h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm">Fine-tune the compositing rules for Gemini 2.5 Flash.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="space-y-3">
            <label className="block text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Scene & Background</label>
            <select 
              value={scene} 
              onChange={(e) => onSceneChange(e.target.value)}
              className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-gray-900 dark:text-gray-100 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
            >
              {SCENES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div className="space-y-3">
            <label className="block text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Aspect Ratio</label>
            <div className="grid grid-cols-3 gap-3">
              {ASPECT_RATIOS.map(ar => (
                <button
                  key={ar}
                  onClick={() => onAspectRatioChange(ar)}
                  className={`group flex flex-col items-center justify-center p-3 border-2 rounded-2xl transition-all ${
                    aspectRatio === ar 
                    ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/30 ring-1 ring-indigo-600' 
                    : 'border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-indigo-200 dark:hover:border-indigo-800'
                  }`}
                >
                  <RatioIcon ratio={ar} active={aspectRatio === ar} />
                  <span className={`text-[10px] font-bold uppercase tracking-tighter ${
                    aspectRatio === ar ? 'text-indigo-700 dark:text-indigo-400' : 'text-gray-400'
                  }`}>
                    {ar}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <label className="block text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Creative Controls</label>
          
          <div className="space-y-4">
            <button
              onClick={() => onPreserveOutfitsChange(!preserveOutfits)}
              className={`w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${
                preserveOutfits 
                ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-900/20' 
                : 'border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-indigo-200'
              }`}
            >
              <div className="text-left">
                <p className={`font-bold text-sm ${preserveOutfits ? 'text-indigo-700 dark:text-indigo-300' : 'text-gray-700 dark:text-gray-300'}`}>Preserve Outfits</p>
                <p className="text-[10px] text-gray-400">Keep exact clothing from reference photos.</p>
              </div>
              <div className={`w-10 h-6 rounded-full p-1 transition-colors ${preserveOutfits ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'}`}>
                <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${preserveOutfits ? 'translate-x-4' : 'translate-x-0'}`} />
              </div>
            </button>

            <button
              onClick={() => onSharedBackgroundChange(!sharedBackground)}
              className={`w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${
                sharedBackground 
                ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-900/20' 
                : 'border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-indigo-200'
              }`}
            >
              <div className="text-left">
                <p className={`font-bold text-sm ${sharedBackground ? 'text-indigo-700 dark:text-indigo-300' : 'text-gray-700 dark:text-gray-300'}`}>Shared Background</p>
                <p className="text-[10px] text-gray-400">Merge all people into one single 3D space.</p>
              </div>
              <div className={`w-10 h-6 rounded-full p-1 transition-colors ${sharedBackground ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'}`}>
                <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${sharedBackground ? 'translate-x-4' : 'translate-x-0'}`} />
              </div>
            </button>
          </div>

          <div className="p-4 bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/20 rounded-xl">
            <p className="text-[10px] text-amber-700 dark:text-amber-500 font-medium leading-relaxed">
              Disabling "Preserve Outfits" allows Gemini to creatively adapt clothes to better match the chosen scene for a more realistic result.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 pt-4">
        <button
          onClick={onNext}
          className="w-full sm:w-auto px-12 py-4 bg-indigo-600 text-white rounded-full font-bold text-lg hover:bg-indigo-700 hover:-translate-y-0.5 transition-all shadow-xl shadow-indigo-200 dark:shadow-none active:scale-95"
        >
          Review & Generate
        </button>
        <button onClick={onBack} className="text-gray-500 dark:text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 text-xs font-bold uppercase tracking-widest transition-colors">
          Go back to Pose Selection
        </button>
      </div>
    </div>
  );
};

export default StylePanel;
