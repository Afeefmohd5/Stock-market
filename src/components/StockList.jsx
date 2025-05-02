import React from 'react'

function StockList({ stocks }) {
  if (!stocks || stocks.length === 0) {
    return <p>No stocks purchased yet.</p>
  }

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Symbol</th>
          <th>Shares</th>
        </tr>
      </thead>
      <tbody>
        {stocks.map((stock, index) => (
          <tr key={index}>
            <td>{stock.symbol}</td>
            <td>{stock.shares}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default StockList
