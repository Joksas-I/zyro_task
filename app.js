const express = require("express");
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
const { logEntry, retrieveLog } = require('./modules/logger');
require('dotenv').config();

const app = express();


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/public/index.html'));
});

app.get("/rates", logEntry, async (req, res) => {
  const api_key = process.env.API_KEY;
  const rates_url = `https://openexchangerates.org/api/latest.json?app_id=${api_key}`;
  const rates_response = await fetch(rates_url);
  const rates_data = await rates_response.json();

  const data = {
    time: new Date(),
    ip: req.ip,
    rates: rates_data.rates
  };
  res.send(data);
});

app.get('/log', retrieveLog);

app.listen(process.env.PORT, () => {
  console.log("Server is listening on port 5000...");
});
