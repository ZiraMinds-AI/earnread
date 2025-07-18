
import React from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { CoinIcon } from './icons/CoinIcon';

const DAILY_REWARD_AMOUNT = 5;

const DailyRewardModal = () => {
  const { state, dispatch } = useAppContext();

  if (!state.showDailyReward) return null;

  const handleClaim = () => {
    dispatch({ type: 'CLAIM_DAILY_REWARD', payload: DAILY_REWARD_AMOUNT });
  };

  const handleDismiss = () => {
    dispatch({ type: 'DISMISS_DAILY_REWARD' });
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl max-w-sm w-full p-8 text-center relative">
        <button onClick={handleDismiss} className="absolute top-3 right-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
        <div className="text-amber-400 mb-4">
            <CoinIcon className="w-16 h-16 inline-block" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Daily Reward!</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          Welcome back! Here's your daily reward of <span className="font-bold text-amber-500">{DAILY_REWARD_AMOUNT} points</span> to kickstart your reading.
        </p>
        <button
          onClick={handleClaim}
          className="w-full px-6 py-3 bg-primary-600 text-white font-semibold rounded-md hover:bg-primary-700 transition-colors shadow-lg"
        >
          Claim Reward
        </button>
      </div>
    </div>
  );
};

export default DailyRewardModal;
