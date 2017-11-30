require('dotenv').config();

const path = require('path');
const App = require('./server/app');
const twitter = require('./server/lib/twitter');

const app = App(twitter);

const PORT = process.env.PORT || 3001;

if (process.env.NODE_ENV === 'production') {
  console.log('Serving assets from `client/build`...');
  const express = require('express');
  app.use(express.static(path.join(__dirname, 'client', 'build')));
  app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server available at http://localhost:${PORT}/`);
});
