import React, { useState, useEffect } from 'react'
import axios from 'axios'

function RealTimePrices({ darkMode }) {
  const [marketData, setMarketData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const response = await axios.get('/indices')
        setMarketData(response.data)
      } catch (err) {
        setError('Failed to fetch market data')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchMarketData()
    const intervalId = setInterval(fetchMarketData, 60000) // Refresh every 60 seconds

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

  const { nifty, sensex } = marketData || {}

  const formatChange = (change) => {
    return change > 0 ? `+${change}` : change
  }

  const formatChangePercent = (percent) => {
    return percent > 0 ? `+${percent}%` : `${percent}%`
  }

  return (
    <div className={`container my-5 ${darkMode ? 'bg-dark text-light rounded p-3' : ''}`}>
      <h3 className={`mb-4 text-center fw-bold ${darkMode ? 'text-info' : 'text-primary'}`}>Real-Time Market Data</h3>
      <div className="table-responsive shadow rounded">
        <table className={`table ${darkMode ? 'table-dark' : 'table-striped table-hover'} align-middle mb-0`}>
          <thead className={darkMode ? 'table-secondary' : 'table-primary'}>
            <tr>
              <th>Index</th>
              <th>Price</th>
              <th>Change</th>
              <th>Change %</th>
            </tr>
          </thead>
          <tbody>
            {nifty && (
              <tr>
                <td>{nifty.index}</td>
                <td>{nifty.price}</td>
                <td style={{ color: nifty.change >= 0 ? 'lightgreen' : 'red' }}>
                  {formatChange(nifty.change)}
                </td>
                <td style={{ color: nifty.changePercent >= 0 ? 'lightgreen' : 'red' }}>
                  {formatChangePercent(nifty.changePercent)}
                </td>
              </tr>
            )}
            {sensex && (
              <tr>
                <td>{sensex.index}</td>
                <td>{sensex.price}</td>
                <td style={{ color: sensex.change >= 0 ? 'lightgreen' : 'red' }}>
                  {formatChange(sensex.change)}
                </td>
                <td style={{ color: sensex.changePercent >= 0 ? 'lightgreen' : 'red' }}>
                  {formatChangePercent(sensex.changePercent)}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default RealTimePrices
