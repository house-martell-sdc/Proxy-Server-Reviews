const express = require('express');
const path = require('path');
const cors = require('cors');
const parser = require('body-parser');
const axios = require('axios');

const proxy = express();
const port = 3000;

proxy.use(cors());
proxy.use(parser.json());
proxy.use(parser.urlencoded({ extended: true }));
proxy.use(express.static(path.join(__dirname, 'public')));

proxy.get('/api/reviews/all/:restaurantId', (req, res) => {
  const { restaurantId } = req.params;
  axios.get(`http://54.183.251.176:80/api/reviews/all/${restaurantId}`) // nginx
    .then(({ data }) => res.status(200).send(data))
    .catch(err => console.error(err));
});

proxy.get('/api/reviews/summary/:restaurantId', (req, res) => {
  const { restaurantId } = req.params;
  axios.get(`http://54.183.251.176:80/api/reviews/summary/${restaurantId}`)
    .then(({ data }) => res.status(200).send(data))
    .catch(err => console.error(err));
});

proxy.listen(port, () => console.log('proxy server is running on port', port));
