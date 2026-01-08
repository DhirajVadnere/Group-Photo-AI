
import React, { useState, useCallback, useEffect } from 'react';
import AppShell from './components/AppShell';
import Stepper from './components/Stepper';
import UploadPanel from './components/UploadPanel';
import PosePicker from './components/PosePicker';
import StylePanel from './components/StylePanel';
import GeneratePanel from './components/GeneratePanel';
import ResultViewer from './components/ResultViewer';
import { HowItWorksModal, ExamplesModal } from './components/InfoModals';
import { AppState, Step, UserImage, Pose, AspectRatio } from './types';
import { GeminiService } from './services/geminiService';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    step: 'landing',
    images: [],
    selectedPose: null,
    scene: 'Studio neutral (soft grey)',
    aspectRatio: '1:1',
    preserveOutfits: true,
    sharedBackground: true,
    generatedImageUrl: null,
    isGenerating: false,
    error: null,
  });

  const [completedSteps, setCompletedSteps] = useState<Step[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeModal, setActiveModal] = useState<'how-it-works' | 'examples' | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' || 
             (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const hasKey = await (window as any).aistudio?.hasSelectedApiKey?.();
      setIsLoggedIn(!!hasKey);
    };
    checkAuthStatus();
  }, []);

  const handleSignIn = async () => {
    if ((window as any).aistudio?.openSelectKey) {
      await (window as any).aistudio.openSelectKey();
      setIsLoggedIn(true);
    }
  };

  const updateState = useCallback((updates: Partial<AppState>) => {
    setState(prev => ({ ...prev, ...updates }));
  }, []);

  const navigateTo = useCallback((step: Step) => {
    updateState({ step });
    setCompletedSteps(prev => {
      if (prev.includes(step)) return prev;
      return [...prev, step];
    });
  }, [updateState]);

  const handleGenerate = async () => {
    if (!state.selectedPose) return;

    const hasKey = await (window as any).aistudio?.hasSelectedApiKey?.();
    if (!hasKey) {
      await handleSignIn();
    }
    
    updateState({ isGenerating: true, error: null });

    try {
      const url = await GeminiService.generateGroupPhoto({
        images: state.images,
        pose: state.selectedPose,
        scene: state.scene,
        aspectRatio: state.aspectRatio,
        preserveOutfits: state.preserveOutfits,
        sharedBackground: state.sharedBackground,
      });

      updateState({ generatedImageUrl: url, isGenerating: false, step: Step.RESULT });
    } catch (err: any) {
      if (err.message === "AUTH_REQUIRED") {
        setIsLoggedIn(false);
        await handleSignIn();
      } else {
        updateState({ isGenerating: false, error: err.message || "Failed to generate image. Please try again." });
      }
    }
  };

  const handleRegenerate = () => {
    updateState({ step: Step.GENERATE });
    handleGenerate();
  };

  const handleStartOver = () => {
    setState({
      step: 'landing',
      images: [],
      selectedPose: null,
      scene: 'Studio neutral (soft grey)',
      aspectRatio: '1:1',
      preserveOutfits: true,
      sharedBackground: true,
      generatedImageUrl: null,
      isGenerating: false,
      error: null,
    });
    setCompletedSteps([]);
  };

  return (
    <AppShell 
      isDarkMode={isDarkMode} 
      onToggleDarkMode={() => setIsDarkMode(!isDarkMode)} 
      onLogoClick={handleStartOver}
      onHowItWorksClick={() => setActiveModal('how-it-works')}
      onExamplesClick={() => setActiveModal('examples')}
      onSignInClick={handleSignIn}
      isLoggedIn={isLoggedIn}
    >
      <HowItWorksModal isOpen={activeModal === 'how-it-works'} onClose={() => setActiveModal(null)} />
      <ExamplesModal isOpen={activeModal === 'examples'} onClose={() => setActiveModal(null)} />

      {state.step === Step.LANDING ? (
        <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-block px-4 py-1.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            Gemini 2.5 Flash Rendering Engine
          </div>
          <h2 className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight">
            Bring your people <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
              Together.
            </span>
          </h2>
          <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Fast, high-quality group photo generation. Perfect for remote teams, families, and friends.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <button
              onClick={() => navigateTo(Step.UPLOAD)}
              className="px-10 py-4 bg-indigo-600 text-white rounded-full font-bold text-lg hover:bg-indigo-700 transition-all shadow-xl hover:-translate-y-1 active:scale-95"
            >
              Start Creating
            </button>
            <button 
              onClick={() => setActiveModal('examples')}
              className="px-10 py-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 rounded-full font-bold text-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all shadow-sm"
            >
              View Examples
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 grayscale opacity-40 dark:opacity-20">
            <div className="bg-gray-200 dark:bg-gray-800 h-32 rounded-2xl flex items-center justify-center text-4xl">📸</div>
            <div className="bg-gray-200 dark:bg-gray-800 h-32 rounded-2xl flex items-center justify-center text-4xl">⚡</div>
            <div className="bg-gray-200 dark:bg-gray-800 h-32 rounded-2xl flex items-center justify-center text-4xl">👥</div>
            <div className="bg-gray-200 dark:bg-gray-800 h-32 rounded-2xl flex items-center justify-center text-4xl">🏛️</div>
          </div>
        </div>
      ) : (
        <>
          <Stepper 
            currentStep={state.step} 
            onStepClick={navigateTo} 
            completedSteps={completedSteps} 
          />
          
          <div className="pb-12 px-4">
            <div className="max-w-7xl mx-auto">
              {state.step === Step.UPLOAD && (
                <UploadPanel 
                  images={state.images} 
                  onImagesChange={(imgs) => updateState({ images: imgs })} 
                  onNext={() => navigateTo(Step.POSE)} 
                />
              )}

              {state.step === Step.POSE && (
                <PosePicker 
                  selectedPose={state.selectedPose} 
                  onPoseSelect={(pose) => updateState({ selectedPose: pose })} 
                  onNext={() => navigateTo(Step.STYLE)} 
                  onBack={() => navigateTo(Step.UPLOAD)} 
                  numPeople={state.images.length}
                />
              )}

              {state.step === Step.STYLE && (
                <StylePanel 
                  scene={state.scene} onSceneChange={(s) => updateState({ scene: s })}
                  aspectRatio={state.aspectRatio} onAspectRatioChange={(v) => updateState({ aspectRatio: v })}
                  preserveOutfits={state.preserveOutfits} onPreserveOutfitsChange={(v) => updateState({ preserveOutfits: v })}
                  sharedBackground={state.sharedBackground} onSharedBackgroundChange={(v) => updateState({ sharedBackground: v })}
                  onNext={() => navigateTo(Step.GENERATE)}
                  onBack={() => navigateTo(Step.POSE)}
                />
              )}

              {state.step === Step.GENERATE && (
                <GeneratePanel 
                  state={state} 
                  onGenerate={handleGenerate} 
                  onBack={() => navigateTo(Step.STYLE)} 
                />
              )}

              {state.step === Step.RESULT && state.generatedImageUrl && (
                <ResultViewer 
                  imageUrl={state.generatedImageUrl} 
                  inputs={state.images} 
                  onRegenerate={handleRegenerate} 
                  onNew={handleStartOver} 
                  onImageUpdate={(newUrl) => updateState({ generatedImageUrl: newUrl })}
                />
              )}
            </div>
          </div>
        </>
      )}
    </AppShell>
  );
};

export default App;
