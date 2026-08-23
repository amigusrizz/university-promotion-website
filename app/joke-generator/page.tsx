'use client';

import { useState, useEffect } from 'react';

interface Joke {
  id: number;
  type: string;
  setup: string;
  delivery: string;
}

interface SingleJoke {
  id: number;
  type: string;
  joke: string;
}

export default function JokeGeneratorPage() {
  const [joke, setJoke] = useState<Joke | SingleJoke | null>(null);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState('any');
  const [history, setHistory] = useState<(Joke | SingleJoke)[]>([]);

  const categories = ['any', 'general', 'knock-knock', 'programming', 'dark'];

  const fetchJoke = async (selectedCategory: string = category) => {
    setLoading(true);
    try {
      const url =
        selectedCategory === 'any'
          ? 'https://official-joke-api.appspot.com/random_joke'
          : `https://official-joke-api.appspot.com/jokes/${selectedCategory}/random`;

      const response = await fetch(url);
      const data = await response.json();

      // Handle array response (some endpoints return array)
      const jokeData = Array.isArray(data) ? data[0] : data;

      setJoke(jokeData);
      setHistory([jokeData, ...history.slice(0, 9)]);
    } catch (error) {
      console.error('Failed to fetch joke:', error);
      setJoke({
        id: 0,
        type: 'error',
        joke: 'Oops! Failed to load a joke. Please try again.',
      } as SingleJoke);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJoke();
  }, []);

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
    fetchJoke(newCategory);
  };

  const displayJoke = () => {
    if (!joke) return '';
    if ('setup' in joke) {
      return `${joke.setup}\n\n${joke.delivery}`;
    }
    return joke.joke;
  };

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-secondary via-primary to-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-slideUp">
            😂 Joke Generator
          </h1>
          <p className="text-gray-400 text-lg animate-slideUp" style={{ animationDelay: '0.1s' }}>
            Get random laughs powered by the Official Joke API
          </p>
        </div>

        {/* Category Selector */}
        <div className="mb-8 animate-slideUp" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-xl font-bold mb-4">Select Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`py-3 px-4 rounded-lg font-bold transition transform hover:scale-105 ${
                  category === cat
                    ? 'bg-accent text-primary shadow-lg shadow-accent/50'
                    : 'bg-primary hover:bg-primary/80 text-white border border-accent/30'
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Joke Display */}
        <div className="mb-8 animate-slideUp" style={{ animationDelay: '0.3s' }}>
          <div className="bg-gradient-to-br from-primary to-secondary border-2 border-accent/30 rounded-lg p-8 min-h-48 flex flex-col justify-center items-center shadow-xl hover:shadow-accent/20 transition">
            {loading ? (
              <div className="text-center">
                <div className="inline-block animate-spin mb-4">
                  <div className="text-4xl">⏳</div>
                </div>
                <p className="text-gray-400 text-lg">Loading your laugh...</p>
              </div>
            ) : joke ? (
              <div className="text-center space-y-4 w-full">
                <div className="text-5xl mb-4">🎭</div>
                <p className="text-2xl font-bold text-accent mb-4">
                  {joke.type === 'knock-knock' ? '🚪 Knock-Knock Joke' : '💡 Regular Joke'}
                </p>
                <p className="text-xl text-white whitespace-pre-wrap leading-relaxed">
                  {displayJoke()}
                </p>
              </div>
            ) : (
              <p className="text-gray-400">No joke loaded yet</p>
            )}
          </div>
        </div>

        {/* Generate Button */}
        <div className="text-center mb-12 animate-slideUp" style={{ animationDelay: '0.4s' }}>
          <button
            onClick={() => fetchJoke()}
            disabled={loading}
            className="px-12 py-4 bg-gradient-to-r from-accent to-blue-600 hover:from-blue-600 hover:to-accent text-white font-bold text-lg rounded-lg transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-accent/50"
          >
            {loading ? '⏳ Loading...' : '🎲 Get Another Joke'}
          </button>
        </div>

        {/* History Section */}
        {history.length > 0 && (
          <div className="animate-slideUp" style={{ animationDelay: '0.5s' }}>
            <h2 className="text-2xl font-bold mb-6">Recent Jokes</h2>
            <div className="space-y-4">
              {history.map((h, index) => (
                <div
                  key={index}
                  className="bg-primary/50 border border-accent/20 rounded-lg p-6 hover:border-accent/50 transition"
                >
                  <p className="text-sm text-gray-400 mb-2">Joke #{index + 1}</p>
                  <p className="text-white whitespace-pre-wrap">
                    {'setup' in h ? `${h.setup}\n${h.delivery}` : h.joke}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* API Info */}
        <div className="mt-16 text-center text-gray-500 text-sm">
          <p>Powered by Official Joke API • https://official-joke-api.appspot.com</p>
        </div>
      </div>
    </div>
  );
}
