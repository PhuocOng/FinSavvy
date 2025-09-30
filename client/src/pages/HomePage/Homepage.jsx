// Homepage.jsx
import React, { useContext, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { AppContent } from "../../context/AppContext";
import {
  Wallet,
  TrendingDown,
  TrendingUp,
  Target,
  PlusCircle,
  BarChart3,
  Link2,
  Eye,
  DollarSign,
  Activity,
  Bell,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  CreditCard,
  PieChart,
} from "lucide-react";
import cardPayment from "../../assets/card-payment.png";
import ChatBot from "../ChatBot/ChatBot";
import Footer from "../../components/Footer";
import "./Homepage.css";

const Homepage = () => {
  const { userData } = useContext(AppContent);
  const [stats, setStats] = useState({
    totalBalance: 12450.8,
    monthlyIncome: 5200.0,
    monthlyExpenses: 3750.25,
    savings: 1449.75,
  });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const cardHoverVariants = {
    hover: {
      y: -8,
      scale: 1.02,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
  };

  // Stats card data
  const statsCards = [
    {
      title: "Total Balance",
      value: `$${stats.totalBalance.toLocaleString()}`,
      change: "+12.5%",
      changeType: "positive",
      icon: Wallet,
      gradient: "from-blue-500 to-indigo-600",
      bgLight: "bg-blue-50",
      bgDark: "dark:bg-blue-900/20",
    },
    {
      title: "Monthly Income",
      value: `$${stats.monthlyIncome.toLocaleString()}`,
      change: "+8.2%",
      changeType: "positive",
      icon: TrendingUp,
      gradient: "from-green-500 to-emerald-600",
      bgLight: "bg-green-50",
      bgDark: "dark:bg-green-900/20",
    },
    {
      title: "Monthly Expenses",
      value: `$${stats.monthlyExpenses.toLocaleString()}`,
      change: "-3.1%",
      changeType: "negative",
      icon: TrendingDown,
      gradient: "from-red-500 to-pink-600",
      bgLight: "bg-red-50",
      bgDark: "dark:bg-red-900/20",
    },
    {
      title: "Savings Goal",
      value: `$${stats.savings.toLocaleString()}`,
      change: "+15.8%",
      changeType: "positive",
      icon: Target,
      gradient: "from-purple-500 to-indigo-600",
      bgLight: "bg-purple-50",
      bgDark: "dark:bg-purple-900/20",
    },
  ];

  // Recent transactions mock data
  const recentTransactions = [
    {
      id: 1,
      name: "Starbucks Coffee",
      amount: -5.8,
      category: "Food",
      date: "Today",
      icon: "☕",
    },
    {
      id: 2,
      name: "Salary Deposit",
      amount: 2600.0,
      category: "Income",
      date: "Yesterday",
      icon: "💰",
    },
    {
      id: 3,
      name: "Netflix Subscription",
      amount: -15.99,
      category: "Entertainment",
      date: "2 days ago",
      icon: "🎬",
    },
    {
      id: 4,
      name: "Grocery Shopping",
      amount: -87.65,
      category: "Food",
      date: "3 days ago",
      icon: "🛒",
    },
  ];

  // Quick actions
  const quickActions = [
    {
      title: "Add Expense",
      icon: PlusCircle,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      title: "View Analytics",
      icon: BarChart3,
      color: "text-green-600 dark:text-green-400",
      bg: "bg-green-50 dark:bg-green-900/20",
    },
    {
      title: "Set Budget",
      icon: Target,
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-50 dark:bg-purple-900/20",
    },
    {
      title: "Financial Goals",
      icon: Eye,
      color: "text-indigo-600 dark:text-indigo-400",
      bg: "bg-indigo-50 dark:bg-indigo-900/20",
    },
  ];

  return (
    <motion.div
      className="homepage-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 homepage-background-blob-1 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 homepage-background-blob-2 rounded-full blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5,
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <motion.div className="mb-8" variants={itemVariants}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <motion.h1
                className="text-3xl sm:text-4xl font-bold homepage-header-title"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{ backgroundSize: "200% 200%" }}
              >
                Welcome back, {userData?.name || "User"}! 👋
              </motion.h1>
              <p className="mt-2 homepage-header-subtitle text-lg">
                Here's your financial overview for today
              </p>
            </div>
            <motion.div
              className="mt-4 sm:mt-0 flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center space-x-2 homepage-date-container px-4 py-2 rounded-full">
                <Calendar className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                <span className="text-sm font-medium homepage-date-text">
                  {new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Stats Cards Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          variants={itemVariants}
        >
          {statsCards.map((card, index) => (
            <motion.div
              key={card.title}
              className={`relative p-6 rounded-3xl ${card.bgLight} ${card.bgDark} homepage-stats-card shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden`}
              variants={cardHoverVariants}
              whileHover="hover"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Gradient overlay on hover */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                initial={false}
              />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <motion.div
                    className={`p-3 rounded-2xl bg-gradient-to-br ${card.gradient} text-white shadow-lg`}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <card.icon className="w-6 h-6" />
                  </motion.div>
                  <motion.div
                    className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-semibold homepage-change-badge ${
                      card.changeType === "positive"
                        ? "homepage-change-positive"
                        : "homepage-change-negative"
                    }`}
                    whileHover={{ scale: 1.1 }}
                  >
                    {card.changeType === "positive" ? (
                      <ArrowUpRight className="w-3 h-3" />
                    ) : (
                      <ArrowDownRight className="w-3 h-3" />
                    )}
                    <span>{card.change}</span>
                  </motion.div>
                </div>

                <h3 className="text-sm font-medium homepage-card-title mb-2">
                  {card.title}
                </h3>
                <motion.p
                  className="text-2xl font-bold homepage-card-value"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
                >
                  {card.value}
                </motion.p>
              </div>

              {/* Animated border */}
              <motion.div
                className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${card.gradient} opacity-0 group-hover:opacity-100 transition-all duration-500`}
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.8 }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Transactions */}
          <motion.div className="lg:col-span-2" variants={itemVariants}>
            <div className="homepage-content-panel rounded-3xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold homepage-section-title flex items-center">
                  <Activity className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
                  Recent Transactions
                </h2>
                <motion.button
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm flex items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View All
                  <ArrowUpRight className="w-4 h-4 ml-1" />
                </motion.button>
              </div>

              <div className="space-y-4">
                {recentTransactions.map((transaction, index) => (
                  <motion.div
                    key={transaction.id}
                    className="flex items-center justify-between p-4 rounded-2xl homepage-transaction-item transition-colors duration-200"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ x: 4 }}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="text-2xl">{transaction.icon}</div>
                      <div>
                        <h3 className="font-semibold homepage-transaction-name">
                          {transaction.name}
                        </h3>
                        <p className="text-sm homepage-transaction-meta">
                          {transaction.category} • {transaction.date}
                        </p>
                      </div>
                    </div>
                    <motion.div
                      className={`font-bold ${
                        transaction.amount > 0
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-600 dark:text-red-400"
                      }`}
                      whileHover={{ scale: 1.1 }}
                    >
                      {transaction.amount > 0 ? "+" : ""}$
                      {Math.abs(transaction.amount)}
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Quick Actions & Insights */}
          <motion.div className="space-y-6" variants={itemVariants}>
            {/* Quick Actions */}
            <div className="homepage-content-panel rounded-3xl shadow-lg p-6">
              <h2 className="text-xl font-bold homepage-section-title mb-6 flex items-center">
                <PlusCircle className="w-5 h-5 mr-2 text-indigo-600 dark:text-indigo-400" />
                Quick Actions
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {quickActions.map((action, index) => (
                  <motion.button
                    key={action.title}
                    className={`p-4 rounded-2xl ${action.bg} homepage-quick-action-btn hover:scale-105 transition-all duration-200 flex flex-col items-center justify-center`}
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <action.icon className={`w-6 h-6 ${action.color} mb-2`} />
                    <p className="text-sm font-semibold homepage-quick-action-text">
                      {action.title}
                    </p>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Financial Insight */}
            <motion.div
              className="homepage-insight-panel rounded-3xl shadow-lg p-6"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center mb-4">
                <div className="p-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
                  <Bell className="w-5 h-5" />
                </div>
                <h3 className="ml-3 font-bold homepage-insight-title">
                  💡 Smart Insight
                </h3>
              </div>
              <p className="homepage-insight-text leading-relaxed">
                You're spending 15% less on dining out this month compared to
                last month. Great job! Consider moving the saved amount to your
                emergency fund.
              </p>
              <motion.button
                className="mt-4 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm flex items-center"
                whileHover={{ x: 4 }}
              >
                View Details
                <ArrowUpRight className="w-4 h-4 ml-1" />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        {/* Quick Action Buttons */}
        <motion.div
          className="mt-8 flex flex-wrap justify-center gap-4"
          variants={itemVariants}
        >
          <Link
            to="/dashboard?action=add"
            className="group relative inline-flex items-center justify-center px-8 py-4 homepage-action-btn-primary font-semibold rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            <PlusCircle className="w-5 h-5 mr-2" />
            <span className="relative z-10">Add Expense</span>
          </Link>

          <Link
            to="/dashboard"
            className="inline-flex items-center justify-center px-8 py-4 homepage-action-btn-secondary font-semibold rounded-2xl shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300"
          >
            <BarChart3 className="w-5 h-5 mr-2" />
            View Analytics
          </Link>

          <Link
            to="/dashboard?action=connect"
            className="inline-flex items-center justify-center px-8 py-4 homepage-action-btn-secondary backdrop-blur-sm border-2 border-slate-200/60  font-semibold rounded-2xl shadow-sm hover:bg-green-50 dark:hover:bg-gray-700/50 hover:border-green-300 dark:hover:border-green-600 hover:text-green-700 dark:hover:text-green-400 hover:shadow-md hover:scale-105 transition-all duration-300"
          >
            <Link2 className="w-5 h-5 mr-2" />
            Connect Bank
          </Link>
        </motion.div>
      </div>

      {/* ChatBot */}
      <ChatBot />

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="mt-12"
      >
        <Footer />
      </motion.div>
    </motion.div>
  );
};

const ProgressRing = ({ percent = 70 }) => {
  const p = Math.max(0, Math.min(100, percent));
  return (
    <div className="relative h-24 w-24">
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `conic-gradient(#2563eb ${p * 3.6}deg, #e5e7eb 0deg)`,
        }}
      />
      <div className="absolute inset-2 rounded-full homepage-progress-ring-inner grid place-items-center text-center">
        <div className="text-lg font-extrabold homepage-progress-text-main">
          {p}%
        </div>
        <div className="text-[10px] homepage-progress-text-sub -mt-0.5">
          Complete
        </div>
      </div>
    </div>
  );
};

export default Homepage;
