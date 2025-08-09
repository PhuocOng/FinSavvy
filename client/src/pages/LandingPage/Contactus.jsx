import { motion } from "framer-motion";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5, delay }
});

const ContactUs = () => {
  return (
    // match other sections: same id, scroll offset, and container width
    <section id="contact" className="scroll-mt-32 mx-auto w-full max-w-7xl px-6 md:px-10 pt-16 pb-16">
      {/* subtle background blobs (optional, won’t create a solid band) */}
      <div className="pointer-events-none absolute inset-x-0 -z-10">
        <div className="mx-auto h-40 w-40 rounded-full bg-blue-200/40 blur-3xl opacity-50" />
      </div>

      <motion.div {...fade(0)}>
        <div className="mb-1 text-[11px] md:text-xs font-semibold tracking-wider uppercase text-blue-700">
          Contact
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">Contact Us</h2>
        <div className="mt-3 h-1 w-24 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-transparent" />
        <p className="mt-4 text-slate-700 leading-relaxed max-w-3xl">
          Got questions, feedback, or partnership ideas? Drop us a message — we reply within 24 hours.
        </p>
      </motion.div>

      {/* Two-column: form + direct contact */}
      <div className="mt-8 grid gap-6 lg:grid-cols-2 items-stretch">
        {/* Form card */}
        <motion.form
          {...fade(0.05)}
          className="rounded-2xl border border-slate-200/70 bg-white/80 backdrop-blur p-6 shadow-sm"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700">Name</label>
              <input
                type="text"
                placeholder="Your name"
                className="mt-1 w-full rounded-lg border border-slate-300 bg-white/90 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="mt-1 w-full rounded-lg border border-slate-300 bg-white/90 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700">Message</label>
              <textarea
                rows={6}
                placeholder="Write your message here..."
                className="mt-1 w-full rounded-lg border border-slate-300 bg-white/90 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="mt-5">
            <button
              type="submit"
              className="rounded-full bg-blue-600 text-white px-5 py-2.5 text-sm font-semibold hover:bg-blue-700 transition"
            >
              Send Message
            </button>
          </div>
        </motion.form>

        {/* Info / Support card */}
        <motion.div
          {...fade(0.1)}
          className="rounded-2xl border border-slate-200/70 bg-white/80 backdrop-blur p-6 shadow-sm flex flex-col justify-between"
        >
          <div>
            <h3 className="text-lg font-bold text-slate-900">Support</h3>
            <p className="mt-2 text-sm text-slate-600">
              Prefer email or a quick call? We’re happy to help.
            </p>

            <div className="mt-4 space-y-3">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Email</div>
                <a href="mailto:support@finsavvy.com" className="text-sm text-blue-600 hover:underline">
                  support@finsavvy.com
                </a>
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Phone</div>
                <a href="tel:+1234567890" className="text-sm text-blue-600 hover:underline">
                  +1 (234) 567-890
                </a>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="text-sm font-semibold text-slate-900">Office</h4>
            <p className="text-sm text-slate-600">
              123 Market Street<br />San Francisco, CA 94103
            </p>
            <p className="mt-2 text-xs text-slate-500">Mon–Fri, 9am–6pm PT</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactUs;
