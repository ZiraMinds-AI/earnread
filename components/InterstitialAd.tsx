
import React, { useEffect, useState } from 'react';

interface InterstitialAdProps {
  isOpen: boolean;
  onClose: () => void;
}

const InterstitialAd: React.FC<InterstitialAdProps> = ({ isOpen, onClose }) => {
  const [countdown, setCountdown] = useState(5);
  const [adLoaded, setAdLoaded] = useState(false);
  const containerId = 'container-303c9f38372193d42d9e93940e083894';

  useEffect(() => {
    if (isOpen) {
      // Reset states when ad is shown
      setAdLoaded(false);
      setCountdown(30); // 30 seconds for the ad to be visible
      
      // Create and load the ad script
      const script = document.createElement('script');
      script.src = '//pl27198878.profitableratecpm.com/303c9f38372193d42d9e93940e083894/invoke.js';
      script.async = true;
      script.dataset.cfasync = 'false';

      const handleLoad = () => {
        setAdLoaded(true);
        
        // Start countdown when ad is loaded
        const timer = setInterval(() => {
          setCountdown(prev => {
            if (prev <= 1) {
              clearInterval(timer);
              onClose();
              return 0;
            }
            return prev - 1;
          });
        }, 1000);

        return () => clearInterval(timer);
      };

      script.addEventListener('load', handleLoad);
      document.body.appendChild(script);

      return () => {
        script.removeEventListener('load', handleLoad);
        if (document.body.contains(script)) {
          document.body.removeChild(script);
        }
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/90 z-[9999] flex items-center justify-center p-4">
      <div className="relative w-full h-full max-w-4xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors z-10"
          aria-label="Close Ad"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        
        {/* Ad container */}
        <div 
          id={containerId}
          className="w-full h-full bg-gray-100 dark:bg-gray-900 flex items-center justify-center"
        >
          {!adLoaded && (
            <div className="text-center p-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400">Loading ad...</p>
            </div>
          )}
        </div>
        
        {/* Countdown timer */}
        <div className="absolute bottom-4 right-4 bg-black/70 text-white text-sm px-3 py-1 rounded-full">
          Closing in {countdown}s
        </div>
      </div>
    </div>
  );
};

export default InterstitialAd;
