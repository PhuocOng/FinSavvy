// LandingPage.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
;

import cardPayment from '../../assets/card-payment.png';
import { Card } from './Components';
import Footer from '../../components/Footer';
import ContactUs from './Contactus';

import secureImg from '../../assets/secure-connection.svg';
import aiInsightsImg from '../../assets/ai-insights.svg';
import dashboardsImg from '../../assets/dashboard-visual.svg';
import OurInsights from './Ourinsights';
import WhyUs from './Whyus';
import WhyWeDo from './Whywedo';


const LandingPage = () => {
  return (
    <motion.div
      className="w-full min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-50 text-slate-900 font-sans flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Hero */}
      <motion.section
        className="mx-auto w-full max-w-7xl px-6 md:px-10 pt-16 md:pt-24 pb-10 md:pb-16 flex flex-col md:flex-row items-center gap-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <div className="max-w-xl">
          <h1 className="text-5xl md:text-6xl font-black leading-tight">
            Take control of your{' '}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">money</span>
          </h1>
          <p className="mt-5 text-lg text-slate-700">
            Connect your bank, track expenses, and get GPT-powered advice tailored to your life.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#insights"
              className="rounded-full bg-blue-600 text-white px-5 py-2.5 text-sm font-semibold hover:bg-blue-700 hover:-translate-y-0.5 transition"
            >
              Explore
            </a>
            <Link
              to="/signup"
              className="rounded-full border border-slate-300 bg-white/80 px-5 py-2.5 text-sm font-semibold hover:bg-white hover:-translate-y-0.5 transition"
            >
              Get Started
            </Link>
          </div>
        </div>

        <motion.div
          className="w-full md:w-[40%] flex justify-center"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <img src={cardPayment} alt="Card Payment" className="w-80 md:w-96 drop-shadow-xl rounded-2xl border border-white/60" />
        </motion.div>
      </motion.section>

      {/* Feature trio (equal-height) */}
      <motion.section
        className="mx-auto w-full max-w-7xl px-6 md:px-10 pb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch"
        initial="hidden"
        animate="visible"
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.12 } } }}
      >
        {[
          { number: '01', title: 'Secure Bank Connection', desc: 'Link your accounts with Plaid for seamless tracking.', img: secureImg },
          { number: '02', title: 'GPT-Powered Insights', desc: 'Your AI advisor helps manage spending and saving smartly.', img: aiInsightsImg },
          { number: '03', title: 'Visual Dashboards', desc: 'Interactive analytics and spending trends at a glance.', img: dashboardsImg }
        ].map(({ number, title, desc, img }, i) => (
          <motion.div key={i} variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0 } }} className="h-full">
            <Card className="h-full p-6 flex flex-col items-center text-center hover:-translate-y-0.5">
              <div className="mb-4 h-10 w-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white grid place-items-center font-extrabold">
                {number}
              </div>
              <img src={img} alt={title} className="w-24 h-24 object-contain mb-4 drop-shadow-sm" loading="lazy" />
              <h3 className="text-lg font-semibold min-h-[48px] flex items-center">{title}</h3>
              <p className="mt-1 text-sm text-slate-600 min-h-[44px]">{desc}</p>
              <div className="mt-auto" />
            </Card>
          </motion.div>
        ))}
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
