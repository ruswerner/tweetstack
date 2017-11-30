const express = require('express');
const searchController = require('./controllers/api/search');

module.exports = twitter => {

  const app = express();

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
  }

  app.get('/api/search', searchController(twitter));

  return app;
};

