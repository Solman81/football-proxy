const express = require('express');
const fetch = require('node-fetch');
const app = express();

const FOOTBALL_API_KEY = process.env.API_KEY;
const FOOTBALL_BASE = 'https://v3.football.api-sports.io';
const MLB_BASE = 'https://statsapi.mlb.com/api/v1';

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/api/*', async (req, res) => {
  const path = req.params[0];
  const query = new URLSearchParams(req.query).toString();
  const url = `${FOOTBALL_BASE}/${path}${query ? '?' + query : ''}`;
  try {
    const r = await fetch(url, {
      headers: { 'x-apisports-key': FOOTBALL_API_KEY }
    });
    const data = await r.json();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/mlb/*', async (req, res) => {
  const path = req.params[0];
  const query = new URLSearchParams(req.query).toString();
  const url = `${MLB_BASE}/${path}${query ? '?' + query : ''}`;
  try {
    const r = await fetch(url);
    const data = await r.json();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/', (req, res) => res.json({ status: 'Edge Finder Proxy — Football + MLB' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy running on port ${PORT}`));
