
import React, { useCallback, useRef, useState } from 'react';
import { UserImage } from '../types';
import { fileToBase64 } from '../services/imageUtils';

interface UploadPanelProps {
  images: UserImage[];
  onImagesChange: (images: UserImage[]) => void;
  onNext: () => void;
}

const UploadPanel: React.FC<UploadPanelProps> = ({ images, onImagesChange, onNext }) => {
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const processFile = async (file: File, index: number) => {
    if (!file.type.startsWith('image/')) return;
    
    const base64 = await fileToBase64(file);
    
    const newImage: UserImage = {
      id: Math.random().toString(36).substring(7),
      url: URL.createObjectURL(file),
      file,
      base64,
      isBestFace: false
    };

    const updatedImages = [...images];
    if (index < updatedImages.length) {
      updatedImages[index] = newImage;
    } else {
      updatedImages.push(newImage);
    }
    
    onImagesChange(updatedImages);
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const files = Array.from(e.target.files || []) as File[];
    if (files.length === 0) return;

    await processFile(files[0], index);
    if (e.target) e.target.value = '';
  };

  const handleDragOver = (e: React.DragEvent, index: number, isEnabled: boolean) => {
    e.preventDefault();
    if (isEnabled) {
      setDragOverIndex(index);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;
    if (x <= rect.left || x >= rect.right || y <= rect.top || y >= rect.bottom) {
      setDragOverIndex(null);
    }
  };

  const handleDrop = async (e: React.DragEvent, index: number, isEnabled: boolean) => {
    e.preventDefault();
    setDragOverIndex(null);
    if (!isEnabled) return;

    const files = Array.from(e.dataTransfer.files) as File[];
    if (files.length > 0) {
      await processFile(files[0], index);
    }
  };

  const removeImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    onImagesChange(updatedImages);
  };

  const toggleBestFace = (id: string) => {
    onImagesChange(images.map(img => ({
      ...img,
      isBestFace: img.id === id ? !img.isBestFace : img.isBestFace
    })));
  };

  const isValid = images.length >= 2 && images.length <= 5;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-10">
      <div className="text-center space-y-3">
        <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">Upload Portraits</h2>
        <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
          Add 2 to 5 individual portraits. Each person will be seamlessly integrated into your group photo.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {[0, 1, 2, 3, 4].map((index) => {
          const img = images[index];
          const isSlotEnabled = index <= images.length;
          const isDraggingOver = dragOverIndex === index;

          return (
            <div 
              key={index}
              className={`relative h-64 rounded-3xl border-2 transition-all duration-300 overflow-hidden flex flex-col group ${
                img 
                  ? 'border-indigo-100 dark:border-indigo-900/50 bg-white dark:bg-gray-900 shadow-md' 
                  : isSlotEnabled 
                    ? `border-dashed ${isDraggingOver ? 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-500 scale-[1.02] shadow-lg ring-4 ring-indigo-100 dark:ring-indigo-900/40' : 'border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 hover:bg-white dark:hover:bg-gray-800 hover:border-indigo-300 dark:hover:border-indigo-700'} cursor-pointer` 
                    : 'border-dashed border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/20 opacity-50 cursor-not-allowed'
              }`}
              onClick={() => !img && isSlotEnabled && fileInputRefs.current[index]?.click()}
              onDragOver={(e) => handleDragOver(e, index, isSlotEnabled)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, index, isSlotEnabled)}
            >
              <input 
                type="file" 
                ref={el => fileInputRefs.current[index] = el}
                className="hidden" 
                accept="image/jpeg,image/png,image/webp" 
                onChange={(e) => handleFileSelect(e, index)}
                disabled={!isSlotEnabled}
              />

              {img ? (
                <>
                  <img src={img.url} alt={`Person ${index + 1}`} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3 p-4">
                    <button 
                      onClick={(e) => { e.stopPropagation(); removeImage(index); }}
                      className="w-full py-2 bg-red-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-red-600 transition-colors shadow-sm"
                    >
                      Remove
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); toggleBestFace(img.id); }}
                      className={`w-full py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-sm ${
                        img.isBestFace ? 'bg-indigo-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      {img.isBestFace ? '✨ Reference Face' : 'Set Reference'}
                    </button>
                  </div>
                  <div className="absolute bottom-2 left-2 px-2 py-1 bg-white/90 dark:bg-gray-800/90 rounded-lg text-[10px] font-bold text-gray-900 dark:text-gray-100 uppercase">
                    Person {index + 1}
                  </div>
                </>
              ) : (
                <div className="flex-grow flex flex-col items-center justify-center p-6 text-center space-y-3 relative">
                  {isDraggingOver && (
                    <div className="absolute inset-0 z-10 bg-indigo-600/10 flex flex-col items-center justify-center backdrop-blur-[1px] animate-in fade-in zoom-in duration-200">
                      <div className="bg-indigo-600 text-white px-4 py-2 rounded-full text-[10px] font-bold tracking-widest uppercase shadow-xl animate-bounce">
                        Drop Photo
                      </div>
                    </div>
                  )}

                  <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isSlotEnabled 
                      ? isDraggingOver 
                        ? 'bg-indigo-600 text-white scale-110' 
                        : 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white dark:group-hover:text-white' 
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-300 dark:text-gray-700'
                  }`}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <div className="space-y-1">
                    <p className={`text-sm font-bold ${isSlotEnabled ? 'text-gray-900 dark:text-gray-200' : 'text-gray-400 dark:text-gray-700'}`}>
                      {index === 0 || index === 1 ? 'Required' : 'Optional'}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-600">Add Person {index + 1}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex flex-col items-center gap-6 pt-4">
        {!isValid && images.length > 0 && (
          <p className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-6 py-2 rounded-full text-sm font-bold animate-pulse shadow-sm border border-red-100 dark:border-red-900/50">
            Please upload at least 2 people to proceed.
          </p>
        )}

        <button
          onClick={onNext}
          disabled={!isValid}
          className={`px-12 py-4 rounded-full font-bold text-lg transition-all shadow-xl ${
            isValid 
              ? 'bg-indigo-600 text-white hover:bg-indigo-700 hover:-translate-y-1 active:scale-95 shadow-indigo-200 dark:shadow-indigo-900/20' 
              : 'bg-gray-200 dark:bg-gray-800 text-gray-400 dark:text-gray-700 cursor-not-allowed'
          }`}
        >
          Select Pose
        </button>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 border border-gray-100 dark:border-gray-800 flex gap-4 items-start shadow-sm transition-colors">
          <div className="bg-indigo-50 dark:bg-indigo-900/30 p-3 rounded-2xl text-indigo-600 dark:text-indigo-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="space-y-1">
            <h4 className="text-gray-900 dark:text-gray-100 font-bold text-sm uppercase tracking-wider">Pro Tip</h4>
            <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">
              For best results, upload clear portraits with consistent lighting. You can drag and drop images directly into any available slot. We'll handle the complex spatial merging for you.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPanel;
