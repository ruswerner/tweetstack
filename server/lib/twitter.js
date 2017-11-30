const Twitter = require('twitter');

const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  bearer_token: process.env.TWITTER_BEARER_TOKEN
});

module.exports = {
  search: q => new Promise((resolve, reject) =>
    client.get(
      'search/tweets',
      {q, lang: 'en'},
      (error, tweets) =>
        error ? reject(error) : resolve(tweets.statuses)
    )
  )
};

