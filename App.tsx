
import React, { useRef, useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ReaderPage from './pages/ReaderPage';
import WalletPage from './pages/WalletPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsAndConditionsPage from './pages/TermsAndConditionsPage';
import InterstitialAd from './components/InterstitialAd';
import FreeCoinsModal from './components/FreeCoinsModal';
import { useAppContext } from './hooks/useAppContext';
import FlyingCoins from './components/FlyingCoins';
import DailyRewardModal from './components/DailyRewardModal';

const AppContent = () => {
  const { state, dispatch } = useAppContext();
  const walletRef = useRef<HTMLDivElement>(null);
  const [isClaimingReward, setIsClaimingReward] = useState(false);

  const handleClaimFreeCoins = () => {
    if (isClaimingReward) return;

    setIsClaimingReward(true);
    // Hide modal immediately for better UX
    dispatch({ type: 'HIDE_FREE_COINS_MODAL' });

    // Simulate watching a rewarded ad
    setTimeout(() => {
      const rewardAmount = 5;
      dispatch({ 
        type: 'ADD_POINTS', 
        payload: { points: rewardAmount, description: 'Free coins from ad' }
      });
      setIsClaimingReward(false);
    }, 2000); // 2-second delay for "ad"
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-800 dark:text-slate-200">
      <Header walletRef={walletRef} />
      <main className="p-4 sm:p-6 flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/story/:storyId" element={<ReaderPage />} />
          <Route path="/wallet" element={<WalletPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditionsPage />} />
        </Routes>
      </main>
      <Footer />
      <InterstitialAd 
        isOpen={state.showInterstitial} 
        onClose={() => dispatch({ type: 'DISMISS_INTERSTITIAL' })} 
      />
      <FreeCoinsModal
        isOpen={state.showFreeCoinsModal}
        isClaiming={isClaimingReward}
        onConfirm={handleClaimFreeCoins}
        onCancel={() => dispatch({ type: 'HIDE_FREE_COINS_MODAL' })}
      />
      <DailyRewardModal />
      <FlyingCoins targetRef={walletRef} />
    </div>
  );
};


const App = () => {
  return (
    <AppProvider>
      <HashRouter>
        <AppContent />
      </HashRouter>
    </AppProvider>
  );
};

export default App;