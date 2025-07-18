
import React, { useEffect, useState } from 'react';

interface InterstitialAdProps {
  isOpen: boolean;
  onClose: () => void;
}

const InterstitialAd: React.FC<InterstitialAdProps> = ({ isOpen, onClose }) => {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (isOpen) {
      setCountdown(5);
      const timer = setInterval(() => {
        setCountdown(prev => (prev > 0 ? prev - 1 : 0));
      }, 1000);

      const closeTimer = setTimeout(() => {
        onClose();
      }, 5000);

      return () => {
        clearInterval(timer);
        clearTimeout(closeTimer);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-2xl max-w-md w-full relative">
        <div className="p-4 text-right">
            <button 
                onClick={onClose}
                className="absolute top-2 right-2 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
                aria-label="Close Ad"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
        </div>
        <div className="p-8 text-center">
            <h2 className="text-xl font-bold mb-4">Interstitial Ad</h2>
            <p className="text-slate-600 dark:text-slate-400">This is a placeholder for an interstitial ad.</p>
            <p className="mt-4 text-sm text-slate-500">This will close automatically in {countdown}s.</p>
        </div>
      </div>
    </div>
  );
};

export default InterstitialAd;
