const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.get('/api/weather', async (req, res) => {
  const { query } = req.query;
  try {
    const response = await axios.get(`https://api.weatherapi.com/v1/search.json?key=${process.env.WEATHER_API_KEY}&q=${query}`)
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: `Error fetching weather data` });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
})