// LandingPage.jsx
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import cardPayment from "../../assets/card-payment.png";
import { Card } from "./Components";
import Footer from "../../components/Footer";
import ContactUs from "./Contactus";

import secureImg from "../../assets/secure-connection.svg";
import aiInsightsImg from "../../assets/ai-insights.svg";
import dashboardsImg from "../../assets/dashboard-visual.svg";
import OurInsights from "./Ourinsights";
import WhyUs from "./Whyus";
import WhyWeDo from "./Whywedo";

const LandingPage = () => {
  return (
    <motion.div
      className="w-full min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-50/30 text-slate-900 font-sans flex flex-col relative overflow-x-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Animated Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-indigo-400/15 to-purple-400/15 rounded-full blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 0.9, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5,
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-blue-300/10 to-indigo-300/10 rounded-full blur-2xl"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Hero */}
      <motion.section
        className="relative mx-auto w-full max-w-7xl px-6 md:px-10 pt-20 md:pt-32 pb-16 md:pb-24"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="space-y-6">
              <motion.div
                className="inline-flex items-center px-4 py-2 bg-blue-50/80 backdrop-blur-sm border border-blue-200/50 rounded-full text-sm font-medium text-blue-700 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                🎉 New: GPT-4 powered financial insights
              </motion.div>

              <motion.h1
                className="text-5xl md:text-7xl font-black leading-[1.1] tracking-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                Take control of your{" "}
                <motion.span
                  className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent relative"
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
                  financial future
                </motion.span>
              </motion.h1>

              <motion.p
                className="text-xl text-slate-600 leading-relaxed max-w-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
              >
                Connect your bank, track expenses intelligently, and get
                AI-powered advice tailored to your unique financial journey.
              </motion.p>
            </div>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
            >
              <Link
                to="/signup"
                className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 hover:from-blue-500 hover:to-indigo-500"
              >
                <span className="relative z-10 text-white">
                  Start Free Trial
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  whileHover={{ scale: 1.02 }}
                />
              </Link>

              <motion.a
                href="#insights"
                className="inline-flex items-center justify-center px-8 py-4 bg-white/80 backdrop-blur-sm border-2 border-slate-200/60 text-slate-700 font-semibold rounded-2xl shadow-sm hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 hover:shadow-md hover:scale-105 transition-all duration-300"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Watch Demo
                <motion.svg
                  className="ml-2 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </motion.svg>
              </motion.a>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              className="flex items-center gap-6 pt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.3 }}
            >
              <div className="text-sm text-slate-500">
                Trusted by 50,000+ users
              </div>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <motion.svg
                    key={star}
                    className="w-4 h-4 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 1.3 + star * 0.1 }}
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </motion.svg>
                ))}
                <span className="ml-1 text-sm text-slate-600">4.9/5</span>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <motion.div
              className="relative"
              animate={{
                y: [0, -20, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="relative z-10 max-w-lg">
                <motion.img
                  src={cardPayment}
                  alt="FinSavvy Dashboard"
                  className="w-full h-auto drop-shadow-2xl rounded-3xl border border-white/60"
                  whileHover={{
                    scale: 1.05,
                    rotate: 2,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              </div>

              {/* Floating elements */}
              <motion.div
                className="absolute -top-6 -left-6 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg"
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
              >
                💰 +$1,250 saved
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -right-6 bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg"
                animate={{
                  y: [0, 8, 0],
                  rotate: [0, -5, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2,
                }}
              >
                📈 Smart insights
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Feature Section */}
      <motion.section
        className="relative mx-auto w-full max-w-7xl px-6 md:px-10 pb-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.2,
              delayChildren: 0.1,
            },
          },
        }}
      >
        <motion.div
          className="text-center mb-16"
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Everything you need to
            <motion.span
              className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 10, repeat: Infinity }}
              style={{ backgroundSize: "200% 200%" }}
            >
              master your money
            </motion.span>
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Powerful features designed to simplify your financial life
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {[
            {
              number: "01",
              title: "Bank-Level Security",
              desc: "Connect your accounts with military-grade encryption and Plaid integration for seamless, secure tracking.",
              img: secureImg,
              gradient: "from-blue-500 to-cyan-500",
              delay: 0,
            },
            {
              number: "02",
              title: "AI Financial Advisor",
              desc: "Get personalized insights powered by GPT-4 that help you save smarter and spend wisely.",
              img: aiInsightsImg,
              gradient: "from-indigo-500 to-purple-500",
              delay: 0.1,
            },
            {
              number: "03",
              title: "Interactive Analytics",
              desc: "Beautiful dashboards that turn complex data into clear, actionable financial insights.",
              img: dashboardsImg,
              gradient: "from-purple-500 to-pink-500",
              delay: 0.2,
            },
          ].map(({ number, title, desc, img, gradient, delay }, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 50, scale: 0.9 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    type: "spring",
                    stiffness: 100,
                    damping: 20,
                    delay,
                  },
                },
              }}
              className="group h-full"
            >
              <motion.div
                className="h-full p-8 bg-white/60 backdrop-blur-lg rounded-3xl border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-500 relative overflow-hidden"
                whileHover={{
                  y: -8,
                  scale: 1.02,
                  transition: { type: "spring", stiffness: 400, damping: 30 },
                }}
              >
                {/* Animated background */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  initial={false}
                />

                <div className="relative z-10 flex flex-col items-center text-center h-full">
                  <motion.div
                    className={`mb-6 h-16 w-16 rounded-2xl bg-gradient-to-br ${gradient} text-white flex items-center justify-center font-bold text-lg shadow-lg`}
                    whileHover={{
                      rotate: 360,
                      scale: 1.1,
                    }}
                    transition={{ duration: 0.6 }}
                  >
                    {number}
                  </motion.div>

                  <motion.div
                    className="mb-6"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <img
                      src={img}
                      alt={title}
                      className="w-24 h-24 object-contain drop-shadow-lg"
                      loading="lazy"
                    />
                  </motion.div>

                  <h3 className="text-xl font-bold text-slate-900 mb-3 min-h-[56px] flex items-center">
                    {title}
                  </h3>

                  <p className="text-slate-600 leading-relaxed flex-1 min-h-[80px]">
                    {desc}
                  </p>

                  <motion.div
                    className={`mt-6 w-full h-1 bg-gradient-to-r ${gradient} rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500`}
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.8 }}
                  />
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Our Insights */}
      <OurInsights />
      {/* Why We Do */}
      <WhyWeDo />
      {/* Why Us */}
      <WhyUs />
      {/* Contact Us */}
      <ContactUs />

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="mt-12 overflow-hidden"
      >
        <Footer />
      </motion.div>
    </motion.div>
  );
};

export default LandingPage;
