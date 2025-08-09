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
      className="w-full overflow-hidden min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-50 font-sans flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* decorative blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-10 top-16 h-64 w-64 rounded-full bg-blue-200/50 blur-3xl" />
        <div className="absolute right-10 top-40 h-72 w-72 rounded-full bg-indigo-200/50 blur-3xl" />
      </div>

      {/* Hero */}
      <section className="mx-auto w-full max-w-7xl px-6 md:px-10 pt-10 md:pt-14">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <motion.div {...fade(0.05)} className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/70 px-3 py-1 text-xs font-semibold text-blue-700 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              AI coach is online
            </div>
            <h1 className="mt-4 text-5xl md:text-6xl font-black leading-tight text-slate-900">
              Welcome back to{' '}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                FinSavvy
              </span>
              !
            </h1>
            <p className="mt-4 text-slate-700 text-lg">
              Track spending, explore AI-powered insights, and get advice to reach your goals.
            </p>

            {/* Quick actions */}
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/dashboard?action=add"
                className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition"
              >
                <PlusCircle className="h-4 w-4" /> Add expense
              </Link>

              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white/80 px-5 py-2.5 text-sm font-semibold hover:bg-white transition"
              >
                <BarChart3 className="h-4 w-4" /> View reports
              </Link>

              <Link
                to="/dashboard?action=connect"
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white/80 px-5 py-2.5 text-sm font-semibold hover:bg-white transition"
              >
                <Link2 className="h-4 w-4" /> Connect bank
              </Link>
            </div>
          </motion.div>

          <motion.div
            {...fade(0.1)}
            className="relative flex justify-center md:justify-end"
          >
            <div className="rounded-3xl border border-white/60 bg-white/80 backdrop-blur p-4 shadow-xl">
              <img
                src={cardPayment}
                alt="Finance illustration"
                className="w-80 md:w-96 rounded-2xl object-contain drop-shadow"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto w-full max-w-7xl px-6 md:px-10 mt-8 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            icon={Wallet}
            title="Current Balance"
            value="$5,240"
            sub={
              <span className="inline-flex items-center gap-1 text-emerald-600">
                +$120 today
              </span>
            }
          />
          <StatCard
            icon={TrendingDown}
            title="This Month's Spending"
            value="$1,320"
            sub={<span className="text-rose-600">+8% vs last month</span>}
          />
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ type: 'spring', stiffness: 250, damping: 18 }}
            className="group relative rounded-2xl border border-slate-200/70 bg-white/80 backdrop-blur p-6 shadow-sm"
          >
            <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white grid place-items-center shadow">
                  <Target className="h-5 w-5" />
                </div>
                <div className="text-sm font-semibold text-slate-600">Savings Goal</div>
              </div>
              <ProgressRing percent={70} />
            </div>
            <div className="mt-3 text-sm text-slate-500">
              You’re on track — keep it up!
            </div>
            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-transparent group-hover:ring-blue-500/30 transition" />
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mt-10"
      >
        <Footer />
      </motion.div>

      {/* ChatBot Floating Toggle */}
      <ChatBot />
    </motion.div>
  );
};

export default Homepage;
