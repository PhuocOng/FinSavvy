import React from "react";
import { Link } from "react-router-dom";
import { Mail, Twitter, Github, Linkedin, ChevronRight } from "lucide-react";
import "./Footer.css";

const Footer = () => {
  const year = new Date().getFullYear();

  const onSubmit = (e) => {
    e.preventDefault();
    // TODO: wire to your email provider
  };

  return (
    <footer className="footer-container">
      <div className="footer-gradient-accent" />

      <div className="footer-main">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="footer-background-blob-1" />
          <div className="footer-background-blob-2" />
        </div>

        <div className="footer-content">
          <div className="footer-grid">
            <div>
              <Link to="/" className="footer-brand-logo">
                <div className="footer-brand-icon">FS</div>
                <span className="footer-brand-text">FinSavvy</span>
              </Link>
              <p className="footer-brand-description">
                Take control of your money with secure bank connections,
                GPT-powered insights, and beautiful dashboards.
              </p>

              <div className="footer-social-links">
                <a href="#" aria-label="Twitter" className="footer-social-link">
                  <Twitter className="h-4 w-4" />
                </a>
                <a href="#" aria-label="GitHub" className="footer-social-link">
                  <Github className="h-4 w-4" />
                </a>
                <a
                  href="#"
                  aria-label="LinkedIn"
                  className="footer-social-link"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="footer-section-title">Product</h4>
              <ul className="footer-section-list">
                <li>
                  <a href="#insights" className="footer-section-link">
                    Our insights
                  </a>
                </li>
                <li>
                  <a href="#what-we-do" className="footer-section-link">
                    What we do
                  </a>
                </li>
                <li>
                  <a href="#why-us" className="footer-section-link">
                    Why us
                  </a>
                </li>
                <li>
                  <Link to="/pricing" className="footer-section-link">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="footer-section-title">Company</h4>
              <ul className="footer-section-list">
                <li>
                  <Link to="/about" className="footer-section-link">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/careers" className="footer-section-link">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="footer-section-link">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="footer-section-link">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="footer-section-title">Get updates</h4>
              <p className="footer-newsletter-description">
                Tips, releases, and the occasional deal — no spam.
              </p>
              <form onSubmit={onSubmit} className="footer-newsletter-form">
                <div className="footer-newsletter-input-wrapper">
                  <Mail className="footer-newsletter-input-icon" />
                  <input
                    type="email"
                    required
                    placeholder="you@domain.com"
                    className="footer-newsletter-input"
                  />
                </div>
                <button type="submit" className="footer-newsletter-button">
                  Subscribe <ChevronRight className="h-4 w-4" />
                </button>
              </form>
              <p className="footer-newsletter-terms">
                By subscribing you agree to our <Link to="/terms">Terms</Link>.
              </p>
            </div>
          </div>

          <div className="footer-bottom">
            <p className="footer-copyright">
              © {year} FinSavvy. All rights reserved.
            </p>
            <div className="footer-bottom-links">
              <Link to="/privacy" className="footer-bottom-link">
                Privacy
              </Link>
              <Link to="/terms" className="footer-bottom-link">
                Terms
              </Link>
              <Link to="/security" className="footer-bottom-link">
                Security
              </Link>
              <Link to="/status" className="footer-bottom-link">
                Status
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
