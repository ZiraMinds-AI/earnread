
import React, { createContext, useReducer, useEffect, ReactNode } from 'react';
import { AppState, AppAction, AppContextType, Story } from '../types';

const initialState: AppState = {
  points: 100,
  transactions: [],
  stories: [],
  showFreeCoinsModal: false,
  showInterstitial: false,
  homeNavigations: 0,
  coinAnimation: { key: 0, count: 0 },
  showDailyReward: false,
  lastClaimedDailyReward: null,
};

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_STATE':
      return { ...initialState, ...action.payload };
    case 'ADD_POINTS':
      return {
        ...state,
        points: state.points + action.payload.points,
        transactions: [
          ...state.transactions,
          { id: new Date().toISOString(), description: action.payload.description, amount: action.payload.points, date: new Date().toISOString() }
        ],
        coinAnimation: {
          key: state.coinAnimation.key + 1,
          count: action.payload.points,
        },
      };
    case 'SPEND_POINTS':
       if (state.points < action.payload.points) return state; // Prevent going into debt
      return {
        ...state,
        points: state.points - action.payload.points,
        transactions: [
          ...state.transactions,
          { id: new Date().toISOString(), description: action.payload.description, amount: -action.payload.points, date: new Date().toISOString() }
        ],
      };
    case 'SHOW_FREE_COINS_MODAL':
      return { ...state, showFreeCoinsModal: true };
    case 'HIDE_FREE_COINS_MODAL':
      return { ...state, showFreeCoinsModal: false };
    case 'NAVIGATE_HOME':
      const newNavCount = state.homeNavigations + 1;
      return {
        ...state,
        homeNavigations: newNavCount,
        showInterstitial: newNavCount % 3 === 0 && newNavCount > 0,
      };
    case 'DISMISS_INTERSTITIAL':
      return { ...state, showInterstitial: false };
    case 'ADD_STORY_START':
      const newStory: Story = {
          id: action.payload.id,
          title: action.payload.title,
          summary: action.payload.summary,
          pages: [],
          highestPageRead: 0,
          isGenerating: true,
      };
      return {...state, stories: [...state.stories, newStory]};
    case 'ADD_STORY_SUCCESS':
        return {
            ...state,
            stories: state.stories.map(story => {
                if (story.id === action.payload.id) {
                    return {
                        ...story,
                        title: action.payload.title,
                        summary: action.payload.summary,
                        pages: action.payload.pages,
                        isGenerating: false,
                    };
                }
                return story;
            }),
        };
    case 'UNLOCK_PAGES_SUCCESS':
      return {
          ...state,
          stories: state.stories.map(story => {
              if (story.id === action.payload.storyId) {
                  return {
                      ...story,
                      pages: [...story.pages, ...action.payload.newPages],
                      isGenerating: false,
                  };
              }
              return story;
          }),
      };
    case 'ADD_STORY_FAILURE':
        return {
            ...state,
            stories: state.stories.filter(s => s.id !== action.payload.id),
        };
    case 'UNLOCK_PAGES_FAILURE':
        return {
            ...state,
            stories: state.stories.map(s => s.id === action.payload.storyId ? {...s, isGenerating: false} : s),
        };
    case 'UPDATE_HIGHEST_PAGE':
      const storyToUpdate = state.stories.find(s => s.id === action.payload.storyId);
      if (!storyToUpdate || action.payload.pageNumber <= storyToUpdate.highestPageRead) {
        return state;
      }
      return {
        ...state,
        points: state.points + 1,
        transactions: [
          ...state.transactions,
          { id: new Date().toISOString(), description: `Read page ${action.payload.pageNumber} of "${storyToUpdate.title}"`, amount: 1, date: new Date().toISOString() }
        ],
        stories: state.stories.map(s =>
          s.id === action.payload.storyId ? { ...s, highestPageRead: action.payload.pageNumber } : s
        ),
        coinAnimation: {
          key: state.coinAnimation.key + 1,
          count: 1,
        },
      };
    case 'END_COIN_ANIMATION':
      return {
        ...state,
        coinAnimation: { ...state.coinAnimation, count: 0 },
      };
    case 'SHOW_DAILY_REWARD':
      return { ...state, showDailyReward: true };
    case 'DISMISS_DAILY_REWARD':
      return { ...state, showDailyReward: false };
    case 'CLAIM_DAILY_REWARD':
      return {
        ...state,
        points: state.points + action.payload,
        transactions: [
          ...state.transactions,
          { id: new Date().toISOString(), description: "Daily Reward Claimed", amount: action.payload, date: new Date().toISOString() }
        ],
        coinAnimation: {
          key: state.coinAnimation.key + 1,
          count: action.payload,
        },
        showDailyReward: false,
        lastClaimedDailyReward: new Date().toISOString(),
      };
    default:
      return state;
  }
};

export const AppContext = createContext<AppContextType | undefined>(undefined);

const isToday = (someDateString: string | null): boolean => {
    if (!someDateString) return false;
    const today = new Date();
    const someDate = new Date(someDateString);
    return someDate.getDate() === today.getDate() &&
            someDate.getMonth() === today.getMonth() &&
            someDate.getFullYear() === today.getFullYear();
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    try {
      const persistedState = localStorage.getItem('readToEarnState');
      if (persistedState) {
        const storedState = JSON.parse(persistedState);
        dispatch({ type: 'SET_STATE', payload: storedState });

        // Check for daily reward
        if (!isToday(storedState.lastClaimedDailyReward)) {
            setTimeout(() => dispatch({ type: 'SHOW_DAILY_REWARD' }), 500);
        }
      } else {
        // First time user, show reward
        setTimeout(() => dispatch({ type: 'SHOW_DAILY_REWARD' }), 500);
      }
    } catch (error) {
      console.error("Failed to load state from localStorage", error);
    }
  }, []);

  useEffect(() => {
    try {
      const { coinAnimation, ...stateToPersist } = state;
      localStorage.setItem('readToEarnState', JSON.stringify(stateToPersist));
    } catch (error) {
      console.error("Failed to save state to localStorage", error);
    }
  }, [state]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};