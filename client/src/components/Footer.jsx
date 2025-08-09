import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Twitter, Github, Linkedin, ChevronRight } from 'lucide-react';

const Footer = () => {
  const year = new Date().getFullYear();

  const onSubmit = (e) => {
    e.preventDefault();
    // TODO: wire to your email provider
  };

  return (
    <footer className="relative mt-20">
      {/* soft gradient top accent */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-300/60 to-transparent" />

      <div className="relative bg-white/70 supports-[backdrop-filter]:backdrop-blur">
        {/* decorative blobs */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-16 left-10 h-40 w-40 rounded-full bg-blue-200/40 blur-3xl" />
          <div className="absolute -bottom-16 right-10 h-48 w-48 rounded-full bg-indigo-200/40 blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl px-6 md:px-10 py-10">
          {/* top row */}
          <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr_1fr_1.2fr]">
            {/* Brand + blurb */}
            <div>
              <Link to="/" className="inline-flex items-center gap-2">
                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 grid place-items-center text-white font-extrabold shadow-sm">
                  FS
                </div>
                <span className="text-lg font-extrabold tracking-tight">FinSavvy</span>
              </Link>
              <p className="mt-3 text-sm text-slate-600 max-w-sm">
                Take control of your money with secure bank connections, GPT-powered insights, and beautiful dashboards.
              </p>

              {/* Socials */}
              <div className="mt-4 flex items-center gap-3">
                <a href="#" aria-label="Twitter" className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 transition">
                  <Twitter className="h-4 w-4" />
                </a>
                <a href="#" aria-label="GitHub" className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 transition">
                  <Github className="h-4 w-4" />
                </a>
                <a href="#" aria-label="LinkedIn" className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 transition">
                  <Linkedin className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Product */}
            <div>
              <h4 className="text-sm font-semibold text-slate-900">Product</h4>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                <li><a href="#insights" className="hover:text-slate-900">Our insights</a></li>
                <li><a href="#what-we-do" className="hover:text-slate-900">What we do</a></li>
                <li><a href="#why-us" className="hover:text-slate-900">Why us</a></li>
                <li><Link to="/pricing" className="hover:text-slate-900">Pricing</Link></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-sm font-semibold text-slate-900">Company</h4>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                <li><Link to="/about" className="hover:text-slate-900">About</Link></li>
                <li><Link to="/careers" className="hover:text-slate-900">Careers</Link></li>
                <li><Link to="/contact" className="hover:text-slate-900">Contact</Link></li>
                <li><Link to="/blog" className="hover:text-slate-900">Blog</Link></li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="text-sm font-semibold text-slate-900">Get updates</h4>
              <p className="mt-3 text-sm text-slate-600">Tips, releases, and the occasional deal — no spam.</p>
              <form onSubmit={onSubmit} className="mt-4 flex items-center gap-2">
                <div className="relative flex-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    placeholder="you@domain.com"
                    className="w-full rounded-xl border border-slate-300 bg-white/80 pl-9 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition"
                >
                  Subscribe <ChevronRight className="h-4 w-4" />
                </button>
              </form>
              <p className="mt-2 text-[11px] text-slate-500">By subscribing you agree to our <Link to="/terms" className="underline">Terms</Link>.</p>
            </div>
          </div>

          {/* bottom row */}
          <div className="mt-10 flex flex-col-reverse items-start justify-between gap-4 border-t border-slate-200/70 pt-6 md:flex-row md:items-center">
            <p className="text-xs text-slate-500">© {year} FinSavvy. All rights reserved.</p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600">
              <Link to="/privacy" className="hover:text-slate-900">Privacy</Link>
              <Link to="/terms" className="hover:text-slate-900">Terms</Link>
              <Link to="/security" className="hover:text-slate-900">Security</Link>
              <Link to="/status" className="hover:text-slate-900">Status</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
