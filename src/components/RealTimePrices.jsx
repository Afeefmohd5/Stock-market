import React, { useState, useEffect } from 'react'

function RealTimePrices() {
  const initialStocks = [
    { symbol: 'AAPL', price: 150 },
    { symbol: 'GOOGL', price: 2800 },
    { symbol: 'MSFT', price: 300 },
    { symbol: 'AMZN', price: 3500 },
    { symbol: 'TSLA', price: 700 },
  ]

  const [stocks, setStocks] = useState(initialStocks)

  useEffect(() => {
    const interval = setInterval(() => {
      setStocks((prevStocks) =>
        prevStocks.map((stock) => {
          const change = (Math.random() - 0.5) * 5 // random change between -2.5 and +2.5
          const newPrice = Math.max(0, stock.price + change)
          return { ...stock, price: newPrice.toFixed(2) }
        })
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div>
      <h3>Real-Time Stock Prices</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Price ($)</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock) => (
            <tr key={stock.symbol}>
              <td>{stock.symbol}</td>
              <td>{stock.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default RealTimePrices
