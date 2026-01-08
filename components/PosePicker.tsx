
import React from 'react';
import { Pose } from '../types';
import { POSES } from '../constants';

interface PosePickerProps {
  selectedPose: Pose | null;
  onPoseSelect: (pose: Pose) => void;
  onNext: () => void;
  onBack: () => void;
  numPeople: number;
}

const PosePicker: React.FC<PosePickerProps> = ({ selectedPose, onPoseSelect, onNext, onBack, numPeople }) => {
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white transition-colors">Choose a Pose</h2>
        <p className="text-gray-500 dark:text-gray-400">How should the people be arranged in the photo?</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {POSES.map((pose) => (
          <button
            key={pose.id}
            onClick={() => onPoseSelect(pose)}
            className={`flex flex-col text-left p-4 rounded-2xl border-2 transition-all group ${
              selectedPose?.id === pose.id
                ? 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-600 ring-2 ring-indigo-600 ring-offset-2 dark:ring-offset-gray-950'
                : 'bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800 hover:border-indigo-200 dark:hover:border-indigo-800 shadow-sm'
            }`}
          >
            <div className="text-4xl mb-3 h-12 flex items-center justify-center grayscale group-hover:grayscale-0 transition-all dark:bg-gray-800/50 rounded-xl">
              {pose.thumbnail}
            </div>
            <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-1">{pose.name}</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed flex-grow">{pose.description}</p>
            <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800">
                <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-tight">{pose.hint}</span>
            </div>
          </button>
        ))}
      </div>

      {selectedPose && (
        <div className="bg-indigo-600 text-white dark:bg-indigo-700 rounded-2xl p-6 shadow-xl animate-in fade-in slide-in-from-bottom-2">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="space-y-1">
              <h4 className="font-bold text-lg">Selected: {selectedPose.name}</h4>
              <p className="text-indigo-100 text-sm">
                Director rules for {numPeople} people: {selectedPose.rules(numPeople)}
              </p>
            </div>
            <button
              onClick={onNext}
              className="px-8 py-3 bg-white text-indigo-600 dark:text-indigo-700 rounded-full font-bold hover:bg-indigo-50 transition-colors whitespace-nowrap shadow-md"
            >
              Continue to Style
            </button>
          </div>
        </div>
      )}

      <div className="flex justify-center">
        <button onClick={onBack} className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors">
          Go back to Uploads
        </button>
      </div>
    </div>
  );
};

export default PosePicker;
