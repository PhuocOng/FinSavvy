import { motion } from "framer-motion";
import { Link2, ListChecks, BarChart3, MessageSquare } from "lucide-react";
import { SectionHeading } from "./Components"; // from the shared components file
import dashboardsImg from "../../assets/dashboard-visual.svg"; // update path as needed

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5, delay }
});

const WhatWeDo = () => {
  return (
    <motion.section
      id="what-we-do"
      className="scroll-mt-32 relative mx-auto w-full max-w-7xl px-6 md:px-10 pt-16 pb-16"
      {...fade(0.1)}
    >
      {/* background blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute right-[-10%] top-10 h-72 w-72 rounded-full bg-gradient-to-br from-blue-200 to-indigo-200 blur-3xl opacity-50" />
        <div className="absolute left-[-10%] bottom-0 h-80 w-80 rounded-full bg-gradient-to-br from-indigo-200 to-blue-100 blur-3xl opacity-50" />
      </div>

      <div className="grid lg:grid-cols-2 gap-10 items-center">
        {/* left column */}
        <div>
          <SectionHeading
            eyebrow="Product"
            title="What We Do"
            subtitle="We simplify money management so you can plan smarter, save faster, and stress less."
          />
          <div className="mt-6 grid grid-cols-2 gap-4">
            {[
              { icon: Link2, h: "Connect", p: "Securely link all your accounts in minutes." },
              { icon: ListChecks, h: "Track", p: "Auto-categorize income, expenses, budgets & goals." },
              { icon: BarChart3, h: "Visualize", p: "Interactive dashboards reveal patterns & trends." },
              { icon: MessageSquare, h: "Get Advice", p: "GPT-powered tips tailored to your habits." }
            ].map(({ icon: Icon, h, p }, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-xl border border-slate-200/70 bg-white/80 backdrop-blur p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition"
              >
                <div className="mt-0.5 h-9 w-9 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 text-white grid place-items-center">
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-sm font-semibold">{h}</div>
                  <div className="text-xs text-slate-600">{p}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* right column */}
        <motion.div
          initial={{ y: 6, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative flex justify-center lg:justify-end"
        >
          <div className="w-full max-w-xl rounded-3xl border border-white/60 bg-white/70 backdrop-blur p-4 shadow-xl">
            <img
              src={dashboardsImg}
              alt="FinSavvy dashboard"
              className="w-full h-auto rounded-2xl object-contain"
              loading="lazy"
            />
          </div>

          {/* floating labels */}
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute -top-4 -left-4 rounded-xl bg-blue-600 text-white text-xs font-semibold px-3 py-2 shadow-lg"
          >
            Real-time insights
          </motion.div>
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.5 }}
            className="absolute -bottom-4 -right-4 rounded-xl bg-indigo-600 text-white text-xs font-semibold px-3 py-2 shadow-lg"
          >
            Smart budgets
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default WhatWeDo;
