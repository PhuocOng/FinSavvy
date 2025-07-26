// LandingPage.jsx
import React, { useContext, useEffect } from 'react';
import { motion } from 'framer-motion';
import cardPayment from '../../assets/card-payment.png';
import Footer from '../../components/Footer';

const LandingPage = () => {
  return (
    <motion.div
      className="w-full min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 text-white font-sans flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Hero Section */}
      <motion.div
        className="px-8 md:px-20 py-20 flex flex-col md:flex-row items-center justify-between"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="max-w-xl">
          <motion.h2
            className="text-5xl md:text-6xl font-extrabold leading-tight mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Fast & Smart <br />
            <span className="text-yellow-300">Personal Finance Assistant</span>
          </motion.h2>

          <motion.p
            className="text-lg md:text-xl text-gray-200 mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Connect your bank, track your expenses, and get GPT-powered financial advice tailored to your life.
          </motion.p>
        </div>

        <motion.div
          className="mt-12 md:mt-0 flex justify-center w-full md:w-1/2"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <img src={cardPayment} alt="Card Payment" className="w-80 md:w-96 drop-shadow-2xl" />
        </motion.div>
      </motion.div>

      {/* Features */}
      <motion.div
        className="px-8 md:px-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mt-20"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 1 },
          },
        }}
      >
        {[
          { number: '01', title: 'Secure Bank Connection', desc: 'Link your accounts with Plaid for seamless tracking.' },
          { number: '02', title: 'GPT-Powered Insights', desc: 'Your AI advisor helps manage spending and saving smartly.' },
          { number: '03', title: 'Visual Dashboards', desc: 'Interactive analytics and spending trends at a glance.' },
        ].map((feature, index) => (
          <motion.div
            key={index}
            className="bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-lg hover:scale-105 transition text-center"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <h3 className="text-3xl font-bold text-yellow-300 mb-2">{feature.number}</h3>
            <p className="text-xl font-semibold mb-2">{feature.title}</p>
            <p className="text-gray-200 text-sm">{feature.desc}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Reusable Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="mt-20"
      >
        <Footer />
      </motion.div>
    </motion.div>
  );
};

export default LandingPage;
