const express = require("express");
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
const logger = require('./modules/logger');
require('dotenv').config();

const app = express();

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/public/index.html'));
});

app.get("/rates", async (req, res) => {
  const api_key = process.env.API_KEY;
  const rates_url = `https://openexchangerates.org/api/latest.json?app_id=${api_key}`;
  const rates_response = await fetch(rates_url);
  const rates_data = await rates_response.json();

  logger.saveLog(req.ip);

  const data = {
    time: new Date(),
    ip: req.ip,
    rates: rates_data.rates
  };
  res.json(data);
});

app.get('/log/:fromto', async (req, res) => {
  res.json(logger.retrieveLog(req.params.fromto));
})

app.listen(process.env.PORT, () => {
  console.log("Server is listening on port 5000...");
});
