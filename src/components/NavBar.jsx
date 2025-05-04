import React, { useState } from 'react'

function NavBar({ selected, onSelect, darkMode }) {
  const [collapsed, setCollapsed] = useState(true)

  const navItems = [
    { id: 'overview', label: 'Overview', icon: '💰' },
    { id: 'stocks', label: 'Stocks', icon: '📈' },
    { id: 'indices', label: 'Indices', icon: '📊' },
    { id: 'nfo', label: 'NFO', icon: '📰' },
    { id: 'buy', label: 'Buy Stocks', icon: '🛒' },
    { id: 'prices', label: 'Prices', icon: '💹' },
    { id: 'news', label: 'News', icon: '📰' },
    { id: 'performance', label: 'Performance', icon: '📊' },
  ]

  const navClass = darkMode ? 'bg-dark text-light' : 'bg-light text-dark'
  const navLinkClass = darkMode ? 'nav-link text-light' : 'nav-link text-dark'
  const activeClass = 'active'

  return (
    <>
      <button
        className={`btn btn-outline-${darkMode ? 'light' : 'dark'} d-md-none mb-3`}
        onClick={() => setCollapsed(!collapsed)}
        aria-expanded={!collapsed}
        aria-controls="sidebarNav"
      >
        {collapsed ? '☰ Menu' : '✕ Close'}
      </button>
      <nav
        id="sidebarNav"
        className={`d-flex flex-column p-3 rounded vh-md-100 overflow-auto ${navClass} ${collapsed ? 'd-none d-md-flex' : 'd-flex'}`}
        style={{ minWidth: '250px', transition: 'all 0.3s ease' }}
      >
        <h3 className={`mb-4 text-center ${darkMode ? 'text-info' : 'text-primary'}`}>Stock Market Dashboard</h3>
        <ul className="nav nav-pills flex-column">
          {navItems.map((item) => (
            <li className="nav-item" key={item.id}>
              <button
                className={`${navLinkClass} d-flex align-items-center mb-2 ${selected === item.id ? activeClass : ''}`}
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
    </>
  )
}

export default NavBar
