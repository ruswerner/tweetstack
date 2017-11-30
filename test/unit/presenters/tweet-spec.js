const expect = require('chai').expect;
const tweetPresenter = require('../../../server/presenters/tweet');
const sampleTweet = require('../../sample-tweet.json');

describe('tweet presenter', function() {

  describe('when a tweet is passed', function() {
    it('should return the target format', function() {
      const t = tweetPresenter(sampleTweet);
      expect(Object.keys(t)).to.eql(['id', 'text', 'created_at', 'user']);
      expect(t.id).to.equal(sampleTweet.id_str);
      expect(t.text).to.equal(sampleTweet.text);
      expect(t.created_at).to.equal(sampleTweet.created_at);
      expect(t.user).to.not.be.null;
    });
  });

});