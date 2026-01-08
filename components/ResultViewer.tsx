
import React, { useState } from 'react';
import { downloadImage } from '../services/imageUtils';
import { UserImage } from '../types';
import { GeminiService } from '../services/geminiService';

interface ResultViewerProps {
  imageUrl: string;
  inputs: UserImage[];
  onRegenerate: () => void;
  onNew: () => void;
  onImageUpdate: (newUrl: string) => void;
}

const ResultViewer: React.FC<ResultViewerProps> = ({ imageUrl, inputs, onRegenerate, onNew, onImageUpdate }) => {
  const [editPrompt, setEditPrompt] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editError, setEditError] = useState<string | null>(null);

  const handleApplyEdit = async () => {
    if (!editPrompt.trim()) return;
    setIsEditing(true);
    setEditError(null);
    try {
      const newUrl = await GeminiService.editImage({
        base64Image: imageUrl,
        prompt: editPrompt,
      });
      onImageUpdate(newUrl);
      setEditPrompt('');
    } catch (err: any) {
      setEditError(err.message || "Failed to apply edit.");
    } finally {
      setIsEditing(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8 pb-20">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white transition-colors">Generation Complete!</h2>
        <p className="text-gray-500 dark:text-gray-400">Your custom group photo is ready.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white dark:bg-gray-900 p-2 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden group relative transition-colors">
            <div className={`relative transition-all ${isEditing ? 'opacity-50 grayscale blur-[1px]' : ''}`}>
              <img 
                src={imageUrl} 
                alt="Generated Group" 
                className="w-full h-auto rounded-2xl" 
              />
              {isEditing && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/80 dark:bg-gray-950/80 backdrop-blur-md px-6 py-3 rounded-full shadow-lg flex items-center gap-3">
                    <div className="w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                    <span className="font-bold text-indigo-600 dark:text-indigo-400">Applying edit...</span>
                  </div>
                </div>
              )}
            </div>
            <div className="absolute top-6 right-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button 
                onClick={() => downloadImage(imageUrl, 'group-photo.png')}
                className="bg-white/90 dark:bg-gray-800/90 p-3 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-700 transition-colors"
                title="Download PNG"
              >
                <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-xl border border-indigo-100 dark:border-indigo-900/30 space-y-4 transition-colors">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <span className="text-indigo-600 dark:text-indigo-400">✨</span> Quick Refinement
            </h3>
            <div className="flex gap-2">
              <input 
                type="text" 
                value={editPrompt}
                onChange={(e) => setEditPrompt(e.target.value)}
                placeholder="e.g. 'Add a retro filter', 'Make the background a beach', 'Remove the person on the left'..."
                className="flex-grow bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                onKeyDown={(e) => e.key === 'Enter' && handleApplyEdit()}
              />
              <button 
                onClick={handleApplyEdit}
                disabled={isEditing || !editPrompt.trim()}
                className={`px-6 py-3 rounded-xl font-bold text-sm transition-all ${
                  isEditing || !editPrompt.trim() 
                  ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed' 
                  : 'bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95 shadow-md'
                }`}
              >
                Apply Edit
              </button>
            </div>
            {editError && <p className="text-xs text-red-500">{editError}</p>}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => downloadImage(imageUrl, 'group-photo.png')}
              className="px-8 py-3 bg-indigo-600 text-white rounded-full font-bold hover:bg-indigo-700 transition-all shadow-lg flex items-center justify-center gap-2"
            >
              Download Photo
            </button>
            <button
              onClick={onRegenerate}
              className="px-8 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 rounded-full font-bold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all shadow-sm flex items-center justify-center gap-2"
            >
              Regenerate
            </button>
            <button
              onClick={onNew}
              className="px-8 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 rounded-full font-bold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all shadow-sm flex items-center justify-center gap-2"
            >
              Create New Photo
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 transition-colors">
            <h3 className="text-sm font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4">Input Portraits</h3>
            <div className="grid grid-cols-3 gap-2">
              {inputs.map(img => (
                <img 
                  key={img.id} 
                  src={img.url} 
                  className="w-full h-20 object-cover rounded-lg border border-gray-100 dark:border-gray-800" 
                  alt="Input" 
                />
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800">
               <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs font-bold mb-2">
                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                 </svg>
                 AI Insight
               </div>
               <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                 The model analyzed facial geometries from your inputs and synthesized them into a singular group context while maintaining character consistency.
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultViewer;
