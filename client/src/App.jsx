import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import './App.css'

import Login from './pages/Login.jsx'
import Greeting from './pages/Greeting/Greeting'
import EmailVerify from './pages/EmailVerify';
import ResetPassword from './pages/ResetPassword';

import Navbar from './components/Navbar.jsx'
import ChatBot from './pages/ChatBot/Chatbot.jsx'

function App() {
  return (
    <div className="app">
      <Navbar />
      <div className="pt-35">

        <Routes>
          <Route path="/" element={<Greeting />} />
          <Route path="/greetings" element={<Greeting />} />
          <Route path="/login" element={<Login />} /> 
          <Route path="/email-verify" element={<EmailVerify />} /> 
          <Route path="/reset-password" element={<ResetPassword />} /> 
          <Route path ="/chatbot" element={<ChatBot />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
