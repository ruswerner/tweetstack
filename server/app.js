const express = require('express');
const searchController = require('./controllers/api/search');

module.exports = twitter => {

  const app = express();

  app.get('/api/search', searchController(twitter));

  return app;
};

