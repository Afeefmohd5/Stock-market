import React, { useState, useEffect } from 'react'
import axios from 'axios'

function AdminUserStocks({ selectedIndex }) {
  const [userStocks, setUserStocks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchUserStocks = async () => {
      try {
        const response = await axios.get('/admin/user-stocks')
        setUserStocks(response.data)
      } catch (err) {
        setError('Failed to fetch user stocks')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchUserStocks()
    const intervalId = setInterval(fetchUserStocks, 30000) // Poll every 30 seconds

    return () => clearInterval(intervalId)
  }, [])

  if (loading) {
    return (
      <div className="d-flex justify-content-center my-5">
        <div className="spinner-border text-primary" role="status" style={{ width: '4rem', height: '4rem' }}>
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="alert alert-danger my-4 mx-3" role="alert">
        {error}
      </div>
    )
  }

  const filteredStocks = selectedIndex
    ? userStocks.filter((stock) => stock.symbol === selectedIndex)
    : userStocks

  return (
    <div className="container my-5">
      <h3 className="mb-4 text-center text-primary fw-bold">All Users Purchased Stocks</h3>
      <div className="table-responsive shadow rounded">
        <table className="table table-striped table-hover align-middle mb-0">
          <thead className="table-primary">
            <tr>
              <th>User</th>
              <th>Stock Symbol</th>
              <th>Shares</th>
              <th>Purchase Price</th>
              <th>Purchase Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredStocks.map((userStock) => (
              <tr key={`${userStock.userId}-${userStock.symbol}`}>
                <td>{userStock.username}</td>
                <td>{userStock.symbol}</td>
                <td>{userStock.shares}</td>
                <td>{userStock.purchasePrice}</td>
                <td>{new Date(userStock.purchaseDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminUserStocks
