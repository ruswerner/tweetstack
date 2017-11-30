require('dotenv').config();

const App = require('./server/app');
const twitter = require('./server/lib/twitter');

const app = App(twitter);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server available at http://localhost:${PORT}/`);
});
