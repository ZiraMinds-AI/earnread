
import React, { useEffect, useState } from 'react';

interface RewardedAdPromptProps {
  isOpen: boolean;
  onConfirm: (rewardEarned: boolean) => void;
  onCancel: () => void;
  rewardAmount?: number;
}

const RewardedAdPrompt: React.FC<RewardedAdPromptProps> = ({
  isOpen,
  onConfirm,
  onCancel,
  rewardAmount = 10,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [adLoaded, setAdLoaded] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    // Reset states when the modal opens
    setIsLoading(false);
    setError(null);
    setAdLoaded(false);

    // Load the ad script
    const script = document.createElement('script');
    script.src = '//pl27198901.profitableratecpm.com/c5/4a/72/c54a7238f2737adde20b90dabd82c0c9.js';
    script.async = true;

    const handleLoad = () => {
      setAdLoaded(true);
      setIsLoading(false);
    };

    const handleError = () => {
      setError('Failed to load ad. Please try again later.');
      setIsLoading(false);
    };

    script.addEventListener('load', handleLoad);
    script.addEventListener('error', handleError);

    document.body.appendChild(script);

    return () => {
      script.removeEventListener('load', handleLoad);
      script.removeEventListener('error', handleError);
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [isOpen]);

  const handleWatchAd = () => {
    if (!adLoaded) {
      setError('Ad is not ready yet. Please wait...');
      return;
    }

    setIsLoading(true);
    
    // This is where you would typically integrate with the ad network's SDK
    // For example: adNetwork.showRewardedAd()
    // For now, we'll simulate a successful ad view with a timeout
    
    // Simulate ad display and reward
    setTimeout(() => {
      // In a real implementation, this would be called by the ad network's onRewarded callback
      onConfirm(true);
      setIsLoading(false);
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl max-w-sm w-full p-6 text-center">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
          {rewardAmount} Coins Reward!
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          Error Happened. Start another short story.
        </p>
        
        {error && (
          <div className="mb-4 p-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded text-sm">
            {error}
          </div>
        )}

        <div className="flex justify-center gap-4">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="px-6 py-2 bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-medium rounded-md hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleWatchAd}
            disabled={isLoading || !adLoaded}
            className="px-6 py-2 bg-primary-600 text-white font-semibold rounded-md hover:bg-primary-700 transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Loading...
              </>
            ) : adLoaded ? (
              `Watch Ad & Earn ${rewardAmount} Coins`
            ) : (
              'Preparing Ad...'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RewardedAdPrompt;
