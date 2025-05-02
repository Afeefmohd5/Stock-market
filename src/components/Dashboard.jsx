import React, { useState } from 'react'
import NavBar from './NavBar'
import StockList from './StockList'
import AvailableStocks from './AvailableStocks'
import RealTimePrices from './RealTimePrices'
import StockNews from './StockNews'

function Dashboard({ user }) {
  const [selected, setSelected] = useState('overview')
  const [cart, setCart] = useState([])

  const handlePurchase = (stock) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.symbol === stock.symbol)
      if (existing) {
        return prevCart.map((item) =>
          item.symbol === stock.symbol
            ? { ...item, shares: item.shares + stock.shares }
            : item
        )
      } else {
        return [...prevCart, stock]
      }
    })
  }

  const renderContent = () => {
    switch (selected) {
      case 'overview':
        return (
          <div className="mb-4">
            <h3>Capital Money</h3>
            <div className="card p-3">
              <p className="mb-0 fs-4">${user.capital.toLocaleString()}</p>
            </div>
          </div>
        )
      case 'stocks':
        return (
          <div>
            <h3>Your Stocks</h3>
            <StockList stocks={user.stocks} />
          </div>
        )
      case 'buy':
        return (
          <div>
            <AvailableStocks onPurchase={handlePurchase} />
            <div className="mt-4">
              <h3>Cart</h3>
              {cart.length === 0 ? (
                <p>No stocks in cart.</p>
              ) : (
                <StockList stocks={cart} />
              )}
            </div>
          </div>
        )
      case 'prices':
        return <RealTimePrices />
      case 'news':
        return <StockNews />
      case 'performance':
        return <p>Portfolio performance feature coming soon.</p>
      default:
        return null
    }
  }

  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">
        <div className="col-3 bg-light p-3">
          <NavBar selected={selected} onSelect={setSelected} />
        </div>
        <div className="col-9 p-4">
          <h2 className="mb-4">Welcome, {user.username}</h2>
          {renderContent()}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
