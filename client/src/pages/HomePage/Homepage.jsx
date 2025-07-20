// src/pages/Homepage.jsx
import React from 'react';
import cardPayment from '../../assets/card-payment.png'; // adjust path as needed

const Homepage = () => {
  return (
    <div className="min-h-screen bg-[linear-gradient(to_bottom_right,_#eff6ff,_#dbeafe)] text-white font-sans">
      {/* Hero Section */}
      <div className="px-8 md:px-16 py-10 flex flex-col md:flex-row items-center justify-between">
        {/* Text Content */}
        <div className="max-w-xl text-blue-900">
          <h2 className="text-5xl font-extrabold leading-tight">
            Fast & Smart <br /> Personal Finance Assistant
          </h2>
          <p className="mt-6 text-blue-800 text-lg">
            Connect your bank, track your expenses, and get GPT-powered financial advice tailored to your life. Save more, stress less.
          </p>

          <div className="mt-6 flex gap-4">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg">
              Log In
            </button>
            <button className="border border-blue-700 text-blue-700 px-6 py-3 rounded-full hover:bg-blue-700 hover:text-white transition-all">
              Sign Up
            </button>
          </div>
        </div>

        {/* Visual Section */}
        <div className="relative mt-12 md:mt-0 w-full md:w-1/2">
          <img src={cardPayment} alt="Card" />
        </div>
      </div>

      {/* Feature Row */}
      <div className="px-8 md:px-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 text-center mt-20 text-blue-900">
        <div>
          <h3 className="text-2xl font-bold text-blue-500">01</h3>
          <p className="text-xl font-semibold">Secure Bank Connection</p>
          <p className="text-blue-800">Link your accounts with Plaid for seamless tracking.</p>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-blue-500">02</h3>
          <p className="text-xl font-semibold">GPT-Powered Insights</p>
          <p className="text-blue-800">Your AI advisor helps manage spending and saving smartly.</p>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-blue-500">03</h3>
          <p className="text-xl font-semibold">Visual Dashboards</p>
          <p className="text-blue-800">Interactive analytics and spending trends at a glance.</p>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-20 text-sm text-blue-700 text-center px-8 md:px-16 py-6">
        © 2025 FinSavvy. All rights reserved.
      </footer>
    </div>
  );
};

export default Homepage;