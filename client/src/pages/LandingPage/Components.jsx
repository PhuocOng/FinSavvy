import { motion } from "framer-motion";

export const Card = ({ children, className = "", hover = true }) => {
  return (
    <motion.div
      className={`bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 ${className}`}
      whileHover={
        hover
          ? {
              y: -4,
              shadow: "0 20px 40px rgba(0,0,0,0.1)",
              transition: { type: "spring", stiffness: 400, damping: 30 },
            }
          : {}
      }
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.div>
  );
};

export const StatCounter = ({
  to,
  suffix = "",
  decimals = 0,
  duration = 2,
}) => {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.8,
        type: "spring",
        stiffness: 100,
      }}
    >
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration }}
        className="tabular-nums"
      >
        {Number(to).toFixed(decimals)}
      </motion.span>
      <motion.span
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: duration * 0.8 }}
      >
        {suffix}
      </motion.span>
    </motion.span>
  );
};

export const SectionHeading = ({ eyebrow, title, subtitle }) => {
  return (
    <motion.div
      className="text-center mb-12"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      {eyebrow && (
        <motion.p
          className="inline-flex items-center px-4 py-2 text-sm font-semibold uppercase tracking-wider text-blue-600 bg-blue-50/80 backdrop-blur-sm rounded-full border border-blue-200/50 mb-4"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {eyebrow}
        </motion.p>
      )}
      {title && (
        <motion.h2
          className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {title}
        </motion.h2>
      )}
      {subtitle && (
        <motion.p
          className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {subtitle}
        </motion.p>
      )}

      {/* Animated underline */}
      <motion.div
        className="h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-full mt-6 mx-auto"
        initial={{ width: 0 }}
        whileInView={{ width: "6rem" }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.6 }}
      />
    </motion.div>
  );
};

// --- New Floating Animation Component ---
export const FloatingElement = ({
  children,
  delay = 0,
  amplitude = 20,
  duration = 6,
}) => {
  return (
    <motion.div
      animate={{
        y: [0, -amplitude, 0],
        rotate: [0, 2, 0, -2, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    >
      {children}
    </motion.div>
  );
};

// --- New Gradient Text Component ---
export const GradientText = ({
  children,
  gradient = "from-blue-600 to-indigo-600",
}) => {
  return (
    <motion.span
      className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}
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
      {children}
    </motion.span>
  );
};

// --- New Interactive Button Component ---
export const InteractiveButton = ({
  children,
  className = "",
  variant = "primary",
  ...props
}) => {
  const variants = {
    primary:
      "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg hover:shadow-xl",
    secondary:
      "bg-white/80 backdrop-blur-sm border-2 border-slate-200/60 text-slate-700 hover:bg-white",
    accent:
      "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg hover:shadow-xl",
  };

  return (
    <motion.button
      className={`inline-flex items-center justify-center px-8 py-4 font-semibold rounded-2xl transition-all duration-300 ${variants[variant]} ${className}`}
      whileHover={{
        scale: 1.05,
        y: -2,
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      {...props}
    >
      {children}
    </motion.button>
  );
};
