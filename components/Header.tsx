import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppContext } from '../hooks/useAppContext';
import { HomeIcon } from './icons/HomeIcon';
import { WalletIcon } from './icons/WalletIcon';
import { CoinIcon } from './icons/CoinIcon';

interface HeaderProps {
  walletRef?: React.RefObject<HTMLDivElement | null>;
}

const Header: React.FC<HeaderProps> = ({ walletRef }) => {
  const { state } = useAppContext();
  const location = useLocation();

  const navLinkClasses = (path: string) => 
    `flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      location.pathname === path 
        ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/50 dark:text-primary-300' 
        : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
    }`;

  return (
    <header className="sticky top-0 z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold text-primary-600 dark:text-primary-400">
            ReadEarn
          </Link>
          <div className="flex items-center gap-4">
            <nav className="flex items-center gap-2">
              <Link to="/" className={navLinkClasses('/')}>
                <HomeIcon className="w-5 h-5" />
                <span className="hidden sm:inline">Home</span>
              </Link>
              <Link to="/wallet" className={navLinkClasses('/wallet')}>
                <WalletIcon className="w-5 h-5" />
                <span className="hidden sm:inline">Wallet</span>
              </Link>
            </nav>
            <div ref={walletRef} className="flex items-center gap-2 bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-300 font-semibold px-4 py-2 rounded-full">
              <CoinIcon className="w-5 h-5 text-amber-500" />
              <span>{state.points.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;