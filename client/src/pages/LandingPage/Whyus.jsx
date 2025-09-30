import { CheckCircle, Shield, Brain, Zap, Users } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Card,
  StatCounter,
  SectionHeading,
  FloatingElement,
  GradientText,
} from "./Components.jsx";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
    },
  },
};

const WhyUs = () => {
  return (
    <motion.section
      id="why-us"
      className="scroll-mt-32 relative mx-auto w-full max-w-7xl px-6 md:px-10 pt-24 pb-16 overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
    >
      {/* Background elements */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          className="absolute left-[-15%] top-20 h-80 w-80 rounded-full bg-gradient-to-br from-blue-300/30 to-indigo-300/30 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute right-[-15%] bottom-0 h-96 w-96 rounded-full bg-gradient-to-br from-indigo-300/25 to-purple-300/25 blur-3xl"
          animate={{
            scale: [1, 0.8, 1],
            rotate: [0, -180, -360],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5,
          }}
        />
        <motion.div
          className="absolute top-1/3 left-1/3 w-64 h-64 bg-gradient-to-r from-blue-200/20 to-indigo-200/20 rounded-full blur-2xl"
          animate={{
            x: [0, 100, -50, 0],
            y: [0, -50, 100, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <motion.div variants={itemVariants}>
        <SectionHeading
          eyebrow="Why FinSavvy"
          title={
            <>
              Why choose{" "}
              <GradientText gradient="from-blue-600 via-indigo-600 to-purple-600">
                FinSavvy
              </GradientText>
              ?
            </>
          }
          subtitle="Join thousands who've transformed their financial future with our cutting-edge platform"
        />
      </motion.div>

      <motion.div
        className="mt-16 grid md:grid-cols-3 gap-8 items-stretch"
        variants={containerVariants}
      >
        {/* Reasons list */}
        <motion.div variants={itemVariants} className="space-y-6">
          <Card className="p-8 h-full">
            <div className="mb-6">
              <motion.div
                className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-4"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <Shield className="w-7 h-7 text-white" />
              </motion.div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                Why Trust Us?
              </h3>
            </div>

            <div className="space-y-5">
              {[
                {
                  icon: Shield,
                  title: "Bank-Level Security",
                  desc: "256-bit encryption and zero-knowledge architecture protect your data.",
                  color: "text-blue-600",
                },
                {
                  icon: Brain,
                  title: "AI That Actually Works",
                  desc: "GPT-4 powered insights that adapt to your unique spending patterns.",
                  color: "text-indigo-600",
                },
                {
                  icon: Zap,
                  title: "Lightning Fast",
                  desc: "Real-time sync and instant notifications keep you always informed.",
                  color: "text-purple-600",
                },
                {
                  icon: Users,
                  title: "Community Driven",
                  desc: "Built with feedback from 50,000+ active users worldwide.",
                  color: "text-blue-500",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-start gap-4 p-4 rounded-xl hover:bg-blue-50/50 transition-colors duration-300"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ x: 4 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <item.icon className={`mt-1 h-6 w-6 ${item.color}`} />
                  </motion.div>
                  <div className="flex-1">
                    <div className="font-semibold text-slate-900 mb-1">
                      {item.title}
                    </div>
                    <div className="text-sm text-slate-600 leading-relaxed">
                      {item.desc}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Enhanced Stats */}
        <motion.div variants={itemVariants}>
          <Card className="p-8 h-full flex flex-col justify-between">
            <div>
              <motion.div
                className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mb-6"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <motion.div
                  className="text-white text-2xl font-bold"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  📊
                </motion.div>
              </motion.div>
              <h3 className="text-2xl font-bold text-slate-900 mb-8">
                By The Numbers
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-8">
              {[
                {
                  value: 4.9,
                  suffix: "★",
                  decimals: 1,
                  label: "user rating",
                  delay: 0,
                },
                {
                  value: 99.9,
                  suffix: "%",
                  decimals: 1,
                  label: "uptime",
                  delay: 0.2,
                },
                {
                  value: 50,
                  suffix: "K+",
                  decimals: 0,
                  label: "happy users",
                  delay: 0.4,
                },
                {
                  value: 1,
                  suffix: "M+",
                  decimals: 0,
                  label: "transactions",
                  delay: 0.6,
                },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  className="text-center p-4 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: stat.delay }}
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "rgba(59, 130, 246, 0.1)",
                  }}
                >
                  <div className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    <StatCounter
                      to={stat.value}
                      suffix={stat.suffix}
                      decimals={stat.decimals}
                    />
                  </div>
                  <div className="text-xs text-slate-600 mt-1 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="mt-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
            >
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-3">
                Trusted by teams at
              </div>
              <div className="flex flex-wrap gap-2">
                {["Google", "Microsoft", "Stripe", "Shopify"].map((name, i) => (
                  <motion.div
                    key={name}
                    className="px-3 py-2 rounded-full text-xs font-semibold bg-white/80 text-slate-600 border border-slate-200 shadow-sm"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.9 + i * 0.1 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    {name}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </Card>
        </motion.div>

        {/* Testimonial */}
        <motion.div variants={itemVariants}>
          <Card className="p-8 h-full">
            <motion.div
              className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl mb-6"
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                className="text-white text-2xl"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                💬
              </motion.div>
            </motion.div>

            <h3 className="text-2xl font-bold text-slate-900 mb-6">
              What Users Say
            </h3>

            <div className="relative">
              <motion.div
                className="absolute -top-4 -left-2 text-6xl text-blue-100 select-none"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                "
              </motion.div>

              <div className="relative z-10">
                <FloatingElement delay={1} amplitude={10}>
                  <div className="flex items-start gap-4 mb-6">
                    <motion.div
                      className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-lg shadow-lg"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      JS
                    </motion.div>
                    <div className="flex-1">
                      <motion.p
                        className="italic text-slate-700 text-lg leading-relaxed"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3 }}
                      >
                        "FinSavvy completely transformed how I handle money. The
                        AI insights are incredibly accurate and helped me save
                        over $3,000 in just 6 months!"
                      </motion.p>
                      <div className="mt-4">
                        <div className="font-semibold text-slate-900">
                          Jordan Smith
                        </div>
                        <div className="text-sm text-slate-500">
                          Product Manager at TechCorp
                        </div>
                        <div className="flex items-center gap-1 mt-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <motion.svg
                              key={star}
                              className="w-4 h-4 text-yellow-400"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              initial={{ opacity: 0, scale: 0 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.5 + star * 0.1 }}
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </motion.svg>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </FloatingElement>
              </div>
            </div>
          </Card>
        </motion.div>
      </motion.div>

      {/* CTA banner */}
      <motion.div className="mt-16" variants={itemVariants}>
        <motion.div
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white shadow-2xl"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {/* Animated background elements */}
          <motion.div
            className="pointer-events-none absolute -top-24 -left-20 h-72 w-72 rounded-full bg-white/20 blur-3xl"
            animate={{
              x: [0, 50, 0],
              y: [0, -30, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="pointer-events-none absolute -bottom-24 right-10 h-72 w-72 rounded-full bg-white/10 blur-3xl"
            animate={{
              x: [0, -30, 0],
              y: [0, 20, 0],
              scale: [1, 0.9, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />

          <div className="relative z-10 px-8 md:px-12 py-12 md:py-16">
            <div className="grid gap-8 md:grid-cols-[1fr_auto] items-center">
              <motion.div
                className="max-w-2xl space-y-4"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h3 className="text-3xl md:text-4xl font-extrabold leading-tight">
                  Ready to take control of{" "}
                  <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                    your financial future
                  </span>
                  ?
                </h3>
                <p className="text-lg text-blue-50 leading-relaxed">
                  Join over 50,000 users building better financial habits with
                  real-time insights, smart budgets, and AI-powered guidance.
                </p>
                <div className="flex items-center gap-4 pt-2">
                  <div className="flex items-center gap-1">
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 border-2 border-white flex items-center justify-center text-xs font-bold text-white"
                        >
                          {i}
                        </div>
                      ))}
                    </div>
                    <span className="text-sm text-blue-100 ml-3">
                      50K+ users
                    </span>
                  </div>
                  <div className="text-blue-200">•</div>
                  <div className="text-sm text-blue-100">Free 14-day trial</div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Link
                  to="/login"
                  className="group inline-flex items-center gap-3 rounded-2xl bg-white text-blue-700 px-8 py-4 font-bold text-lg shadow-xl hover:bg-blue-50 transition-all duration-300"
                >
                  <span>Start Free Trial</span>
                  <motion.svg
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </motion.svg>
                </Link>
                <p className="text-xs text-blue-200 mt-3 text-center">
                  No credit card required
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default WhyUs;
