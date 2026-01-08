
import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HowItWorksModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const steps = [
    { title: "Individual Portraits", desc: "Upload clear portraits of each person. Gemini extracts facial features and identities.", icon: "📸" },
    { title: "Spatial Arrangement", desc: "Choose a pose. Our AI director plans the group's depth, height, and overlap.", icon: "📐" },
    { title: "Context Synthesis", desc: "We place everyone in a coherent 3D scene with consistent lighting and shadows.", icon: "🎨" },
    { title: "Final Composite", desc: "Gemini renders a single, seamless high-fidelity image ready for download.", icon: "✨" }
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-gray-900 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="p-8 space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold dark:text-white">How it works</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {steps.map((s, i) => (
              <div key={i} className="flex gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
                <div className="text-3xl">{s.icon}</div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-sm">{s.title}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-indigo-600 rounded-2xl p-6 text-center text-white shadow-lg shadow-indigo-200 dark:shadow-none">
            <p className="text-sm font-medium">Ready to see it in action?</p>
            <button onClick={onClose} className="mt-3 px-8 py-2 bg-white text-indigo-600 rounded-full font-bold hover:bg-indigo-50 transition-colors">Get Started</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ExamplesModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const examples = [
    { 
      label: "Family Reunion", 
      scene: "Outdoor Park", 
      count: 4, 
      img: "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=1000&auto=format&fit=crop" 
    },
    { 
      label: "Tech Team Portrait", 
      scene: "Modern Office", 
      count: 5, 
      img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop" 
    },
    { 
      label: "Friendship Trip", 
      scene: "Urban City", 
      count: 3, 
      img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1000&auto=format&fit=crop" 
    }
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-gray-900 w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="p-8 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold dark:text-white">Sample Generations</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {examples.map((ex, i) => (
              <div key={i} className="group relative rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm bg-gray-50 dark:bg-gray-800/50">
                <img src={ex.img} alt={ex.label} className="w-full h-48 object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 dark:text-white text-sm">{ex.label}</h3>
                  <div className="flex justify-between mt-2">
                    <span className="text-[10px] text-gray-400 uppercase tracking-widest">{ex.scene}</span>
                    <span className="text-[10px] bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded-full font-bold">{ex.count} People</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-gray-400 dark:text-gray-500 italic">
            Note: All examples above demonstrate the High Fidelity mode with 4K resolution.
          </p>
        </div>
      </div>
    </div>
  );
};
