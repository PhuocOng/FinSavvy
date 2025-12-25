import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext';
import { BrowserRouter } from 'react-router-dom'
import  AppContextProvider  from './context/AppContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename="/finsavvy">
      <AppContextProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </AppContextProvider>
    </BrowserRouter>
  </StrictMode>
)
