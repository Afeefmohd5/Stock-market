import React, { useState, useEffect } from 'react'

function Indices({ darkMode }) {
  const [indicesData, setIndicesData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchIndices = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/market/indices')
        if (!response.ok) {
          throw new Error('Failed to fetch indices data')
        }
        const data = await response.json()
        setIndicesData(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchIndices()
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
      <h3 className={`mb-4 text-center fw-bold ${darkMode ? 'text-info' : 'text-primary'}`}>Market Indices</h3>
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
            {indicesData && Object.keys(indicesData).map((key) => {
              const index = indicesData[key]
              return (
                <tr key={key}>
                  <td>{index.index}</td>
                  <td>{index.price}</td>
                  <td style={{ color: index.change >= 0 ? 'lightgreen' : 'red' }}>
                    {index.change}
                  </td>
                  <td style={{ color: index.changePercent >= 0 ? 'lightgreen' : 'red' }}>
                    {index.changePercent}%
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Indices
