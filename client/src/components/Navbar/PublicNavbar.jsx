// PublicNavbar.jsx
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets';

const SECTIONS = ['insights', 'what-we-do', 'why-us', 'contact-us'];

const PublicNavbar = () => {
  const [active, setActive] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  // Scrollspy: observe sections
  useEffect(() => {
    const els = SECTIONS
      .map(id => document.getElementById(id))
      .filter(Boolean);

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: 0.01 } // middle-ish of screen
    );

    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Helper for cross-page anchor navigation
  const goTo = (hash) => (e) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      // go home first, then scroll after paint
      navigate('/');
      requestAnimationFrame(() => {
        setTimeout(() => {
          document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 60);
      });
    } else {
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="sticky top-0 z-50 flex justify-between items-center py-4 px-6 md:px-10 bg-white/90 backdrop-blur shadow-sm border-b border-gray-200">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2">
        <img src={assets.logo} alt="FinSavvy logo" className="w-36 h-auto object-contain" />
      </Link>

      {/* Nav */}
      <nav className="hidden xl:flex items-center gap-8 text-sm font-semibold">
        {[
          { id: 'insights', label: 'Our insights' },
          { id: 'what-we-do', label: 'What we do' },
          { id: 'why-us', label: 'Why us' },
          { id: 'contact', label: 'Contact us' }
        ].map(({ id, label }) => (
          <a
            key={id}
            href={`#${id}`}
            onClick={goTo(id)}
            className={`px-3 py-2 rounded-md transition ${
              active === id
                ? 'text-blue-700 bg-blue-50 ring-1 ring-inset ring-blue-200'
                : 'hover:bg-blue-600 hover:text-white'
            }`}
          >
            {label}
          </a>
        ))}
      </nav>

      {/* Auth */}
      <div className="flex gap-3">
        <Link to="/login">
          <button className="flex items-center gap-2 border border-gray-300 rounded-full px-5 py-2 text-sm font-semibold hover:bg-gray-50 transition">
            Sign up
            <img src={assets.arrow_icon} alt="" />
          </button>
        </Link>
      </div>
    </header>
  );
};

export default PublicNavbar;
