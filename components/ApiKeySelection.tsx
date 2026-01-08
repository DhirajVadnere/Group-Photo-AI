
import React from 'react';

interface ApiKeySelectionProps {
  onSelect: () => void;
}

const ApiKeySelection: React.FC<ApiKeySelectionProps> = ({ onSelect }) => {
  const handleOpenKeySelector = async () => {
    if ((window as any).aistudio?.openSelectKey) {
      await (window as any).aistudio.openSelectKey();
      onSelect();
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-indigo-100 shadow-2xl p-8 max-w-md mx-auto text-center space-y-6">
      <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto text-3xl">
        🔑
      </div>
      <div className="space-y-2">
        <h3 className="text-xl font-bold text-gray-900">API Key Required</h3>
        <p className="text-sm text-gray-500 leading-relaxed">
          High Fidelity generation uses <strong>Gemini 3 Pro</strong>, which requires a paid API key from a Google Cloud project.
        </p>
      </div>
      
      <div className="space-y-4">
        <button
          onClick={handleOpenKeySelector}
          className="w-full py-3 bg-indigo-600 text-white rounded-full font-bold hover:bg-indigo-700 transition-all shadow-lg"
        >
          Select API Key
        </button>
        <a 
          href="https://ai.google.dev/gemini-api/docs/billing" 
          target="_blank" 
          rel="noopener noreferrer"
          className="block text-xs text-indigo-600 hover:underline font-medium"
        >
          Learn about API keys and billing
        </a>
      </div>
      
      <p className="text-[10px] text-gray-400">
        Your key is used only for generation and is not stored by this application.
      </p>
    </div>
  );
};

export default ApiKeySelection;
