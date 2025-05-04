import React, { useState, useEffect } from 'react'

function NFO({ darkMode }) {
  const [nfoData, setNfoData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchNFO = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/market/nfo')
        if (!response.ok) {
          throw new Error('Failed to fetch NFO data')
        }
        const data = await response.json()
        setNfoData(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchNFO()
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
      <h3 className={`mb-4 text-center fw-bold ${darkMode ? 'text-info' : 'text-primary'}`}>NFO Market Data</h3>
      <div className="table-responsive shadow rounded">
        <table className={`table ${darkMode ? 'table-dark' : 'table-striped table-hover'} align-middle mb-0`}>
          <thead className={darkMode ? 'table-secondary' : 'table-primary'}>
            <tr>
              <th>Symbol</th>
              <th>Price</th>
              <th>Change</th>
              <th>Change %</th>
            </tr>
          </thead>
          <tbody>
            {nfoData && nfoData.map((item) => (
              <tr key={item.symbol}>
                <td>{item.symbol}</td>
                <td>{item.price}</td>
                <td style={{ color: item.change >= 0 ? 'lightgreen' : 'red' }}>
                  {item.change}
                </td>
                <td style={{ color: item.changePercent >= 0 ? 'lightgreen' : 'red' }}>
                  {item.changePercent}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default NFO
