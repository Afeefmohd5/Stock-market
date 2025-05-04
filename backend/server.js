require('dotenv').config();
const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/user');
const marketDataRoutes = require('./routes/marketData');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/market', marketDataRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
