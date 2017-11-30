const tweetPresenter = require('../../presenters/tweet');

module.exports = twitter => async (req, res) => {
  const param = req.query.q;

  if (!param) {
    res.json({
      error: 'Missing required parameter `q`'
    });
    return;
  }

  try {
    const tweets = await twitter.search(param);
    res.json(tweets.map(t => tweetPresenter(t)));
  } catch (error) {
    res.json({error});
  }

};