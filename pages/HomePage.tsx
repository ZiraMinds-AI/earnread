
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../hooks/useAppContext';
import StoryPrompt from '../components/StoryPrompt';
import { BookOpenIcon } from '../components/icons/BookOpenIcon';
import { CoinIcon } from '../components/icons/CoinIcon';

const HomePage = () => {
  const { state, dispatch } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch({ type: 'NAVIGATE_HOME' });
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const totalPagesRead = state.stories.reduce((acc, story) => acc + story.highestPageRead, 0);
  const estimatedEarnings = (state.points / 1000).toFixed(2);

  return (
    <div className="container mx-auto max-w-4xl space-y-8">
      <div className="text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">Welcome Back!</h1>
        <p className="mt-2 text-lg text-slate-600 dark:text-slate-400">Continue your reading adventure and earn rewards.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-md flex flex-col items-center justify-center text-center">
          <CoinIcon className="w-10 h-10 text-amber-500 mb-2" />
          <p className="text-2xl font-bold">{state.points.toLocaleString()}</p>
          <p className="text-slate-500 dark:text-slate-400">Points Earned</p>
        </div>
        <div className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-md flex flex-col items-center justify-center text-center">
          <BookOpenIcon className="w-10 h-10 text-blue-500 mb-2" />
          <p className="text-2xl font-bold">{totalPagesRead}</p>
          <p className="text-slate-500 dark:text-slate-400">Pages Read</p>
        </div>
        <div className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-md flex flex-col items-center justify-center text-center">
          <span className="text-green-500 text-3xl font-bold mb-2">₹</span>
          <p className="text-2xl font-bold">{estimatedEarnings}</p>
          <p className="text-slate-500 dark:text-slate-400">Estimated Earnings</p>
        </div>
      </div>
      
      <StoryPrompt />

      {/* My Stories */}
      <div>
        <h2 className="text-2xl font-bold mb-4">My Stories</h2>
        {state.stories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {state.stories.map(story => (
              <div key={story.id} 
                   className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-5 flex flex-col justify-between hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer"
                   onClick={() => navigate(`/story/${story.id}`)}>
                <div>
                  <h3 className="font-bold text-lg text-primary-700 dark:text-primary-400">{story.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mt-2 line-clamp-3">{story.summary}</p>
                </div>
                <div className="mt-4">
                    {story.isGenerating && story.pages.length === 0 ? (
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                             <div className="w-4 h-4 border-2 border-slate-300 border-t-primary-500 rounded-full animate-spin"></div>
                             <span>Generating...</span>
                        </div>
                    ) : (
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            Progress: {story.highestPageRead} / {story.pages.length} pages
                        </p>
                    )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 px-6 bg-slate-100 dark:bg-slate-800 rounded-lg">
            <p className="text-slate-500 dark:text-slate-400">You haven't generated any stories yet. Use the prompt above to create your first one!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
