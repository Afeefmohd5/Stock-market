import React, { useEffect, useState } from 'react'
import axios from 'axios'

function StockNews({ darkMode }) {
  const [news, setNews] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('https://newsdata.io/api/1/news', {
          params: {
            apikey: 'YOUR_API_KEY',
            q: 'Sensex OR Nifty',
            country: 'in',
            language: 'en'
          }
        })
        setNews(response.data.results || [])
      } catch (err) {
        setError('Failed to fetch news')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
    const intervalId = setInterval(fetchNews, 60000) // Refresh news every 60 seconds

    return () => clearInterval(intervalId)
  }, [])

  if (loading) {
    return (
      <div className="d-flex justify-content-center my-5">
        <div className={`spinner-border ${darkMode ? 'text-light' : 'text-primary'}`} role="status" style={{ width: '4rem', height: '4rem' }}>
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={`alert ${darkMode ? 'alert-danger bg-dark text-light' : 'alert-danger'} my-4 mx-3`} role="alert">
        {error}
      </div>
    )
  }

  return (
    <div className={`container my-5 ${darkMode ? 'bg-dark text-light rounded p-3' : ''}`}>
      <h3 className={`mb-4 text-center fw-bold ${darkMode ? 'text-info' : 'text-primary'}`}>Daily Stock News</h3>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {news.map((item, index) => (
          <div key={index} className="col">
            <div className={`card h-100 shadow-sm ${darkMode ? 'bg-secondary text-light' : ''}`}>
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">
                  <a href={item.link} target="_blank" rel="noopener noreferrer" className={darkMode ? 'text-info text-decoration-none' : 'text-dark text-decoration-none'}>
                    {item.title}
                  </a>
                </h5>
                <p className="card-text text-muted mt-auto small">
                  {item.source_id || 'Unknown Source'} - {item.pubDate ? new Date(item.pubDate).toLocaleDateString() : ''}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default StockNews
