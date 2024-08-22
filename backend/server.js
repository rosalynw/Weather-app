const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.get('/api/search', async (req, res) => {
  const { query } = req.query;
  try {
    const response = await axios.get(`https://api.weatherapi.com/v1/search.json?key=${process.env.WEATHER_API_KEY}&q=${query}`)
    res.json(response.data);
  } catch (error) {
    console.error('Error fethcing weather data', error);
    res.status(500).json({ error: `Error fetching search data` });
  }
});

app.get('/api/weather', async (req, res) => {
  const { query } = req.query;
  try {
    const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${query}`);
    res.json(response.data);
  } catch {
    console.error('Error fetching weather data', error);
    res.status(500).json({ error: 'Error fetching weather data' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});