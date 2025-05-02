import React, { useState } from 'react'

function AvailableStocks({ onPurchase }) {
  const stocks = [
    { symbol: 'AAPL', name: 'Apple Inc.', price: 150 },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 2800 },
    { symbol: 'MSFT', name: 'Microsoft Corp.', price: 300 },
    { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 3500 },
    { symbol: 'TSLA', name: 'Tesla Inc.', price: 700 },
  ]

  const [quantities, setQuantities] = useState({})

  const handleQuantityChange = (symbol, value) => {
    const qty = Math.max(0, Math.min(100, Number(value)))
    setQuantities((prev) => ({ ...prev, [symbol]: qty }))
  }

  const handlePurchase = (stock) => {
    const qty = quantities[stock.symbol] || 0
    if (qty > 0) {
      onPurchase({ ...stock, shares: qty })
      setQuantities((prev) => ({ ...prev, [stock.symbol]: 0 }))
    } else {
      alert('Please enter a quantity between 1 and 100')
    }
  }

  return (
    <div>
      <h3>Available Stocks</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Name</th>
            <th>Price ($)</th>
            <th>Quantity (1-100)</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock) => (
            <tr key={stock.symbol}>
              <td>{stock.symbol}</td>
              <td>{stock.name}</td>
              <td>{stock.price}</td>
              <td>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={quantities[stock.symbol] || ''}
                  onChange={(e) => handleQuantityChange(stock.symbol, e.target.value)}
                  className="form-control"
                  style={{ width: '80px' }}
                />
              </td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => handlePurchase(stock)}
                >
                  Purchase
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AvailableStocks
