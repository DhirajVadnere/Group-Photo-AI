
import React from 'react';
import { Step } from '../types';

interface StepperProps {
  currentStep: string;
  onStepClick: (step: Step) => void;
  completedSteps: Step[];
}

const STEPS = [
  { id: Step.UPLOAD, label: 'Upload' },
  { id: Step.POSE, label: 'Pose' },
  { id: Step.STYLE, label: 'Style' },
  { id: Step.GENERATE, label: 'Generate' }
];

const Stepper: React.FC<StepperProps> = ({ currentStep, onStepClick, completedSteps }) => {
  if (currentStep === Step.LANDING || currentStep === Step.RESULT) return null;

  return (
    <nav className="flex items-center justify-center py-6 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 overflow-x-auto no-scrollbar transition-colors">
      <div className="flex items-center gap-2 px-4 whitespace-nowrap">
        {STEPS.map((step, idx) => {
          const isActive = currentStep === step.id;
          const isCompleted = completedSteps.includes(step.id as Step);
          const isClickable = isCompleted || isActive;

          return (
            <React.Fragment key={step.id}>
              <button
                onClick={() => isClickable && onStepClick(step.id as Step)}
                disabled={!isClickable}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all text-sm font-medium ${
                  isActive 
                    ? 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 ring-1 ring-indigo-200 dark:ring-indigo-800' 
                    : isCompleted 
                      ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 cursor-pointer' 
                      : 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                }`}
              >
                <span className={`w-5 h-5 flex items-center justify-center rounded-full text-[10px] ${
                  isActive ? 'bg-indigo-600 text-white' : isCompleted ? 'bg-green-600 text-white' : 'bg-gray-200 dark:bg-gray-800'
                }`}>
                  {isCompleted && !isActive ? '✓' : idx + 1}
                </span>
                {step.label}
              </button>
              {idx < STEPS.length - 1 && (
                <div className="w-8 h-px bg-gray-200 dark:bg-gray-800" />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </nav>
  );
};

export default Stepper;
