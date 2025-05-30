import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

function Login({ setUser, darkMode }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (username && password) {
      try {
        const response = await fetch('http://localhost:5000/api/users/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        })
        const data = await response.json()
        if (response.ok) {
          setUser({ username: data.user.username, capital: 10000, stocks: [{ symbol: 'AAPL', shares: 10 }] })
          navigate('/dashboard')
        } else {
          alert(data.message || 'Login failed')
        }
      } catch (error) {
        alert('Error connecting to server')
      }
    } else {
      alert('Please enter username and password')
    }
  }

  return (
    <div className={`container mt-5 ${darkMode ? 'bg-dark text-light rounded p-4' : ''}`} style={{ maxWidth: 400 }}>
      <h2 className={`mb-4 text-center fw-bold ${darkMode ? 'text-info' : 'text-primary'}`}>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username:</label>
          <input
            id="username"
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password:</label>
          <input
            id="password"
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Login</button>
      </form>
      <p className={`mt-3 text-center ${darkMode ? 'text-light' : ''}`}>
        Don't have an account? <Link to="/signup" className={darkMode ? 'text-info' : ''}>Sign up</Link>
      </p>
    </div>
  )
}

export default Login
