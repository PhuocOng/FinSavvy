import { motion } from "framer-motion";
import { TrendingUp, PieChart, Activity } from "lucide-react";
import { SectionHeading } from "./Components";
import insightsImg from "../../assets/insights-chart.svg";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5, delay }
});

const OurInsights = () => {
  return (
    <motion.section
      id="insights"
      className="scroll-mt-32 relative mx-auto w-full max-w-7xl px-6 md:px-10 pt-16 pb-16 overflow-hidden"
      {...fade(0.1)}
    >
      {/* background blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[20%] top-0 h-96 w-96 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 blur-3xl opacity-60" />
        <div className="absolute right-[10%] bottom-0 h-80 w-80 rounded-full bg-gradient-to-br from-indigo-100 to-blue-50 blur-3xl opacity-50" />
      </div>

      {/* Force equal column height + vertical centering */}
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center lg:min-h-[520px]">
        {/* Left column */}
        <div className="flex flex-col justify-center h-full">
          <SectionHeading
            eyebrow="Insights"
            title="Our Insights"
            subtitle="Your money tells a story — we help you read it. FinSavvy turns raw transactions into clear, actionable insights so you always know what's working and what's holding you back."
          />

          <div className="mt-8 grid sm:grid-cols-2 gap-4">
            {[
              { icon: TrendingUp, title: "Spending Trends", text: "See where your money goes month to month." },
              { icon: PieChart, title: "Category Insights", text: "Understand your spending categories instantly." },
              { icon: Activity, title: "Real-time Analysis", text: "AI-powered breakdowns of your financial health." }
            ].map(({ icon: Icon, title, text }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true, amount: 0.3 }}
                className="rounded-xl border border-slate-200/60 bg-white/80 backdrop-blur p-5 shadow-sm hover:shadow-md transition"
              >
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="font-semibold">{title}</div>
                <p className="text-sm text-slate-600">{text}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right column */}
        <motion.div
          initial={{ y: 6, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative flex items-center justify-center lg:justify-end h-full"
        >
          <div className="w-full max-w-xl rounded-3xl border border-white/60 bg-white/80 backdrop-blur p-4 shadow-xl">
            {/* keep aspect to avoid weird vertical imbalance */}
            <div className="w-full aspect-[16/11]">
              <img
                src={insightsImg}
                alt="Financial insights chart"
                className="w-full h-full rounded-2xl object-contain"
                loading="lazy"
              />
            </div>
          </div>

          {/* floating label */}
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute top-2 right-2 rounded-full bg-blue-600 text-white text-xs font-semibold px-3 py-1 shadow-md"
          >
            AI Analysis
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default OurInsights;
