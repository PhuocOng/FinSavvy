import { Link } from 'react-router-dom';
import { assets } from '../../assets/assets';

const PublicNavbar = () => {
  return (
    <header className="flex justify-between items-center py-6 px-10 bg-white shadow w-full">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2">
        <img src={assets.logo} alt='FinSavvy logo' className="w-36 h-auto object-contain" /> 
      </Link>

      {/* Nav Links */}
      <ul className="hidden xl:flex items-center gap-12 text-black font-semibold text-base">
        <Link to="/" className="p-3 hover:bg-[#2563eb] hover:text-white rounded-md transition-all cursor-pointer">
          Our insights
        </Link>
        <Link to="/" className="p-3 hover:bg-[#2563eb] hover:text-white rounded-md transition-all cursor-pointer">
          What we do
        </Link>
        <Link to="/" className="p-3 hover:bg-[#2563eb] hover:text-white rounded-md transition-all cursor-pointer">
          About us
        </Link>
        <Link to="/" className="p-3 hover:bg-[#2563eb] hover:text-white rounded-md transition-all cursor-pointer">
          Why us
        </Link>
        <Link to="/" className="p-3 hover:bg-[#2563eb] hover:text-white rounded-md transition-all cursor-pointer">
          Contact us
        </Link>
      </ul>

      {/* Auth Buttons */}
      <div className="flex gap-4">
        <Link to="/login">
          <button className="flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 text-black hover:bg-gray-100 transition-all">
            Sign up
            <img src={assets.arrow_icon} alt="" />
          </button>
        </Link>

      </div>
    </header>
  );
};

export default PublicNavbar;
