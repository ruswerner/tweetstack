const expect = require('chai').expect;
const userPresenter = require('../../../server/presenters/user');
const sampleTweet = require('../../sample-tweet.json');

describe('user presenter', function() {

  describe('when a tweet user is passed', function() {
    it('should return the target format', function() {
      const u = userPresenter(sampleTweet.user);
      expect(Object.keys(u)).to.eql(['name', 'profile_image_url', 'screen_name', 'verified']);
      expect(u.name).to.equal(sampleTweet.user.name);
      expect(u.profile_image_url).to.equal(sampleTweet.user.profile_image_url);
      expect(u.screen_name).to.equal(sampleTweet.user.screen_name);
      expect(u.verified).to.equal(sampleTweet.user.verified);
    });
  });

});