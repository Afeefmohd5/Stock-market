import React, { useEffect, useState } from 'react'
import axios from 'axios'

function StockList({ stocks, darkMode }) {
  const [marketData, setMarketData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const response = await axios.get('/indices')
        setMarketData(response.data)
      } catch (err) {
        setError('Failed to fetch market data')
        console.error(err)
      }
    }

    fetchMarketData()
    const intervalId = setInterval(fetchMarketData, 60000) // Refresh every 60 seconds

    return () => clearInterval(intervalId)
  }, [])

  if (error) {
    return <div className={darkMode ? 'alert alert-danger' : 'alert alert-warning'}>Error: {error}</div>
  }

  if (!marketData && !stocks) {
    return <div className={darkMode ? 'text-light' : ''}>Loading market data...</div>
  }

  const dataToDisplay = stocks || marketData
  const nifty = dataToDisplay.nifty || {}
  const sensex = dataToDisplay.sensex || {}

  const formatChange = (change) => {
    return change > 0 ? `+${change}` : change
  }

  const formatChangePercent = (percent) => {
    return percent > 0 ? `+${percent}%` : `${percent}%`
  }

  return (
    <div className={darkMode ? 'bg-dark text-light p-3 rounded' : 'p-3'}>
      <h3>AngleOne Market Data</h3>
      <table className={`table ${darkMode ? 'table-dark' : 'table-striped'}`}>
        <thead>
          <tr>
            <th>Index</th>
            <th>Price</th>
            <th>Change</th>
            <th>Change %</th>
          </tr>
        </thead>
        <tbody>
          {nifty.index && (
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
          {sensex.index && (
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
  )
}

export default StockList
