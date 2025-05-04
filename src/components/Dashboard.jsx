import React, { useState, useEffect } from 'react'
import NavBar from './NavBar'
import StockList from './StockList'
import AvailableStocks from './AvailableStocks'
import RealTimePrices from './RealTimePrices'
import StockNews from './StockNews'
import Performance from './Performance'
import Indices from './Indices'
import NFO from './NFO'
import AdminUserStocks from './AdminUserStocks'

function Dashboard({ user }) {
  const [selected, setSelected] = useState('overview')
  const [cart, setCart] = useState([])
  const [marketData, setMarketData] = useState(null)
  const [capital, setCapital] = useState(0)
  const [inputCapital, setInputCapital] = useState('')
  const [selectedInvestIndex, setSelectedInvestIndex] = useState(null)

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/market/indices')
        if (response.ok) {
          const data = await response.json()
          setMarketData(data)
        }
      } catch (error) {
        console.error('Failed to fetch market data', error)
      }
    }
    fetchMarketData()
  }, [])

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

  const handleAddCapital = () => {
    const amount = parseFloat(inputCapital)
    if (!isNaN(amount) && amount > 0) {
      setCapital(amount)
      setInputCapital('')
    } else {
      alert('Please enter a valid positive number')
    }
  }

  const calculateProfitLoss = () => {
    if (!user.stocks || !marketData) return 0
    let totalPL = 0
    user.stocks.forEach((stock) => {
      const currentPrice = stock.currentPrice || 0
      const purchasePrice = stock.purchasePrice || 0
      const shares = stock.shares || 0
      totalPL += (currentPrice - purchasePrice) * shares
    })
    return totalPL
  }

  const renderContent = () => {
    switch (selected) {
      case 'overview':
        return (
          <div className="mb-4">
            <h3 className="mb-3 text-light">Capital Money</h3>
            <div className="card bg-gradient-primary text-white p-4 mb-4 shadow-lg rounded">
<p className="mb-0 fs-3">₹{capital.toLocaleString()}</p>
              <div className="input-group mt-3" style={{ maxWidth: '300px' }}>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Add capital amount"
                  value={inputCapital}
                  onChange={(e) => setInputCapital(e.target.value)}
                />
                <button className="btn btn-outline-light" onClick={handleAddCapital}>
                  Add
                </button>
              </div>
            </div>
            {marketData && (
              <div className="card bg-gradient-secondary text-white p-4 shadow-lg rounded">
                <h4>Market Indices</h4>
                <p><strong>{marketData.nifty.index}:</strong> {marketData.nifty.price} ({marketData.nifty.change} / {marketData.nifty.changePercent}%)</p>
                <p><strong>{marketData.sensex.index}:</strong> {marketData.sensex.price} ({marketData.sensex.change} / {marketData.sensex.changePercent}%)</p>
              </div>
            )}
            <div className="card bg-gradient-success text-white p-4 mt-4 shadow-lg rounded" style={{ maxWidth: '300px' }}>
              <h4>Today's Profit / Loss</h4>
<p className={`fs-4 ${calculateProfitLoss() >= 0 ? 'text-light' : 'text-danger'}`}>
                ₹{calculateProfitLoss().toFixed(2)}
              </p>
            </div>
          </div>
        )
      case 'stocks':
        return (
          <div>
            <h3 className="text-light">Your Stocks</h3>
            <StockList stocks={user.stocks} darkMode={true} />
          </div>
        )
      case 'buy':
        return (
          <div>
            <AvailableStocks onPurchase={handlePurchase} onInvest={(indexName) => {
              setSelectedInvestIndex(indexName)
              setSelected('adminUserStocks')
            }} darkMode={true} />
            <div className="mt-4">
              <h3 className="text-light">Cart</h3>
              {cart.length === 0 ? (
                <p className="text-light">No stocks in cart.</p>
              ) : (
                <StockList stocks={cart} darkMode={true} />
              )}
            </div>
          </div>
        )
      case 'adminUserStocks':
        return <AdminUserStocks darkMode={true} selectedIndex={selectedInvestIndex} />
      case 'prices':
        return <RealTimePrices darkMode={true} />
      case 'news':
        return <StockNews darkMode={true} />
      case 'performance':
        return <Performance darkMode={true} />
      case 'indices':
        return <Indices darkMode={true} />
      case 'nfo':
        return <NFO darkMode={true} />
      default:
        return null
    }
  }

  return (
    <div className="container-fluid vh-100 bg-dark text-light d-flex flex-column">
      <div className="row flex-grow-1">
        <div className="col-12 col-md-3 bg-secondary p-3 overflow-auto shadow-lg">
          <NavBar selected={selected} onSelect={setSelected} darkMode={true} />
        </div>
        <div className="col-12 col-md-9 p-4 overflow-auto">
          <h2 className="mb-4">Welcome, {user.username}</h2>
          {marketData && (
            <div className="mb-3 p-3 rounded bg-secondary border border-light overflow-hidden shadow-sm">
              <div
                className="d-flex flex-nowrap"
                style={{
                  animation: 'marquee 20s linear infinite',
                }}
              >
                <span className="me-5">
                  <strong>{marketData.sensex.index}</strong>: {marketData.sensex.price} ({marketData.sensex.change} / {marketData.sensex.changePercent}%)
                </span>
                <span className="me-5">
                  <strong>{marketData.nifty.index}</strong>: {marketData.nifty.price} ({marketData.nifty.change} / {marketData.nifty.changePercent}%)
                </span>
              </div>
            </div>
          )}
          {renderContent()}
        </div>
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-100%); }
        }
        .bg-gradient-primary {
          background: linear-gradient(45deg, #007bff, #6610f2);
        }
        .bg-gradient-secondary {
          background: linear-gradient(45deg, #6c757d, #343a40);
        }
        .bg-gradient-success {
          background: linear-gradient(45deg, #28a745, #218838);
        }
      `}</style>
    </div>
  )
}

export default Dashboard
