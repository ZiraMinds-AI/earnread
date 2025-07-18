
import React from 'react';

interface RewardedAdPromptProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const RewardedAdPrompt: React.FC<RewardedAdPromptProps> = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl max-w-sm w-full p-6 text-center">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Unlock More Content</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-6">Watch a short ad to unlock the next pages and earn a bonus!</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onCancel}
            className="px-6 py-2 bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-medium rounded-md hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2 bg-primary-600 text-white font-semibold rounded-md hover:bg-primary-700 transition-colors"
          >
            Watch Ad
          </button>
        </div>
      </div>
    </div>
  );
};

export default RewardedAdPrompt;
