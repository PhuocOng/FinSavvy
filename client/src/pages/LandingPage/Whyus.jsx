import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, StatCounter, SectionHeading } from "./Components.jsx";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5, delay }
});

const WhyUs = () => {
  return (
    <motion.section
      id="why-us"
      className="scroll-mt-32 relative mx-auto w-full max-w-7xl px-6 md:px-10 pt-16 pb-8"
      {...fade(0.15)}
    >
      {/* background accents */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[-10%] top-10 h-72 w-72 rounded-full bg-gradient-to-br from-blue-200 to-indigo-200 blur-3xl opacity-40" />
        <div className="absolute right-[-10%] bottom-0 h-96 w-96 rounded-full bg-gradient-to-br from-indigo-200 to-blue-100 blur-3xl opacity-40" />
      </div>

      <SectionHeading eyebrow="Why FinSavvy" title="Why Us" />

      <div className="mt-8 grid md:grid-cols-3 gap-6 items-stretch">
        {/* Reasons list */}
        <Card className="p-6 min-h-[220px]">
          <ul className="space-y-4">
            {[
              { k: "Bank-Level Security", v: "Data encrypted and protected end-to-end." },
              { k: "AI That Works for You", v: "GPT-powered guidance for confident decisions." },
              { k: "Beautiful & Functional", v: "Clean interface designed for everyday use." },
              { k: "All-in-One", v: "Accounts, budgets, insights, and goals — together." }
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle className="mt-0.5 h-5 w-5 text-blue-600" />
                <div>
                  <span className="font-semibold">{item.k}:</span> {item.v}
                </div>
              </li>
            ))}
          </ul>
        </Card>

        {/* Stats + trust badges */}
        <Card className="p-6 flex flex-col justify-between min-h-[220px]">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-3xl font-extrabold">
                <StatCounter to={4.8} suffix="★" decimals={1} />
              </div>
              <div className="text-xs text-slate-600">avg. user rating</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold">
                <StatCounter to={99.9} suffix="%" decimals={1} />
              </div>
              <div className="text-xs text-slate-600">uptime last 12 mo</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold">
                <StatCounter to={200} suffix="K+" />
              </div>
              <div className="text-xs text-slate-600">transactions tracked</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold">
                <StatCounter to={256} suffix="-bit" />
              </div>
              <div className="text-xs text-slate-600">encryption in transit</div>
            </div>
          </div>

          <div className="mt-6">
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">
              Trusted by users at
            </div>
            <div className="flex flex-wrap gap-2">
              {["Acme", "Northwind", "Globex", "Umbrella"].map((name) => (
                <div
                  key={name}
                  className="px-3 py-1.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200"
                >
                  {name}
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Testimonial */}
        <Card className="p-6 min-h-[220px]">
          <div className="relative">
            <div className="absolute -top-3 -left-1 text-6xl text-blue-100 select-none">“</div>
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white grid place-items-center font-bold">
                JS
              </div>
              <div>
                <p className="italic text-slate-700">
                  “FinSavvy turned my messy spending into a clear plan. The AI tips actually helped me save without
                  feeling restricted.”
                </p>
                <div className="mt-3 text-sm font-semibold">Jordan S.</div>
                <div className="text-xs text-slate-500">Product Manager</div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* CTA banner */}
      <div className="mt-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-xl">
          <div className="pointer-events-none absolute -top-24 -left-20 h-72 w-72 rounded-full bg-white/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 right-10 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

          <div className="px-6 md:px-10 py-8 md:py-10 grid gap-6 md:grid-cols-[1fr_auto] items-center">
            <div className="max-w-2xl">
              <h3 className="text-2xl md:text-3xl font-extrabold leading-tight">
                Ready to take control of your money?
              </h3>
              <p className="mt-2 text-white/90">
                Join thousands building better habits with real-time insights and smart budgets.
              </p>
            </div>

            <Link
              to="/login"
              className="justify-self-start md:justify-self-end inline-flex items-center gap-2 rounded-full bg-white text-blue-700 px-5 py-2.5 text-sm font-semibold hover:bg-slate-100 hover:-translate-y-0.5 transition"
            >
              Create free account
            </Link>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default WhyUs;
