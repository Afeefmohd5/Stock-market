const axios = require('axios');

const ANGELONE_API_URL = process.env.ANGELONE_API_URL; // Use environment variable
const ANGELONE_API_TOKEN = process.env.ANGELONE_API_TOKEN; // Use environment variable

// Fetch real-time market data for Nifty and Sensex from Angel One API
exports.getMarketData = async (req, res) => {
  try {
    const niftyResponse = await axios.get(`${ANGELONE_API_URL}/marketdata/nifty`, {
      headers: { Authorization: `Bearer ${ANGELONE_API_TOKEN}` },
    });
    const sensexResponse = await axios.get(`${ANGELONE_API_URL}/marketdata/sensex`, {
      headers: { Authorization: `Bearer ${ANGELONE_API_TOKEN}` },
    });

    const niftyData = {
      index: 'Nifty 50',
      price: niftyResponse.data.price,
      change: niftyResponse.data.change,
      changePercent: niftyResponse.data.changePercent,
    };

    const sensexData = {
      index: 'Sensex',
      price: sensexResponse.data.price,
      change: sensexResponse.data.change,
      changePercent: sensexResponse.data.changePercent,
    };

    res.json({ nifty: niftyData, sensex: sensexData });
  } catch (error) {
    console.error('Error fetching market data from Angel One:', error.message);
    res.status(500).json({ message: 'Failed to fetch market data' });
  }
};

// Fetch historical day-by-day data for Nifty and Sensex for performance charts
exports.getHistoricalData = async (req, res) => {
  try {
    const niftyHistoryResponse = await axios.get(`${ANGELONE_API_URL}/marketdata/nifty/history`, {
      headers: { Authorization: `Bearer ${ANGELONE_API_TOKEN}` },
      params: { period: '7d' }, // last 7 days
    });
    const sensexHistoryResponse = await axios.get(`${ANGELONE_API_URL}/marketdata/sensex/history`, {
      headers: { Authorization: `Bearer ${ANGELONE_API_TOKEN}` },
      params: { period: '7d' },
    });

    const niftyHistory = niftyHistoryResponse.data.map(item => ({
      date: item.date,
      price: item.close,
    }));

    const sensexHistory = sensexHistoryResponse.data.map(item => ({
      date: item.date,
      price: item.close,
    }));

    res.json({ niftyHistory, sensexHistory });
  } catch (error) {
    console.error('Error fetching historical data from Angel One:', error.message);
    res.status(500).json({ message: 'Failed to fetch historical data' });
  }
};
