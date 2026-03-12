const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

app.get('/api/*', async (req, res) => {
  const path = req.path.replace('/api', '');
  const query = req.url.includes('?') ? req.url.substring(req.url.indexOf('?')) : '';
  const url = `https://v3.football.api-sports.io${path}${query}`;
  const response = await fetch(url, {
    headers: { 'x-apisports-key': process.env.API_KEY }
  });
  const data = await response.json();
  res.json(data);
});

app.listen(process.env.PORT || 3000);
