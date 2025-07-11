import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import './App.css'

import Login from './pages/Login.jsx'
import Greeting from './pages/Greeting/Greeting'
import EmailVerify from './pages/EmailVerify';
import ResetPassword from './pages/ResetPassword';

// Search on google (react toastify)
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

import Navbar from './components/Navbar.jsx'

function App() {
  return (
    <div className="app">
      <Navbar />
      
      <div className="pt-35">
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Greeting />} />
          <Route path="/greetings" element={<Greeting />} />
          <Route path="/login" element={<Login />} /> 
          <Route path="/email-verify" element={<EmailVerify />} /> 
          <Route path="/reset-password" element={<ResetPassword />} /> 

        </Routes>
      </div>
    </div>
  )
}

export default App
