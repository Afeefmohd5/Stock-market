import React, { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import axios from 'axios'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const Performance = ({ darkMode }) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  })

  useEffect(() => {
    const fetchHistoricalData = async () => {
      try {
        const response = await axios.get('/api/market/indices/history')
        const { niftyHistory, sensexHistory } = response.data

        const labels = niftyHistory.map((item) => item.date)
        const niftyPrices = niftyHistory.map((item) => item.price)
        const sensexPrices = sensexHistory.map((item) => item.price)

        setChartData({
          labels,
          datasets: [
            {
              label: 'Nifty',
              data: niftyPrices,
              borderColor: 'rgba(75,192,192,1)',
              backgroundColor: 'rgba(75,192,192,0.4)',
              borderWidth: 3,
              pointRadius: 4,
              tension: 0.3,
            },
            {
              label: 'Sensex',
              data: sensexPrices,
              borderColor: 'rgba(255,99,132,1)',
              backgroundColor: 'rgba(255,99,132,0.4)',
              borderWidth: 3,
              pointRadius: 4,
              tension: 0.3,
            },
          ],
        })
        setLoading(false)
      } catch (err) {
        setError('Failed to fetch historical data')
        setLoading(false)
      }
    }

    fetchHistoricalData()
  }, [])

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: darkMode ? 'white' : 'black',
        },
      },
      title: {
        display: true,
        text: 'Nifty and Sensex Day-by-Day Performance',
        color: darkMode ? 'white' : 'black',
      },
    },
    scales: {
      x: {
        ticks: {
          color: darkMode ? 'white' : 'black',
        },
        grid: {
          color: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
          borderColor: darkMode ? 'white' : 'black',
          borderWidth: 1,
        },
      },
      y: {
        ticks: {
          color: darkMode ? 'white' : 'black',
        },
        grid: {
          color: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
          borderColor: darkMode ? 'white' : 'black',
          borderWidth: 1,
        },
      },
    },
  }

  if (loading) {
    return (
      <div className={`container my-5 ${darkMode ? 'bg-dark text-light rounded p-3' : ''}`}>
        <h3 className={`mb-4 text-center fw-bold ${darkMode ? 'text-info' : 'text-primary'}`}>Performance</h3>
        <div className="d-flex justify-content-center my-5">
          <div className="spinner-border text-primary" role="status" style={{ width: '4rem', height: '4rem' }}>
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={`container my-5 ${darkMode ? 'bg-dark text-light rounded p-3' : ''}`}>
        <h3 className={`mb-4 text-center fw-bold ${darkMode ? 'text-info' : 'text-primary'}`}>Performance</h3>
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    )
  }

  return (
    <div className={`container my-5 ${darkMode ? 'bg-dark text-light rounded p-3' : ''}`}>
      <h3 className={`mb-4 text-center fw-bold ${darkMode ? 'text-info' : 'text-primary'}`}>Performance</h3>
      <div className="card p-3 shadow-sm" style={{ minHeight: 300 }}>
        <Line data={chartData} options={options} />
      </div>
    </div>
  )
}

export default Performance

