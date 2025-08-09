// Homepage.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Wallet,
  TrendingDown,
  Target,
  PlusCircle,
  BarChart3,
  Link2
} from 'lucide-react';
import cardPayment from '../../assets/card-payment.png';
import ChatBot from '../ChatBot/ChatBot';
import Footer from '../../components/Footer';

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay }
});

const StatCard = ({ icon: Icon, title, value, sub, className = '' }) => (
  <motion.div
    whileHover={{ y: -4 }}
    transition={{ type: 'spring', stiffness: 250, damping: 18 }}
    className={`group relative rounded-2xl border border-slate-200/70 bg-white/80 backdrop-blur p-6 shadow-sm ${className}`}
  >
    {/* subtle gradient header line */}
    <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
    <div className="flex items-center gap-3">
      <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white grid place-items-center shadow">
        <Icon className="h-5 w-5" />
      </div>
      <div className="text-sm font-semibold text-slate-600">{title}</div>
    </div>

    <div className="mt-4 text-3xl font-extrabold text-slate-900">{value}</div>
    {sub && <div className="mt-1 text-sm text-slate-500">{sub}</div>}

    {/* glow on hover */}
    <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-transparent group-hover:ring-blue-500/30 transition" />
  </motion.div>
);

const ProgressRing = ({ percent = 70 }) => {
  const p = Math.max(0, Math.min(100, percent));
  return (
    <div className="relative h-24 w-24">
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `conic-gradient(#2563eb ${p * 3.6}deg, #e5e7eb 0deg)`
        }}
      />
      <div className="absolute inset-2 rounded-full bg-white grid place-items-center text-center">
        <div className="text-lg font-extrabold text-slate-900">{p}%</div>
        <div className="text-[10px] text-slate-500 -mt-0.5">Complete</div>
      </div>
    </div>
  );
};

const Homepage = () => {
  return (
    <motion.div
      // Add dark background
      className="w-full overflow-hidden min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 font-sans flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* decorative blobs for dark mode */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-10 top-16 h-64 w-64 rounded-full bg-blue-200/50 dark:bg-blue-900/50 blur-3xl" />
        <div className="absolute right-10 top-40 h-72 w-72 rounded-full bg-indigo-200/50 dark:bg-indigo-900/50 blur-3xl" />
      </div>

      {/* Hero */}
      <section className="mx-auto w-full max-w-7xl px-6 md:px-10 pt-10 md:pt-14">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <motion.div {...fade(0.05)} className="max-w-2xl">
            {/* Add dark styles */}
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/70 px-3 py-1 text-xs font-semibold text-blue-700 backdrop-blur dark:bg-slate-800/70 dark:border-blue-800 dark:text-blue-300">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              AI coach is online
            </div>
            {/* Add dark text color */}
            <h1 className="mt-4 text-5xl md:text-6xl font-black leading-tight text-slate-900 dark:text-slate-100">
              Welcome back to{' '}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                FinSavvy
              </span>
              !
            </h1>
            {/* Add dark text color */}
            <p className="mt-4 text-slate-700 dark:text-slate-400 text-lg">
              Track spending, explore AI-powered insights, and get advice to reach your goals.
            </p>

            {/* Quick actions - Update secondary buttons */}
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/dashboard?action=add"
                className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition"
              >
                <PlusCircle className="h-4 w-4" /> Add expense
              </Link>
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white/80 px-5 py-2.5 text-sm font-semibold hover:bg-white transition dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                <BarChart3 className="h-4 w-4" /> View reports
              </Link>
              <Link
                to="/dashboard?action=connect"
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white/80 px-5 py-2.5 text-sm font-semibold hover:bg-white transition dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                <Link2 className="h-4 w-4" /> Connect bank
              </Link>
            </div>
          </motion.div>

          <motion.div {...fade(0.1)} className="relative flex justify-center md:justify-end">
            {/* Add dark styles */}
            <div className="rounded-3xl border border-white/60 bg-white/80 backdrop-blur p-4 shadow-xl dark:border-slate-700/60 dark:bg-slate-900/80">
              <img
                src={cardPayment}
                alt="Finance illustration"
                className="w-80 md:w-96 rounded-2xl object-contain drop-shadow"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats - update the JSX for StatCard directly */}
      <section className="mx-auto w-full max-w-7xl px-6 md:px-10 mt-8 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* We add dark classes directly to the StatCard elements */}
          <motion.div whileHover={{ y: -4 }} /* ... */ className="group relative rounded-2xl border border-slate-200/70 bg-white/80 backdrop-blur p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
            <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white grid place-items-center shadow">
                <Wallet className="h-5 w-5" />
              </div>
              <div className="text-sm font-semibold text-slate-600 dark:text-slate-400">Current Balance</div>
            </div>
            <div className="mt-4 text-3xl font-extrabold text-slate-900 dark:text-slate-100">$5,240</div>
            <div className="mt-1 text-sm text-slate-500 dark:text-slate-400"><span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-500">+$120 today</span></div>
            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-transparent group-hover:ring-blue-500/30 transition" />
          </motion.div>
          {/* Repeat for other StatCards */}
          <motion.div whileHover={{ y: -4 }} /* ... */ className="group relative rounded-2xl border border-slate-200/70 bg-white/80 backdrop-blur p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
            <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white grid place-items-center shadow">
                <TrendingDown className="h-5 w-5" />
              </div>
              <div className="text-sm font-semibold text-slate-600 dark:text-slate-400">This Month's Spending</div>
            </div>
            <div className="mt-4 text-3xl font-extrabold text-slate-900 dark:text-slate-100">$1,320</div>
            <div className="mt-1 text-sm text-slate-500 dark:text-slate-400"><span className="text-rose-600 dark:text-rose-500">+8% vs last month</span></div>
            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-transparent group-hover:ring-blue-500/30 transition" />
          </motion.div>
          {/* ... and the last one */}
          <motion.div whileHover={{ y: -4 }} /* ... */ className="group relative rounded-2xl border border-slate-200/70 bg-white/80 backdrop-blur p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
            <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white grid place-items-center shadow">
                  <Target className="h-5 w-5" />
                </div>
                <div className="text-sm font-semibold text-slate-600 dark:text-slate-400">Savings Goal</div>
              </div>
              {/* Update ProgressRing colors for dark mode */}
              <div className="relative h-24 w-24">
                <div className="absolute inset-0 rounded-full" style={{ background: `conic-gradient(#2563eb ${70 * 3.6}deg, #374151 0deg)` }} />
                <div className="absolute inset-2 rounded-full bg-slate-900 grid place-items-center text-center">
                  <div className="text-lg font-extrabold text-slate-100">70%</div>
                  <div className="text-[10px] text-slate-400 -mt-0.5">Complete</div>
                </div>
              </div>
            </div>
            <div className="mt-3 text-sm text-slate-500 dark:text-slate-400">You’re on track — keep it up!</div>
            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-transparent group-hover:ring-blue-500/30 transition" />
          </motion.div>
        </div>
      </section>

      {/* ... (Footer and ChatBot remain the same) */}
    </motion.div>
  );
};

export default Homepage;
