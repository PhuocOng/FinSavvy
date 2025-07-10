import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'

//import Login from './pages/Login'

function App() {
  const [greetings, setGreetings] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchGreetings()
  }, [])

  const fetchGreetings = async () => {
    try {
      setLoading(true)
      const response = await fetch('http://localhost:5000/api/greetings')
      if (!response.ok) {
        throw new Error('Failed to fetch greetings')
      }
      const data = await response.json()
      setGreetings(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>🎯 FinSavvy</h1>
        <p>Your Personal Finance Management App</p>
      </header>

      <main className="app-main">
        {loading && (
          <div className="loading">
            <p>Loading greetings from server...</p>
          </div>
        )}

        {error && (
          <div className="error">
            <p>Error: {error}</p>
            <button onClick={fetchGreetings} className="retry-btn">
              Retry
            </button>
          </div>
        )}

        {greetings && (
          <div className="greetings-container">
            <h2>{greetings.message}</h2>
            <div className="friends-list">
              <h3>Friends:</h3>
              <ul>
                {greetings.friends.map((friend, index) => (
                  <li key={index} className="friend-item">
                    {friend}
                  </li>
                ))}
              </ul>
            </div>
            <div className="greetings-list">
              <h3>Greetings:</h3>
              <ul>
                {greetings.greetings.map((greeting, index) => (
                  <li key={index} className="greeting-item">
                    {greeting}
                  </li>
                ))}
              </ul>
            </div>
            <button onClick={fetchGreetings} className="refresh-btn">
              🔄 Refresh Greetings
            </button>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
