import React, { useState, useEffect } from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { CoinIcon } from './icons/CoinIcon';

interface FlyingCoinsProps {
  targetRef: React.RefObject<HTMLDivElement | null>;
}

interface Coin {
  id: number;
  startX: number;
  startY: number;
  deltaX: number;
  deltaY: number;
  delay: number;
}

const FlyingCoins: React.FC<FlyingCoinsProps> = ({ targetRef }) => {
  const { state, dispatch } = useAppContext();
  const { key, count } = state.coinAnimation;
  const [coins, setCoins] = useState<Coin[]>([]);
  
  useEffect(() => {
    if (count > 0 && key > 0 && targetRef?.current) {
      const targetRect = targetRef.current.getBoundingClientRect();
      const targetPos = {
        x: targetRect.left + targetRect.width / 2,
        y: targetRect.top + targetRect.height / 2,
      };

      const newCoins: Coin[] = [];
      const numCoins = Math.min(count, 30); // Cap at 30 for performance

      for (let i = 0; i < numCoins; i++) {
        const startX = window.innerWidth / 2 + (Math.random() - 0.5) * 100;
        const startY = window.innerHeight / 2 + (Math.random() - 0.5) * 100;

        newCoins.push({
          id: Math.random(),
          startX: startX,
          startY: startY,
          deltaX: targetPos.x - startX,
          deltaY: targetPos.y - startY,
          delay: Math.random() * 0.5,
        });
      }
      setCoins(newCoins);
      
      const animationDuration = 1000 + 500; // 1s animation + 0.5s max delay
      const timer = setTimeout(() => {
        setCoins([]);
        dispatch({ type: 'END_COIN_ANIMATION' });
      }, animationDuration);

      return () => clearTimeout(timer);
    }
  }, [key, count, dispatch, targetRef]);

  if (coins.length === 0) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 w-0 h-0 pointer-events-none z-[100]">
      {coins.map(coin => (
        <div
          key={coin.id}
          className="absolute"
          style={{
            left: `${coin.startX}px`,
            top: `${coin.startY}px`,
            animation: `fly-to-target 1s cubic-bezier(0.5, -0.5, 0.5, 1.5) ${coin.delay}s forwards`,
            '--delta-x': `${coin.deltaX}px`,
            '--delta-y': `${coin.deltaY}px`,
          } as React.CSSProperties}
        >
          <CoinIcon className="w-6 h-6 text-amber-400 drop-shadow-lg" />
        </div>
      ))}
    </div>
  );
};

export default FlyingCoins;