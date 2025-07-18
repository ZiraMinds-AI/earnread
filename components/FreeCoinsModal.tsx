import React from 'react';
import { CoinIcon } from './icons/CoinIcon';

const REWARD_AMOUNT = 5;

interface FreeCoinsModalProps {
  isOpen: boolean;
  isClaiming: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const FreeCoinsModal: React.FC<FreeCoinsModalProps> = ({ isOpen, isClaiming, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl max-w-sm w-full p-6 text-center relative">
        <button onClick={onCancel} className="absolute top-3 right-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200" disabled={isClaiming}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
        <div className="text-amber-400 mb-4">
            <CoinIcon className="w-16 h-16 inline-block" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Get Free Coins!</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          Watch a short ad to earn <span className="font-bold text-amber-500">{REWARD_AMOUNT} points</span>.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onCancel}
            disabled={isClaiming}
            className="px-6 py-2 bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-medium rounded-md hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isClaiming}
            className="w-36 px-6 py-2 bg-primary-600 text-white font-semibold rounded-md hover:bg-primary-700 transition-colors shadow-lg flex items-center justify-center disabled:bg-primary-400 dark:disabled:bg-primary-800"
          >
            {isClaiming ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              </>
            ) : (
              'Watch Ad'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FreeCoinsModal;
