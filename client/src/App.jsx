import React, { useContext } from "react";
import { ToastContainer } from "react-toastify";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar/Navbar.jsx";
import PublicNavbar from "./components/Navbar/PublicNavbar.jsx";

import Homepage from "./pages/HomePage/Homepage.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import Login from "./pages/Login.jsx";
import EmailVerify from "./pages/EmailVerify.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import LandingPage from "./pages/LandingPage/Landingpage.jsx";
import Expenses from "./components/Dashboard/Expenses/Expenses.jsx";
import Profile from "./pages/Profile.jsx";

import { AppContent } from "./context/AppContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  const { isLoggedin, isLoading } = useContext(AppContent);
  const location = useLocation();

  if (isLoading) return null;

  // Show PublicNavbar only if user is not logged in and on landing page
  const isLandingPage = location.pathname === "/" && !isLoggedin;

  return (
    <ThemeProvider>
      <div className="app w-full bg-gradient-to-br from-blue-50 to-blue-100">
        <ToastContainer />

        {isLandingPage ? <PublicNavbar /> : isLoggedin && <Navbar />}

        <Routes>
          <Route
            path="/"
            element={isLoggedin ? <Homepage /> : <LandingPage />}
          />
          <Route
            path="/login"
            element={!isLoggedin ? <Login /> : <Navigate to="/" />}
          />
          <Route path="/email-verify" element={<EmailVerify />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route
            path="/dashboard"
            element={isLoggedin ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/dashboard/expenses"
            element={isLoggedin ? <Expenses /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile"
            element={isLoggedin ? <Profile /> : <Navigate to="/login" />}
          />
        </Routes>

        {/* <Footer /> */}
      </div>
    </ThemeProvider>
  );
}

export default App;
