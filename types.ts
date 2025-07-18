
import { Dispatch } from 'react';

export interface PageContent {
  pageNumber: number;
  content: string;
}

export interface Story {
  id: string;
  title: string;
  summary: string;
  pages: PageContent[];
  highestPageRead: number;
  isGenerating: boolean;
}

export interface Transaction {
  id: string;
  description: string;
  amount: number; // positive for earnings, negative for spending
  date: string;
}

export interface AppState {
  points: number;
  transactions: Transaction[];
  stories: Story[];
  showFreeCoinsModal: boolean;
  showInterstitial: boolean;
  homeNavigations: number;
  coinAnimation: {
    key: number;
    count: number;
  };
  showDailyReward: boolean;
  lastClaimedDailyReward: string | null;
}

export type AppAction =
  | { type: 'SET_STATE'; payload: any }
  | { type: 'ADD_POINTS'; payload: { points: number; description: string } }
  | { type: 'SPEND_POINTS'; payload: { points: number; description: string } }
  | { type: 'SHOW_FREE_COINS_MODAL' }
  | { type: 'HIDE_FREE_COINS_MODAL' }
  | { type: 'NAVIGATE_HOME' }
  | { type: 'DISMISS_INTERSTITIAL' }
  | { type: 'ADD_STORY_START'; payload: { id: string; title: string, summary: string } }
  | { type: 'ADD_STORY_SUCCESS'; payload: { id: string; title: string; summary: string; pages: PageContent[] } }
  | { type: 'ADD_STORY_FAILURE'; payload: { id: string } }
  | { type: 'UNLOCK_PAGES_START'; payload: { storyId: string } }
  | { type: 'UNLOCK_PAGES_SUCCESS'; payload: { storyId: string; newPages: PageContent[] } }
  | { type: 'UNLOCK_PAGES_FAILURE'; payload: { storyId: string } }
  | { type: 'UPDATE_HIGHEST_PAGE'; payload: { storyId: string; pageNumber: number } }
  | { type: 'END_COIN_ANIMATION' }
  | { type: 'SHOW_DAILY_REWARD' }
  | { type: 'DISMISS_DAILY_REWARD' }
  | { type: 'CLAIM_DAILY_REWARD'; payload: number };

export interface AppContextType {
  state: AppState;
  dispatch: Dispatch<AppAction>;
}