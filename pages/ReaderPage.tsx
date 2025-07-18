
import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../hooks/useAppContext';
import { generateNextPages } from '../services/geminiService';
import { ChevronLeftIcon } from '../components/icons/ChevronLeftIcon';
import { ChevronRightIcon } from '../components/icons/ChevronRightIcon';
import BannerAd from '../components/BannerAd';
import RewardedAdPrompt from '../components/RewardedAdPrompt';
import Page from '../components/Page';

const UNLOCK_COST = 5;
const PAGES_PER_UNLOCK = 5;
const PAGE_READ_TIMER_SECONDS = 5; // Time user must wait before proceeding

const ReaderPage = () => {
  const { storyId } = useParams<{ storyId: string }>();
  const navigate = useNavigate();
  const { state, dispatch } = useAppContext();
  
  const story = useMemo(() => state.stories.find(s => s.id === storyId), [state.stories, storyId]);
  
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [showRewardPrompt, setShowRewardPrompt] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);

  useEffect(() => {
    if (!story) {
      // Story might not be loaded yet, or ID is invalid.
      // If stories are loaded and story is not found, navigate home.
      if (state.stories.length > 0 && !state.stories.find(s => s.id === storyId)) {
        navigate('/');
      }
    } else {
       setCurrentPageIndex(story.highestPageRead > 0 ? story.highestPageRead - 1 : 0);
    }
  }, [story, storyId, navigate, state.stories]);

  useEffect(() => {
    if (story && currentPageIndex + 1 > story.highestPageRead) {
      dispatch({ type: 'UPDATE_HIGHEST_PAGE', payload: { storyId: story.id, pageNumber: currentPageIndex + 1 } });
    }
  }, [currentPageIndex, story, dispatch]);
  
  useEffect(() => {
    if (!story) return;

    const isLastPage = currentPageIndex === story.pages.length - 1;
    if (isLastPage) {
      setTimeRemaining(0);
      return;
    }

    setTimeRemaining(PAGE_READ_TIMER_SECONDS);
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentPageIndex, story]);


  if (!story) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-8 h-8 border-4 border-slate-300 border-t-primary-600 rounded-full animate-spin"></div>
        <p className="ml-4 text-lg">Loading story...</p>
      </div>
    );
  }

  const handleNextPage = () => {
    if (timeRemaining > 0) return;
    if (currentPageIndex < story.pages.length - 1) {
      setCurrentPageIndex(prev => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(prev => prev - 1);
    }
  };

  const handleUnlockPages = async () => {
    if (state.points < UNLOCK_COST) {
      alert("Not enough points to unlock new pages!");
      return;
    }
    
    setShowRewardPrompt(false);
    
    dispatch({ type: 'SPEND_POINTS', payload: { points: UNLOCK_COST, description: `Unlock pages for "${story.title}"` } });
    dispatch({ type: 'UNLOCK_PAGES_START', payload: { storyId: story.id }});

    // Mock rewarded ad bonus
    // In a real app, this would be in the ad callback
    setTimeout(() => {
        dispatch({ type: 'ADD_POINTS', payload: { points: 15, description: 'Bonus for watching ad' } });
    }, 1500);

    try {
        const lastPageContent = story.pages[story.pages.length - 1]?.content || '';
        const { pages: newPagesContent } = await generateNextPages(story.title, lastPageContent);
        const newPages = newPagesContent.map((content, index) => ({
            pageNumber: story.pages.length + index + 1,
            content
        }));
        dispatch({ type: 'UNLOCK_PAGES_SUCCESS', payload: { storyId: story.id, newPages } });
    } catch (error) {
        console.error(error);
        // Refund points on failure
        dispatch({ type: 'ADD_POINTS', payload: { points: UNLOCK_COST, description: `Refund: Failed to unlock pages` } });
        dispatch({ type: 'UNLOCK_PAGES_FAILURE', payload: { storyId: story.id }});
        alert('Could not generate next pages. Points have been refunded.');
    }
  };

  const needsUnlock = currentPageIndex === story.pages.length - 1;

  return (
    <div className="max-w-4xl mx-auto flex flex-col h-[calc(100vh-12rem)]">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-2 text-slate-900 dark:text-white">{story.title}</h1>
      <p className="text-center text-sm text-slate-500 dark:text-slate-400 mb-4">
        Page {currentPageIndex + 1} of {story.pages.length}
      </p>

      <div className="flex-grow bg-white dark:bg-slate-800 rounded-lg shadow-lg p-4 sm:p-8 flex items-center justify-center relative">
        <Page content={story.pages[currentPageIndex]?.content || "Loading page content..."} />
      </div>

      <div className="flex items-center justify-between mt-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPageIndex === 0}
          className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm hover:bg-slate-50 dark:hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeftIcon className="w-5 h-5" />
          Previous
        </button>

        {needsUnlock ? (
            story.isGenerating ? (
                <div className="px-6 py-2 bg-primary-500 text-white rounded-md flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Generating...</span>
                </div>
            ) : (
                <button
                onClick={() => setShowRewardPrompt(true)}
                disabled={state.points < UNLOCK_COST}
                className="px-6 py-2 bg-primary-600 text-white font-semibold rounded-md shadow-md hover:bg-primary-700 disabled:bg-primary-300 dark:disabled:bg-primary-800 disabled:cursor-not-allowed transition-colors"
                >
                Unlock Next {PAGES_PER_UNLOCK} Pages ({UNLOCK_COST} points)
                </button>
            )
        ) : (
          <button
            onClick={handleNextPage}
            disabled={timeRemaining > 0}
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm hover:bg-slate-50 dark:hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {timeRemaining > 0 ? `Next (${timeRemaining}s)` : 'Next'}
            <ChevronRightIcon className="w-5 h-5" />
          </button>
        )}
      </div>

      <BannerAd />

      <RewardedAdPrompt
        isOpen={showRewardPrompt}
        onConfirm={handleUnlockPages}
        onCancel={() => setShowRewardPrompt(false)}
      />
    </div>
  );
};

export default ReaderPage;
