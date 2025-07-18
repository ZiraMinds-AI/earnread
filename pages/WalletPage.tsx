
import React from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { CoinIcon } from '../components/icons/CoinIcon';

const POINTS_TO_INR_RATE = 1000;
const MINIMUM_PAYOUT_INR = 1;
const MINIMUM_PAYOUT_POINTS = MINIMUM_PAYOUT_INR * POINTS_TO_INR_RATE;

const WalletPage = () => {
  const { state } = useAppContext();
  
  const estimatedValue = (state.points / POINTS_TO_INR_RATE).toFixed(2);
  const canRedeem = state.points >= MINIMUM_PAYOUT_POINTS;

  const handleRedeem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canRedeem) {
      alert(`You need at least ${MINIMUM_PAYOUT_POINTS.toLocaleString()} points to make a redemption request.`);
      return;
    }
    alert("Redemption feature is currently in development. Your request has been logged. If valid, payout will be processed within 15 business days.");
  };

  const sortedTransactions = [...state.transactions].reverse();

  return (
    <div className="container mx-auto max-w-2xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">My Wallet</h1>
        <p className="mt-1 text-slate-600 dark:text-slate-400">Track your earnings and redeem your points.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg text-center">
            <div className="flex justify-center items-center text-amber-500 mb-2">
                <CoinIcon className="w-8 h-8" />
            </div>
            <p className="text-4xl font-bold text-slate-900 dark:text-white">{state.points.toLocaleString()}</p>
            <p className="text-slate-500 dark:text-slate-400">Total Points</p>
        </div>
        <div className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg text-center">
             <div className="flex justify-center items-center text-green-500 mb-2">
                <span className="text-3xl font-bold">₹</span>
            </div>
            <p className="text-4xl font-bold text-slate-900 dark:text-white">{estimatedValue}</p>
            <p className="text-slate-500 dark:text-slate-400">Estimated Value</p>
        </div>
      </div>
      
      {/* Redemption Section */}
      <div className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg">
        <h2 className="text-xl font-bold mb-4">Redeem Points</h2>
        <form onSubmit={handleRedeem} className="space-y-4">
          <div>
            <label htmlFor="upiId" className="block text-sm font-medium text-slate-700 dark:text-slate-300">UPI ID</label>
            <input type="text" id="upiId" placeholder="yourname@bank" required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
          </div>
           <div>
            <label htmlFor="amount" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Points to Redeem</label>
            <input type="number" id="amount" placeholder={`Min ${MINIMUM_PAYOUT_POINTS.toLocaleString()} points`} min={MINIMUM_PAYOUT_POINTS} max={state.points} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
          </div>
          <button 
            type="submit" 
            disabled={!canRedeem}
            className="w-full py-2 px-4 bg-primary-600 text-white font-semibold rounded-md shadow-md hover:bg-primary-700 disabled:bg-primary-400 dark:disabled:bg-primary-800 disabled:cursor-not-allowed"
          >
            {canRedeem ? 'Redeem Now' : `Need ${MINIMUM_PAYOUT_POINTS.toLocaleString()} Points`}
          </button>
          <p className="text-xs text-center text-slate-500 dark:text-slate-400">
            Minimum payout is ₹{MINIMUM_PAYOUT_INR}. Payouts will be dispatched within 15 business days of request.
          </p>
        </form>
      </div>

      {/* Transaction History */}
      <div className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg">
        <h2 className="text-xl font-bold mb-4">Transaction History</h2>
        <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
          {sortedTransactions.length > 0 ? sortedTransactions.map(tx => (
            <div key={tx.id} className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
              <div>
                <p className="font-medium text-slate-800 dark:text-slate-200">{tx.description}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{new Date(tx.date).toLocaleString()}</p>
              </div>
              <p className={`font-semibold ${tx.amount > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString()}
              </p>
            </div>
          )) : (
            <p className="text-slate-500 dark:text-slate-400 text-center py-4">No transactions yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default WalletPage;