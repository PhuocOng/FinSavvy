import React from 'react';
import { motion } from 'framer-motion';
import cardPayment from '../../assets/card-payment.png';
import ChatBot from '../ChatBot/ChatBot';

// Dummy Card Component with Motion
const Card = ({ title, value, icon }) => (
  <motion.div
    className="bg-white rounded-lg shadow-md p-6 text-center"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
  >
    <div className="text-3xl mb-2">{icon}</div>
    <h3 className="text-xl font-semibold mb-1">{title}</h3>
    <p className="text-2xl font-bold text-blue-700">{value}</p>
  </motion.div>
);

const Homepage = () => {
  return (
    <motion.div
      className="w-full min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 font-sans flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto px-8 md:px-16 py-10 flex flex-col md:flex-row items-center justify-between flex-grow">
        
        {/* Text Content */}
        <motion.div
          className="flex-1 max-w-xl text-blue-900"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Welcome Back to FinSavvy!
          </h2>
          <p className="mt-6 text-blue-800 text-lg">
            Your personal finance hub is ready. Track your spending, explore AI-powered insights,
            and get advice to reach your goals.
          </p>
        </motion.div>

        {/* Visual Section */}
        <motion.div
          className="flex-1 mt-12 md:mt-0 flex justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <img src={cardPayment} alt="Finance Illustration" className="w-80 md:w-96" />
        </motion.div>
      </div>

      {/* Stats Section */}
      <motion.div
        className="container mx-auto px-8 md:px-16 mt-8 mb-12 grid grid-cols-1 md:grid-cols-3 gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.2,
              delayChildren: 0.5,
            },
          },
        }}
      >
        <Card title="Current Balance" value="$5,240" icon="💰" />
        <Card title="This Month's Spending" value="$1,320" icon="📉" />
        <Card title="Savings Goal" value="70% Complete" icon="🎯" />
      </motion.div>

      {/* Footer */}
      <motion.footer
        className="text-sm text-blue-700 text-center px-8 md:px-16 py-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        © 2025 FinSavvy. All rights reserved.
      </motion.footer>

      {/* ChatBot Floating Toggle */}
      <ChatBot />
    </motion.div>
  );
};

export default Homepage;
