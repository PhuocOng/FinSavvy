import { motion } from "framer-motion";

// --- Card ---
export const Card = ({ children, className = "" }) => {
  return (
    <div className={`bg-white rounded-xl shadow-sm border border-slate-200 ${className}`}>
      {children}
    </div>
  );
};

// --- StatCounter ---
export const StatCounter = ({ to, suffix = "", decimals = 0 }) => {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {Number(to).toFixed(decimals)}
      {suffix}
    </motion.span>
  );
};

// --- SectionHeading ---
export const SectionHeading = ({ eyebrow, title }) => {
  return (
    <div className="text-center mb-6">
      {eyebrow && (
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-600 mb-1">
          {eyebrow}
        </p>
      )}
      {title && (
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">
          {title}
        </h2>
      )}
    </div>
  );
};
