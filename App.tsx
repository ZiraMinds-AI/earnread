
import { useRef } from 'react';
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
import { useAppContext } from './hooks/useAppContext';
import FlyingCoins from './components/FlyingCoins';
import DailyRewardModal from './components/DailyRewardModal';

const AppContent = () => {
  const { state, dispatch } = useAppContext();
  const walletRef = useRef<HTMLDivElement | null>(null);


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