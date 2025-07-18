
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../hooks/useAppContext';
import { generateStory } from '../services/geminiService';

const StoryPrompt = () => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { dispatch } = useAppContext();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) {
      setError('Prompt cannot be empty.');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    const storyId = `story-${new Date().toISOString()}`;

    try {
        // Optimistically show the story card
        dispatch({ type: 'ADD_STORY_START', payload: { id: storyId, title: "Generating Story...", summary: `Based on your prompt: "${prompt}"` } });
        
        const { title, summary, pages } = await generateStory(prompt);
        
        const pageContents = pages.map((content, index) => ({
            pageNumber: index + 1,
            content,
        }));

        // Replace optimistic card with real data
        dispatch({ type: 'ADD_STORY_SUCCESS', payload: { id: storyId, title, summary, pages: pageContents } });
        navigate(`/story/${storyId}`);
        setPrompt('');

    } catch (err: any) {
        setError(err.message || 'An unexpected error occurred.');
        dispatch({ type: 'ADD_STORY_FAILURE', payload: { id: storyId } });
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg">
      <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Create a New Story</h2>
      <p className="text-slate-600 dark:text-slate-400 mb-4">What kind of story do you want to read? Enter a prompt and let AI create it for you!</p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={prompt}
          onChange={(e) => {
            setPrompt(e.target.value);
            if (error) setError(null);
          }}
          placeholder="e.g., A detective story set in futuristic Tokyo"
          className="flex-grow px-4 py-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !prompt.trim()}
          className="flex justify-center items-center px-6 py-2 bg-primary-600 text-white font-semibold rounded-md shadow-md hover:bg-primary-700 disabled:bg-primary-300 dark:disabled:bg-primary-800 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              <span>Generating...</span>
            </>
          ) : (
            'Generate'
          )}
        </button>
      </form>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default StoryPrompt;
