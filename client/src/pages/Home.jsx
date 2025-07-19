import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ChatBot from '../pages/ChatBot/Chatbot';

const Home = () => {
  const [greetings, setGreetings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchGreetings();
  }, []);

  const fetchGreetings = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/greetings');
      if (!response.ok) throw new Error('Failed to fetch greetings');
      const data = await response.json();
      setGreetings(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4">

      {/* Hero Section */}
      <section className="text-center pt-8 pb-16">
        <h1 className="text-5xl font-bold mb-4 text-black">FinSavvy</h1>
        <p className="text-xl opacity-80">Your Personal Finance Management App</p>
      </section>


      {/* Live Greetings Feed */}
      <section className="w-full max-w-4xl mx-auto text-center mb-12">
        <h2 className="text-3xl font-bold mb-8">Live Greetings</h2>

        {loading && (
          <p className="text-lg text-gray-700">Loading greetings from server...</p>
        )}

        {error && (
          <div className="text-red-600 bg-red-100 p-4 rounded-lg shadow-md mb-6">
            <p>Error: {error}</p>
            <button
              onClick={fetchGreetings}
              className="mt-4 bg-red-500 hover:bg-red-600 px-6 py-2 rounded-full text-white transition-all"
            >
              Retry
            </button>
          </div>
        )}

        {greetings && (
          <>
            {/* Friends List */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Friends:</h3>
              <ul className="flex flex-wrap justify-center gap-4">
                {greetings.friends.map((friend, index) => (
                  <li
                    key={index}
                    className="bg-white/20 px-6 py-3 rounded-full backdrop-blur-sm hover:bg-white/30 transition-all shadow-sm"
                  >
                    {friend}
                  </li>
                ))}
              </ul>
            </div>

            {/* Greetings List */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Greetings:</h3>
              <ul className="flex flex-wrap justify-center gap-4">
                {greetings.greetings.map((greet, index) => (
                  <li
                    key={index}
                    className="bg-white/20 px-6 py-3 rounded-full backdrop-blur-sm hover:bg-white/30 transition-all shadow-sm"
                  >
                    {greet}
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={fetchGreetings}
              className="mt-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-8 py-3 rounded-full text-lg font-semibold text-white shadow-md transition-all"
            >
              🔄 Refresh Greetings
            </button>
          </>
        )}
      </section>

      {/* Footer */}
      <footer className="text-center text-sm opacity-70 py-6">
        © 2025 FinSavvy. All rights reserved.
      </footer>
      
      {/* ChatBot Floating Toggle */}
      <ChatBot />

    </div>
  );
};

export default Home;
