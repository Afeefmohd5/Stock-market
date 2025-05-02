import React from 'react'

function NavBar({ selected, onSelect }) {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: '💰' },
    { id: 'stocks', label: 'Stocks', icon: '📈' },
    { id: 'buy', label: 'Buy Stocks', icon: '🛒' },
    { id: 'prices', label: 'Prices', icon: '💹' },
    { id: 'news', label: 'News', icon: '📰' },
    { id: 'performance', label: 'Performance', icon: '📊' },
  ]

  return (
    <nav className="d-flex flex-column bg-light p-3 rounded" style={{ height: '100%' }}>
      <h3 className="mb-4 text-primary">Stock Market Dashboard</h3>
      <ul className="nav nav-pills flex-column">
        {navItems.map((item) => (
          <li className="nav-item" key={item.id}>
            <button
              className={`nav-link d-flex align-items-center mb-2 ${selected === item.id ? 'active' : ''}`}
              style={{ cursor: 'pointer' }}
              onClick={() => onSelect(item.id)}
            >
              <span className="me-2" style={{ fontSize: '1.2rem' }}>{item.icon}</span>
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default NavBar
