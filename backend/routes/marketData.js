const express = require('express');
const router = express.Router();
const { getMarketData, getHistoricalData } = require('../controllers/marketDataController');

router.get('/indices', getMarketData);
router.get('/indices/history', getHistoricalData);

module.exports = router;
