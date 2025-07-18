
import React, { useEffect, useRef } from 'react';

const BannerAd = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptLoaded = useRef(false);

  useEffect(() => {
    // Only load the script once
    if (scriptLoaded.current) return;

    const script = document.createElement('script');
    script.src = '//pl27198878.profitableratecpm.com/303c9f38372193d42d9e93940e083894/invoke.js';
    script.async = true;
    script.dataset.cfasync = 'false';
    
    // Set the container ID to match the one in the script
    const containerId = 'container-303c9f38372193d42d9e93940e083894';
    if (containerRef.current) {
      containerRef.current.id = containerId;
    }

    document.body.appendChild(script);
    scriptLoaded.current = true;

    // Cleanup function to remove the script when component unmounts
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
      scriptLoaded.current = false;
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="w-full mt-6 min-h-[250px] flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-md overflow-hidden"
    >
      {/* Loading or fallback content */}
      <div className="text-slate-400 dark:text-slate-500 text-sm">
        Loading ad...
      </div>
    </div>
  );
};

export default BannerAd;
