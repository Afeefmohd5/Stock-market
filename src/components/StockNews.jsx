import React from 'react'

const mockNews = [
  {
    id: 1,
    title: 'Stock Market Hits New Highs Amid Economic Recovery',
    source: 'Financial Times',
    date: '2024-06-01',
    url: 'https://www.ft.com/content/stock-market-highs'
  },
  {
    id: 2,
    title: 'Tech Stocks Rally as AI Innovations Drive Growth',
    source: 'TechCrunch',
    date: '2024-06-01',
    url: 'https://techcrunch.com/ai-tech-stocks-rally'
  },
  {
    id: 3,
    title: 'Energy Sector Faces Challenges Amid Global Policy Changes',
    source: 'Reuters',
    date: '2024-06-01',
    url: 'https://www.reuters.com/energy-sector-challenges'
  },
  {
    id: 4,
    title: 'Investors Eye Inflation Data for Market Direction',
    source: 'Bloomberg',
    date: '2024-06-01',
    url: 'https://www.bloomberg.com/inflation-market'
  },
  {
    id: 5,
    title: 'Emerging Markets Show Resilience Despite Global Uncertainty',
    source: 'CNBC',
    date: '2024-06-01',
    url: 'https://www.cnbc.com/emerging-markets-resilience'
  }
]

function StockNews() {
  return (
    <div>
      <h3>Daily Stock News</h3>
      <ul className="list-group">
        {mockNews.map((news) => (
          <li key={news.id} className="list-group-item">
            <a href={news.url} target="_blank" rel="noopener noreferrer" className="fw-bold">
              {news.title}
            </a>
            <div className="text-muted small">
              {news.source} - {news.date}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default StockNews
