import { useAuthContext } from './hooks/useAuthContext.js';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar/Navbar.jsx';
import Homepage from "./pages/HomePage/Homepage";
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import Login from './pages/Login.jsx';
import EmailVerify from './pages/EmailVerify';
import ResetPassword from './pages/ResetPassword';
import LandingPage from './pages/HomePage/Landingpage.jsx';
import PublicNavbar from './components/Navbar/PublicNavbar.jsx';

function App() {
  const { user } = useAuthContext();
  const location = useLocation();

  // Decide which navbar to render
  const isLandingPage = location.pathname === '/' && !user;

  return (
    <div className="app">
      <ToastContainer />
       {isLandingPage ? <PublicNavbar /> : user && <Navbar />}
      <Routes>
        <Route path="/" element={user ? <Homepage /> : <LandingPage />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to='/' />} />
        <Route path="/email-verify" element={<EmailVerify />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to='/login' />} />
      </Routes>
    </div>
  );
}

export default App;
